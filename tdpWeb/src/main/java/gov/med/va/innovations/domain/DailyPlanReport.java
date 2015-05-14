package gov.med.va.innovations.domain;

import gov.med.va.innovations.util.DateUtil;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class DailyPlanReport implements Serializable {

	private static final long serialVersionUID = -5219615857404651727L;
	
	private String reportId;
	private VistaPatient patient;
	private FontSizes selectedFont;
	private Template template;
	private List<Component> expandedComponents;
	private Date lastReviewed;
	
	public DailyPlanReport() {} // Default no-arg
	
	public DailyPlanReport(VistaPatient patient, FontSizes selectedFont, Template template) {
		this.patient = patient;
		this.selectedFont = selectedFont;
		this.template = template;
		this.setReportId(reportId);
	}
	
	public String getPatientDescription() {
		return patient.getName() + "\t" + patient.getSsn();
	}
	
	public String getDob() {
		return  patient.getDob().substring(4,6) + "/" + patient.getDob().substring(6,8)+ "/" + patient.getDob().substring(0,4);
	}
	
	public String getMedUnit() {
		if ("".equals(patient.getLocation().getBed()) && "".equals(patient.getLocation().getRoom())) {
			return "Outpatient";
		}
		else
			return patient.getLocation().getDisplay();
	}
	
	public VistaPatient getPatient() {
		return patient;
	}
	public void setPatient(VistaPatient patient) {
		this.patient = patient;
	}
	public FontSizes getSelectedFont() {
		return selectedFont;
	}
	public void setSelectedFont(FontSizes selectedFont) {
		this.selectedFont = selectedFont;
	}
	public Template getTemplate() {
		return template;
	}
	public void setTemplate(Template template) {
		this.template = template;
	}
	public List<Component> getExpandedComponents() {
		return expandedComponents;
	}
	public void setExpandedComponents(List<Component> expandedComponents) {
		this.expandedComponents = expandedComponents;
	}

	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	public String getReportId() {
		return reportId;
	}

	public void setLastReviewed(Date lastReviewed) {
		this.lastReviewed = lastReviewed;
	}

	public Date getLastReviewed() {
		return lastReviewed;
	}

	public String getLastReviewedStr() {
		return DateUtil.getDateTime(lastReviewed);
	}
	
	public boolean isHasPrevReview() {
		return null != lastReviewed;
	}
}
