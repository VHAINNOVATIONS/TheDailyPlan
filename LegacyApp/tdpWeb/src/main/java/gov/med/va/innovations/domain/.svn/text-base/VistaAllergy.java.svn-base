package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.med.va.innovations.util.DateConverter;
import gov.va.medora.mdws.emrsvc.AllergyTO;
import gov.va.medora.mdws.emrsvc.TaggedText;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class VistaAllergy extends VistaTO {
 	private static final long serialVersionUID = -952398065858872030L;
 	private static final DateConverter DC = new DateConverter();
 	
	protected String allergenId;
    protected String allergenName;
    protected String allergenType;
    protected String reaction;
    protected String severity;
    protected String comment;
    protected Date timestamp;
    protected List<String> facility = new ArrayList<String>();
    protected VistaLocation location;
    protected VistaObservationType type;
    protected VistaAuthor observer;
    protected VistaAuthor recorder;
    protected List<VistaSymptom> reactions = new ArrayList<VistaSymptom>();
    protected List<String> drugIngredients = new ArrayList<String>();
    protected List<String> drugClasses = new ArrayList<String>();

    public VistaAllergy(AllergyTO mdws) {
    	this.allergenId = mdws.getAllergenId();
    	this.allergenName = mdws.getAllergenName();
    	this.allergenType = mdws.getAllergenType();
    	this.reaction = mdws.getReaction();
    	this.severity = mdws.getSeverity();
    	this.comment = mdws.getComment();
    	this.timestamp = DC.convertVistaDate(mdws.getTimestamp());
    	if (null != mdws.getFacility().getTaggedResults() && null != mdws.getFacility().getTaggedResults().getTaggedText()) {
    		for (TaggedText tt : mdws.getFacility().getTaggedResults().getTaggedText()) {
    			this.facility.add(tt.getText());
    		}
    	}
    	this.location = null == mdws.getLocation() ? null : new VistaLocation(mdws.getLocation());
    	this.type = null == mdws.getType() ? null : new VistaObservationType(mdws.getType());
    	this.observer = null == mdws.getObserver()? null : new VistaAuthor(mdws.getObserver());
    	this.recorder = null == mdws.getRecorder() ? null : new VistaAuthor(mdws.getRecorder());
    	if (null != mdws.getDrugIngredients() && null != mdws.getDrugIngredients().getTaggedText()) {
    		for (TaggedText tt : mdws.getDrugIngredients().getTaggedText()) {
    	    	this.drugIngredients.add(tt.getText());
    		}
    	}
    	if (null != mdws.getDrugClasses() && null != mdws.getDrugClasses().getTaggedText()) {
    		for (TaggedText tt : mdws.getDrugClasses().getTaggedText()) {
    			this.drugClasses.add(tt.getText());
    		}
    	}
    }

	public String getAllergenId() {
		return allergenId;
	}

	public String getAllergenName() {
		return null == allergenName ? "" : allergenName;
	}

	public String getAllergenType() {
		return null == allergenType ? "" : allergenType;
	}

	public String getReaction() {
		return null == reaction ? "" : reaction;
	}

	public String getSeverity() {
		return null == severity ? "" : severity;
	}

	public String getComment() {
		return null == comment ? "" : comment;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public List<String> getFacility() {
		return facility;
	}

	public VistaLocation getLocation() {
		return location;
	}

	public VistaObservationType getType() {
		return type;
	}

	public VistaAuthor getObserver() {
		return observer;
	}

	public VistaAuthor getRecorder() {
		return recorder;
	}

	public List<VistaSymptom> getReactions() {
		return reactions;
	}

	public List<String> getDrugIngredients() {
		return drugIngredients;
	}

	public List<String> getDrugClasses() {
		return drugClasses;
	}

	@Override
	public Integer getListLength() {
		return null;
	}

	@Override
	public EventManager.EventCode getEventCode() {
		return null;
	}
}
