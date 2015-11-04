package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.med.va.innovations.util.ConvertUtil;
import gov.med.va.innovations.util.DateConverter;
import gov.med.va.innovations.util.DateUtil;
import gov.med.va.innovations.util.annotation.EscapeForXhtml;
import gov.va.medora.mdws.emrsvc.CytologyRpt;
import gov.va.medora.mdws.emrsvc.LabResultTO;
import gov.va.medora.mdws.emrsvc.MicrobiologyRpt;
import gov.va.medora.mdws.emrsvc.SurgicalPathologyRpt;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class VistaLabReport extends VistaTO implements Serializable {
	private static final long serialVersionUID = -3752841318793797845L;
	private static final Log LOG = LogFactory.getLog(VistaLabReport.class);
	private static final DateConverter DC = new DateConverter();
	private Date collectionDate;
	private String testName;
	private VistaLabSpecimen specimen;
	private String result;
	private String normalRange;
	private VistaFacility facility;
	
	public VistaLabReport(LabResultTO res) {
		this.testName = res.getTest().getName();
		this.specimen = new VistaLabSpecimen();
		this.specimen.name = res.getSpecimenType();
		this.result = new StringBuffer(res.getValue()).append(res.getTest().getUnits()).toString();
		this.normalRange = res.getTest().getRefRange();
		this.result = ConvertUtil.stripRepeating(this.result, ' ');
	}

	public VistaLabReport(CytologyRpt mdws) {
		this.collectionDate = DC.convertVistaDate(mdws.getTimestamp());
		this.testName = mdws.getTitle();
		this.facility = new VistaFacility(mdws.getFacility());
		this.specimen = new VistaLabSpecimen(mdws.getSpecimen());
		this.result = mdws.getDiagnosis();
	}

	public VistaLabReport(MicrobiologyRpt mdws) {
		this.collectionDate = DC.convertVistaDate(mdws.getTimestamp());
		this.testName = mdws.getTitle();
		this.facility = new VistaFacility(mdws.getFacility());
		this.specimen = new VistaLabSpecimen(mdws.getSpecimen());
		this.result = ""; // TODO: Parse
	}

	public VistaLabReport(SurgicalPathologyRpt mdws) {
		this.collectionDate = DC.convertVistaDate(mdws.getTimestamp());
		this.testName = mdws.getTitle();
		this.facility = new VistaFacility(mdws.getFacility());
		this.specimen = new VistaLabSpecimen(mdws.getSpecimen());
		this.result = mdws.getDiagnosis();
	}
	
	private VistaLabReport() {}

	@Override
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return null;
	}

	public Date getCollectionDate() {
		return collectionDate;
	}

	public String getCollectionDateStr() {
		return DateUtil.convertDateToString(collectionDate);
	}

	public void setCollectionDate(Date collectionDate) {
		this.collectionDate = collectionDate;
	}

	@EscapeForXhtml
	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public VistaLabSpecimen getSpecimen() {
		return specimen;
	}

	public void setSpecimen(VistaLabSpecimen specimen) {
		this.specimen = specimen;
	}

	@EscapeForXhtml
	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public VistaFacility getFacility() {
		return facility;
	}

	public void setFacility(VistaFacility facility) {
		this.facility = facility;
	}

	public static VistaLabReport parseElectronMicroscopy(String text) {
		VistaLabReport report = new VistaLabReport();
		String facilityTitle = "Laboratory: ";
		VistaFacility facility = new VistaFacility();
		facility.sitecode = text.substring(text.indexOf(facilityTitle)+facilityTitle.length(), text.indexOf("Accession")).trim();
		report.setFacility(facility);
		String dateTitle = "Specimen (Received ";
		String dateStr = text.substring(text.indexOf(dateTitle)+dateTitle.length(),text.indexOf("):", text.indexOf(dateTitle)));
		DateFormat df = new SimpleDateFormat("MMM d, yyyy HH:mm");
		try {
			report.setCollectionDate(df.parse(dateStr));
		} catch (ParseException e) {
			LOG.error("Failed to parse "+dateStr, e);
		}
		VistaLabSpecimen specimen = new VistaLabSpecimen();
		specimen.name = text.substring(text.indexOf("\n", text.indexOf(dateTitle))+2, text.indexOf("- -", text.indexOf(dateTitle))-3).trim();
		report.setSpecimen(specimen);
		String resultTitle = "\n  DIAGNOSIS:";
		report.setResult(text.substring(text.indexOf("\n", text.indexOf(resultTitle))+resultTitle.length(), text.indexOf("CPT:", text.indexOf(resultTitle))).trim());
		report.setTestName("ELECTRON MICROSCOPY");
		
		return report;
	}

	public static VistaLabReport parseCytoPathology(String text) {
		VistaLabReport report = new VistaLabReport();
		String facilityTitle = "Laboratory: ";
		VistaFacility facility = new VistaFacility();
		facility.sitecode = text.substring(text.indexOf(facilityTitle)+facilityTitle.length(), text.indexOf("Accession")).trim();
		report.setFacility(facility);
		String dateTitle = "Specimen (Received ";
		String dateStr = text.substring(text.indexOf(dateTitle)+dateTitle.length(),text.indexOf("):", text.indexOf(dateTitle)));
		DateFormat df = new SimpleDateFormat("MMM d, yyyy HH:mm");
		try {
			report.setCollectionDate(df.parse(dateStr));
		} catch (ParseException e) {
			LOG.error("Failed to parse "+dateStr, e);
		}
		VistaLabSpecimen specimen = new VistaLabSpecimen();
		specimen.name = text.substring(text.indexOf("\n", text.indexOf(dateTitle))+1, text.indexOf("- -", text.indexOf(dateTitle))-1).trim();
		report.setSpecimen(specimen);
		String resultTitle = "CYTOPATHOLOGIC DIAGNOSIS:";
		report.setResult(text.substring(text.indexOf("\n", text.indexOf(resultTitle)), text.indexOf("CPT:", text.indexOf(resultTitle))).trim());
		report.setTestName("CYTOPATHOLOGY");
		
		return report;
	}

	public void setNormalRange(String normalRange) {
		this.normalRange = normalRange;
	}

	public String getNormalRange() {
		return normalRange;
	}

}
