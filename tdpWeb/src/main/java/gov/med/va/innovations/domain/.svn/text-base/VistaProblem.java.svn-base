package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.med.va.innovations.util.DateConverter;
import gov.med.va.innovations.util.DateUtil;
import gov.va.medora.mdws.emrsvc.ProblemTO;

import java.io.Serializable;
import java.util.Date;

public class VistaProblem extends VistaTO implements Serializable {
	private static final long serialVersionUID = 5517118133369901876L;
	private static final DateConverter DC = new DateConverter();
	private String id;
    private String status;
    private String providerNarrative;
    private Date onsetDate;
    private Date modifiedDate;
    private String exposures;
    private String noteNarrative;
    private VistaAuthor observer;
    private VistaFacility facility;
    private VistaObservationType type;
    private String comment;

    public VistaProblem(ProblemTO mdws) {
    	this.id = mdws.getId();
    	this.status = mdws.getStatus();
    	this.providerNarrative = mdws.getProviderNarrative();
    	this.onsetDate = DC.convertVistaDate(mdws.getOnsetDate());
    	this.modifiedDate = DC.convertVistaDate(mdws.getModifiedDate());
    	this.exposures = mdws.getExposures();
    	this.noteNarrative = mdws.getNoteNarrative();
    	this.observer = new VistaAuthor(mdws.getObserver());
    	this.facility = new VistaFacility(mdws.getFacility());
    	this.type = new VistaObservationType(mdws.getType());
    	this.comment = mdws.getComment();
    }
    
	@Override
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return null;
	}

	public String getId() {
		return id;
	}

	public String getStatus() {
		if (status.equals("A"))
			return "Active";
		else if (status.equals("I"))
			return "Inacive";
		else
			return status;
	}

	public String getProviderNarrative() {
		return providerNarrative;
	}

	public String getOnsetDate() {
		return DateUtil.convertDateToString(onsetDate);
	}

	public String getModifiedDate() {
		return DateUtil.convertDateToString(modifiedDate);
	}

	public String getExposures() {
		return exposures;
	}

	public String getNoteNarrative() {
		return noteNarrative;
	}

	public VistaAuthor getObserver() {
		return observer;
	}

	public VistaFacility getFacility() {
		return facility;
	}

	public VistaObservationType getType() {
		return type;
	}

	public String getComment() {
		return comment;
	}

}
