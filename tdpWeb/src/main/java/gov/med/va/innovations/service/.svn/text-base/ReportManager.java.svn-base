package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.DailyPlanReport;
import gov.med.va.innovations.domain.FontSizes;
import gov.med.va.innovations.domain.Template;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaTO;

import java.io.IOException;
import java.util.List;

public interface ReportManager {

	/**
	 * Retrieve a Daily Plan Report for the given patient with a default font, and the default template
	 * @param patient the patient for which to retrieve the report
	 * @return
	 */
	public List<DailyPlanReport> getPatientReport(List<VistaPatient> patients);


	/**
	 * Retrieve a Daily Plan Report for the given patient with the given font, and the default template
	 * @param patient the patient for which to retrieve the report
	 * @param fontSize the font size for the generated report
	 * @return
	 */
	public List<DailyPlanReport> getPatientReport(List<VistaPatient> patients, List<FontSizes> fontSizes);

	/**
	 * Retrieve a Daily Plan Report for the given patient with the given font, and the given template
	 * @param patient the patient for which to retrieve the report
	 * @param fontSize the font size for the generated report
	 * @param template is the template to use to generate the report
	 * @param logEvent controls whether events will be logged or not. Generally events are only logged for printable reports.
	 * @return
	 */
	public List<DailyPlanReport> getPatientReport(List<VistaPatient> patients, List<FontSizes> fontSizes, List<Template> templates, boolean logEvent);
	
	/**
	 * Using reflection, retrieve the data necessary for the generation of the component
	 * @param comp is the component for which to generate the Markup
	 * @param patientId is the unique patient identifier
	 * @return a transfer object used to generate the report
	 */
	public VistaTO retrieveComponentData(Component comp, String patientId);

	/**
	 * Generates a PDF version of the Daily Plan report into an output stream
	 * @param report the generated DailyPlanReport object
	 * @param resourcePath is the path of where to locate the resources used to generate the PDF.  If null will use the classpath.
	 * @return a stream containing the generated report
	 * @throws IOException 
	 */
	public byte[] genPdfReport(List<DailyPlanReport> reports, String resourcePath) throws IOException;
	
	/**
	 * Generates a PDF version of the Daily Plan report into an output stream
	 * 
	 * @param patientId the DFN of the patient object to be retrieved from VistA
	 * @param fontSize the font size used to generate the report
	 * @param templateId the template used to generate the report. If null, the default is selected
	 * @param resourcePath is the path of where to locate the resources used to generate the PDF.  If null will use the classpath.
	 * @return a stream containing the generated report
	 * @throws IOException 
	 */
	public byte[] genPdfReport(String patientId, FontSizes fontSize, Integer templateId, String resourcePath) throws IOException;
	
	/**
	 * Convenience method for retrieving the default template
	 * @return the Default Template
	 */
	public Template getDefaultTemplate();
	
	/**
	 * Generate a new Report Identifier
	 * 
	 * @return a new sequence used for identifying a report 
	 */
	public String generateReportId();
}
