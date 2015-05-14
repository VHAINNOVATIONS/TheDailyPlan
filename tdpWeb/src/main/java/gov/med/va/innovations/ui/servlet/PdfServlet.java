package gov.med.va.innovations.ui.servlet;

import gov.med.va.innovations.domain.DailyPlanReport;
import gov.med.va.innovations.domain.FontSizes;
import gov.med.va.innovations.domain.Template;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.service.ReportManager;
import gov.med.va.innovations.service.TemplateManager;
import gov.med.va.innovations.service.VistaManager;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 * Servlet implementation class PdfServlet
 */
public class PdfServlet extends HttpServlet {
	private static final Log LOG = LogFactory.getLog(PdfServlet.class);
	private static final long serialVersionUID = 1L;
	private static final String PARAM_PATIENT = "patient";
	private static final String PARAM_FONT = "font";
	private static final String PARAM_TEMPLATE = "template";
	
	private ReportManager reportManager;
	private VistaManager vistaManager;
	private TemplateManager templateManager;
       
 
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}
	
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
		response.setContentType("application/pdf");
		
		String patientId = request.getParameter(PARAM_PATIENT);
		String font = request.getParameter(PARAM_FONT);
		String templateId = request.getParameter(PARAM_TEMPLATE);

		List<VistaPatient> patients = new ArrayList<VistaPatient>();
		List<FontSizes> fontSizes = new ArrayList<FontSizes>();
		List<Template> templates = new ArrayList<Template>();
		
		if (patientId.indexOf(',') > -1) {
			for (String patId : patientId.split(",")) {
				try {
					patients.add(getVistaManager().getPatientForId(patId));					
				}
				catch (Exception e) {
					// If the session is gone, this is the place it will manifest itself
					response.setContentType("text/html");
					response.sendRedirect("logout.jsp");
				}
			}
			for (String fontSize : font.split(",")) {
				fontSizes.add(FontSizes.valueOf(fontSize));
			}
			for (String tplId : templateId.split(",")) {
				templates.add(getTemplateManager().get(Long.valueOf(tplId)));
			}
		}
		else {
			patients.add(getVistaManager().getPatientForId(patientId));
			fontSizes.add(FontSizes.valueOf(font));
			templates.add(getTemplateManager().get(Long.valueOf(templateId)));
		}
		List<DailyPlanReport> reports = getReportManager().getPatientReport(patients, fontSizes, templates, true);

		String resPath = getServletContext().getRealPath("/report/pdf.css");
		if (null != resPath)
			if (-1 == resPath.lastIndexOf('/'))
				resPath = "file:/" + resPath.substring(0, resPath.lastIndexOf('\\'));
			else
				resPath = "file:/" + resPath.substring(0, resPath.lastIndexOf('/'));

		
		byte[] report = getReportManager().genPdfReport(reports, resPath);
		// parse our markup into an xml Document
		try {
		    OutputStream os = response.getOutputStream();
		    os.write(report, 0, report.length);
		    os.close();
		} catch (Exception ex) {
		    LOG.error("An error occurred generating the report",ex);
			response.setContentType("text/html");
		    response.sendRedirect("logout.jsp");
		}
    }
    
    private ReportManager getReportManager() {
    	if (null == reportManager) {
			ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
			reportManager = (ReportManager) context.getBean("reportManager");
    	}

    	return reportManager;
    }
    
    private VistaManager getVistaManager() {
    	if (null == vistaManager) {
			ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
			vistaManager = (VistaManager) context.getBean("vistaManager");
    	}

    	return vistaManager;
    }
    
    private TemplateManager getTemplateManager() {
    	if (null == templateManager) {
			ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
			templateManager = (TemplateManager) context.getBean("templateManager");
    	}

    	return templateManager;
    }
}
