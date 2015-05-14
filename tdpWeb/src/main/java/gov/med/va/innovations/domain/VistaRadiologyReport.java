package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.med.va.innovations.util.DateConverter;
import gov.med.va.innovations.util.DateUtil;
import gov.va.medora.mdws.emrsvc.RadiologyReportTO;

import java.io.Serializable;
import java.util.Date;

public class VistaRadiologyReport extends VistaTO implements Serializable {
	private static final long serialVersionUID = 2723105612774799651L;
	private static final DateConverter DC = new DateConverter();
	protected String accessionNumber;
    protected String caseNumber;
    protected String id;
    protected String title;
    protected Date timestamp;
    protected VistaAuthor author;
    protected String text;
    protected VistaFacility facility;
    protected String status;
    protected String cptCode;
    protected String clinicalHx;
    protected String impression;
    
    public VistaRadiologyReport(RadiologyReportTO mdws) {
    	this.accessionNumber = mdws.getAccessionNumber();
    	this.caseNumber = mdws.getCaseNumber();
    	this.id = mdws.getId();
    	this.title = mdws.getTitle();
    	this.timestamp = DC.convertVistaDate(mdws.getTimestamp());
    	this.author = new VistaAuthor(mdws.getAuthor());
    	this.text = mdws.getText();
    	this.facility = new VistaFacility(mdws.getFacility());
    	this.status = mdws.getStatus();
    	this.cptCode = mdws.getCptCode();
    	this.clinicalHx = mdws.getClinicalHx();
    	this.impression = mdws.getImpression();
    }

	@Override
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return null;
	}

	public String getAccessionNumber() {
		return accessionNumber;
	}

	public String getCaseNumber() {
		return caseNumber;
	}

	public String getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public Date getTimestamp() {
		return timestamp;
	}
	
	public String getDateStr() {
		return DateUtil.convertDateToString(timestamp);
	}

	public VistaAuthor getAuthor() {
		return author;
	}

	public String getText() {
		return text;
	}

	public VistaFacility getFacility() {
		return facility;
	}

	public String getStatus() {
		return status;
	}

	public String getCptCode() {
		return cptCode;
	}

	public String getClinicalHx() {
		return clinicalHx;
	}

	public String getImpression() {
		return impression;
	}

}
