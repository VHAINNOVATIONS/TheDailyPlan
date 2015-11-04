package gov.med.va.innovations.ui.action;

import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.DailyPlanReport;
import gov.med.va.innovations.domain.FontSizes;
import gov.med.va.innovations.domain.Template;
import gov.med.va.innovations.domain.User;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaTO;
import gov.med.va.innovations.service.ReportManager;
import gov.med.va.innovations.service.TemplateManager;
import gov.med.va.innovations.util.DateUtil;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.providers.UsernamePasswordAuthenticationToken;

public class PrintPreviewAction extends BaseAction {
	private static final long serialVersionUID = -7754892930892645268L;
	@SuppressWarnings("unused")
	private static final Log LOG = LogFactory.getLog(PrintPreviewAction.class);
	@SuppressWarnings("unused")
	private static final String TAB_PREVIEW = "report_preview";
	private static final String TAB_LAYOUT = "report_layout";

	private TemplateManager templateManager;
	private ReportManager reportManager;
	private List<DailyPlanReport> reports = new ArrayList<DailyPlanReport>();
	private DailyPlanReport report;
	private List<Template> templates;
	private String[] selected;
	private String[] fonts;
	private String[] defaultTemplates;
	private String selectedPatientId;
	private String selectedTemplateId;
	private String selectedTab;
	
	public void setTemplateManager(TemplateManager templateManager) {
		this.templateManager = templateManager;
	}
	
	public void setReportManager(ReportManager reportManager) {
		this.reportManager = reportManager;
	}

	@Override
	public String execute() throws IOException {
		
		restoreReports();
		
		report = reports.get(0);
		templates = templateManager.getTemplatesForWard(report.getPatient().getLocation().getName());
		generateComponents();
		selectedPatientId = report.getPatient().getLocalPid();
		
		if (null == getSelectedTab() || "".equals(getSelectedTab()))
			setSelectedTab(TAB_LAYOUT);
		
    	return SUCCESS;
    }
	
	public String previewPatient() throws IOException {
		restoreReports();
		for (DailyPlanReport dpr:reports) {
			if (dpr.getPatient().getLocalPid().equals(selectedPatientId)) {
				report = dpr;
				break;
			}
		}
		templates = templateManager.getTemplatesForWard(report.getPatient().getLocation().getName());
		generateComponents();
		
		return SUCCESS;
	}

	private void restoreReports() {
		if (selected[0].indexOf(',') > -1) {
			selected = selected[0].split(", ");
		}
		
		if (fonts[0].indexOf(',') > -1) {
			fonts = fonts[0].split(", ");
		}
		
		Template defaultTemplate = null;
		for(Template template : templateManager.getAll()) {
			if (null == template.getWard()) {
				defaultTemplate = template;
				selectedTemplateId = template.getName();
				break;
			}
		}
		
		for(String id : selected) {
			VistaPatient patient = vistaManager.getPatientForId(id);
			FontSizes fontSize = FontSizes.valueOf(getDefaultFont());
			for (String font : fonts) {
				if (font.substring(0, font.indexOf(":")).equals(id)) {
					fontSize = FontSizes.valueOf(font.split(":")[1]);
					break;
				}
			}
			DailyPlanReport report = new DailyPlanReport(patient, fontSize, defaultTemplate);
			reports.add(report);
		}

	}
	
	public String changeTemplate() throws IOException {
		String newTemplate = selectedTemplateId;
		previewPatient();
		selectedTemplateId = newTemplate;
		
		for (Template template : templates) {
			if (template.getName().equals(selectedTemplateId)) {
				report.setTemplate(template);
			}
		}
		
		if (defaultTemplates.length == 1 && defaultTemplates[0].indexOf(',') > -1) {
			defaultTemplates = defaultTemplates[0].split(", ");
		}
		for (int i = 0; i < defaultTemplates.length; i++) {
			String defaultTemplate = defaultTemplates[i];
			if (defaultTemplate.substring(0, defaultTemplate.indexOf(':')).equals(selectedPatientId)) {
				defaultTemplates[i] = selectedPatientId + ":" + report.getTemplate().getId();
				break;
			}
		}
		report.setExpandedComponents(null);
		generateComponents();

		return SUCCESS;
	}
    
    private void generateComponents() {
		if (null == report.getExpandedComponents()) {
			report.setExpandedComponents(new ArrayList<Component>(report.getTemplate().getComponents().size()));
		}
		else {
			report.getExpandedComponents().removeAll(report.getExpandedComponents());
		}
		
		for (Component comp : report.getTemplate().getComponents()) {
			VistaTO vistaTO = reportManager.retrieveComponentData(comp, report.getPatient().getLocalPid());
			Component newComp = new Component(comp);
			newComp.setTemplate(templateManager.getComponent(comp.getName(), vistaTO));
			report.getExpandedComponents().add(newComp);
		}
	}

	public FontSizes[] getFontList() {
    	return FontSizes.values();
    }

    public String getDefaultFont() {
    	String value = ((User)((UsernamePasswordAuthenticationToken)getRequest().getUserPrincipal()).getPrincipal()).getPrefFontSize().getValue();
    	return value;
    }

	public List<DailyPlanReport> getReports() {
		return reports;
	}

	public void setReports(List<DailyPlanReport> reports) {
		this.reports = reports;
	}

	public DailyPlanReport getReport() {
		return report;
	}

	public void setReport(DailyPlanReport report) {
		templates = templateManager.getTemplatesForWard(report.getPatient().getLocation().getName());
		this.report = report;
	}

	public List<Template> getTemplates() {
		return templates;
	}

	public void setTemplates(List<Template> templates) {
		this.templates = templates;
	}
	
	public boolean isShowTemplates() {
		return templates.size() > 1;
	}

	public String getSelectedPatientId() {
		return selectedPatientId;
	}

	public void setSelectedPatientId(String selectedPatientId) {
		this.selectedPatientId = selectedPatientId;
	}

	public String[] getSelected() {
		return selected;
	}

	public void setSelected(String[] selected) {
		this.selected = selected;
	}

	public String getSelectedTemplateId() {
		return selectedTemplateId;
	}

	public void setSelectedTemplateId(String selectedTemplateId) {
		this.selectedTemplateId = selectedTemplateId;
	}
	
	public String getCurrentDate() {
		return DateUtil.getDate(DateUtil.getToday().getTime());
	}

	public String[] getFonts() {
		return fonts;
	}

	public void setFonts(String[] fonts) {
		this.fonts = fonts;
	}
	
	public String getToday() {
		return DateUtil.getDateTime(DateUtil.getToday().getTime());
	}

	public String[] getDefaultTemplates() {
		return defaultTemplates;
	}

	public void setDefaultTemplates(String[] defaultTemplates) {
		this.defaultTemplates = defaultTemplates;
	}

	public String getSelectedTab() {
		return selectedTab;
	}

	public void setSelectedTab(String selectedTab) {
		this.selectedTab = selectedTab;
	}
}
