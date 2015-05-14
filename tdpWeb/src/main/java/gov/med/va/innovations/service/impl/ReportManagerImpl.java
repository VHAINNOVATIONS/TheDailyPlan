package gov.med.va.innovations.service.impl;

import edu.emory.mathcs.backport.java.util.Arrays;
import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.DailyPlanReport;
import gov.med.va.innovations.domain.DocumentEvent;
import gov.med.va.innovations.domain.FontSizes;
import gov.med.va.innovations.domain.ReportEvent;
import gov.med.va.innovations.domain.Template;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaTO;
import gov.med.va.innovations.service.EventManager;
import gov.med.va.innovations.service.ReportManager;
import gov.med.va.innovations.service.TemplateManager;
import gov.med.va.innovations.service.VistaManager;
import gov.med.va.innovations.service.EventManager.EventCode;
import gov.med.va.innovations.util.CriteriaUtil;
import gov.med.va.innovations.util.DateUtil;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.springframework.ui.velocity.VelocityEngineUtils;
import org.w3c.dom.Document;
import org.xhtmlrenderer.pdf.ITextRenderer;

public class ReportManagerImpl implements ReportManager {
	private static Log LOG = LogFactory.getLog(ReportManagerImpl.class);
	private TemplateManager templateManager;
	private VistaManager vistaManager;
	private VelocityEngine velocityEngine;
	private EventManager eventMgr;

	public void setEventManager(EventManager eventMgr) {
		this.eventMgr = eventMgr;
	}

	public void setVelocityEngine(VelocityEngine velocityEngine) {
		this.velocityEngine = velocityEngine;
	}
	
	public void setTemplateManager(TemplateManager templateManager) {
		this.templateManager = templateManager;
	}

	public void setVistaManager(VistaManager vistaManager) {
		this.vistaManager = vistaManager;
	}

	@Override
	public List<DailyPlanReport> getPatientReport(List<VistaPatient> patients) {
		
		List<FontSizes> defaultFonts = Collections.nCopies(patients.size(), FontSizes.MEDIUM);
		return getPatientReport(patients, defaultFonts);
	}

	@Override
	public List<DailyPlanReport> getPatientReport(List<VistaPatient> patients,
			List<FontSizes> fontSizes) {
		
		List<Template> templates = Collections.nCopies(patients.size(), getDefaultTemplate());
		return getPatientReport(patients, fontSizes, templates, false);
	}

	@Override
	public List<DailyPlanReport> getPatientReport(List<VistaPatient> patients,
			List<FontSizes> fontSizes, List<Template> templates, boolean logEvent) {
		if (patients.size() != fontSizes.size() || fontSizes.size() != templates.size()) {
			throw new IllegalArgumentException("List sizes must be consistent!");
		}
		List<DailyPlanReport> reports = new ArrayList<DailyPlanReport>(patients.size());
		for (int i=0; i<patients.size(); i++) {
			DailyPlanReport report = new DailyPlanReport(patients.get(i),fontSizes.get(i),templates.get(i));
			
			for (DocumentEvent evt : eventMgr.getEvents(EventCode.RPT, patients.get(i).getLocalPid())) {
				Calendar cal = new GregorianCalendar();
				cal.add(Calendar.MINUTE, -1);
				if (null != evt.getUpdateTime() && evt.getUpdateTime().before(cal.getTime())) {
					Calendar timeClock = new GregorianCalendar();
					timeClock.setTime(evt.getUpdateTime());
					cal.setTime(evt.getEventDate());
					cal.set(Calendar.HOUR_OF_DAY, timeClock.get(Calendar.HOUR_OF_DAY));
					cal.set(Calendar.MINUTE, timeClock.get(Calendar.MINUTE));
					report.setLastReviewed(cal.getTime());
					break;
				}
			}
			
			if (logEvent)
				report.setReportId(generateReportId());
			generateComponents(report);
			reports.add(report);
		}
		
		return reports;
	}

	public Template getDefaultTemplate() {
		Template defaultTemplate = null;
		for(Template template : templateManager.getAll()) {
			if (null == template.getWard()) {
				defaultTemplate = template;
				break;
			}
		}
		return defaultTemplate;
	}
    
    private void generateComponents(DailyPlanReport report) {
		if (null == report.getExpandedComponents()) {
			report.setExpandedComponents(new ArrayList<Component>(report.getTemplate().getComponents().size()));
		}
		else {
			report.getExpandedComponents().removeAll(report.getExpandedComponents());
		}
		
		for (Component comp : report.getTemplate().getComponents()) {
			String patientId = report.getPatient().getLocalPid();
			VistaTO vistaTO = retrieveComponentData(comp, patientId);
			Component newComp = new Component(comp);
			newComp.setTemplate(templateManager.getComponent(comp.getName(), vistaTO));
			// Potentially Log new component
			eventMgr.generateEvent(report.getPatient(), vistaTO, report.getReportId());

			report.getExpandedComponents().add(newComp);
		}
	}

	public VistaTO retrieveComponentData(Component comp, String patientId) {
		VistaTO vistaTO = null;
		Method m;
		try {
			if (comp.isHasCriteria()) {
				Map<String,Object> crit = CriteriaUtil.parseCriteriaString(comp.getCriteria());
				List<String> critList = CriteriaUtil.parseCriteriaToKeys(comp.getCriteria());
				Class<?>[] types = new Class[critList.size()+1];
				Object[] values = new Object[critList.size()+1];
				for(int i = 0; i < critList.size(); i++) {
					values[i+1] = crit.get(critList.get(i));
					types[i+1] = values[i+1].getClass();
				}
				types[0] = String.class;
				values[0] = patientId;
				
				m = vistaManager.getClass().getMethod(comp.getMethod(), types);
				vistaTO = (VistaTO) m.invoke(vistaManager, values);
			}
			else {
				m = vistaManager.getClass().getMethod(comp.getMethod(), String.class);
				vistaTO = (VistaTO) m.invoke(vistaManager, patientId);
			}
		} catch (Exception e) {
			LOG.error("Can not call method "+comp.getMethod()+" on patient dfn: "+patientId, e);
		}
		
		return vistaTO;
	}

	@Override
	public byte[] genPdfReport(List<DailyPlanReport> reports, String resourcePath) throws IOException {
		
		// put in some style
		String css = resourcePath + "/pdf.css";
		String logoPath = resourcePath + "/images/dailyPlanLogo.jpg";
		if (null == resourcePath) {
			try {
				css = "file:" + getClass().getResource("/report/pdf.css").toURI().getPath();
				logoPath = "file:" + getClass().getResource("/report/images/dailyPlanLogo.jpg").toURI().getPath();
			} catch (URISyntaxException e1) {
				LOG.error("Bad URI", e1);
			}
			logoPath = logoPath.substring(0, logoPath.lastIndexOf('/'));
		}
		else {
			css = resourcePath + File.separator + "pdf.css";
			logoPath = resourcePath + File.separator + "images";
		}
		
		//generate the rest of the HTML
        String result = null;
        Map<String, Object> reportParms = new HashMap<String,Object>();
        reportParms.put("cssLoc", css);
        reportParms.put("logoPath", logoPath);
        reportParms.put("today", DateUtil.getDate(DateUtil.getToday().getTime()));
        reportParms.put("now", DateUtil.getTimeNow(new Date()));
        reportParms.put("patients", reports);

        try {
            result =
                VelocityEngineUtils.mergeTemplateIntoString(velocityEngine,
                                                            "DailyPlanReport.vm", reportParms);
            if (LOG.isDebugEnabled())
            	LOG.debug(result);
        } catch (VelocityException e) {
            e.printStackTrace();
        }
        
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        
        try {
	        DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
	        Document doc = builder.parse(new ByteArrayInputStream(result.getBytes()));
	        ITextRenderer renderer = new ITextRenderer();
	        renderer.setDocument(doc, null);
	        renderer.layout();
	        renderer.createPDF(os);
	        os.close();
        }
        catch(Exception e) {
        	throw new IOException(e.fillInStackTrace());
        }

        for (DailyPlanReport report: reports) {
        	eventMgr.generateEvent(report.getPatient(), new ReportEvent(), null == report.getReportId() ? generateReportId() : report.getReportId());
        }
        
		return os.toByteArray();
	}

	@SuppressWarnings("unchecked")
	@Override
	public byte[] genPdfReport(String patientId, FontSizes fontSize, 
			Integer templateId, String resourcePath) throws IOException {
		VistaPatient patient = vistaManager.getPatientForId(patientId);
		Template template = null;
		if (null == templateId) {
			template = getDefaultTemplate();
		}
		else {
			template = templateManager.get(Long.valueOf(templateId));
		}
		
		List<DailyPlanReport> reports = getPatientReport(Arrays.asList(new VistaPatient[]{patient}), Arrays.asList(new FontSizes[]{fontSize}), Arrays.asList(new Template[]{template}), true);
		for (DailyPlanReport report: reports) {
			report.setReportId(generateReportId());
		}
		return genPdfReport(reports, resourcePath);
	}

	@Override
	public String generateReportId() {
		return eventMgr.generateReportId();
	}

}
