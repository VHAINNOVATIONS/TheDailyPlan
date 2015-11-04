package gov.med.va.innovations.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import gov.med.va.innovations.service.EventManager;
import gov.med.va.innovations.util.DateConverter;
import gov.va.medora.mdws.emrsvc.SymptomTO;
import gov.va.medora.mdws.emrsvc.TaggedText;


public class VistaSymptom extends VistaTO {
	private static final long serialVersionUID = -5951249088139369870L;
	private static final DateConverter DC = new DateConverter();
	
	protected String id;
    protected String name;
    protected boolean isNational;
    protected String vuid;
    protected VistaObservationType type;
    protected VistaAuthor observer;
    protected Date timestamp;
    protected List<String> facility = new ArrayList<String>();

    public VistaSymptom(SymptomTO mdws) {
    	this.id = mdws.getId();
    	this.name = mdws.getName();
    	this.isNational = mdws.isIsNational();
    	this.vuid = mdws.getVuid();
    	this.type = null == mdws.getType() ? null : new VistaObservationType(mdws.getType());
    	this.observer = null == mdws.getObserver() ? null : new VistaAuthor(mdws.getObserver());
    	this.timestamp = DC.convertVistaDate(mdws.getTimestamp());
    	if (null != mdws.getFacility().getTaggedResults() && null != mdws.getFacility().getTaggedResults().getTaggedText()) {
    		for (TaggedText tt : mdws.getFacility().getTaggedResults().getTaggedText()) {
    			this.facility.add(tt.getText());
    		}
    	}
    }

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public boolean isNational() {
		return isNational;
	}

	public String getVuid() {
		return vuid;
	}

	public VistaObservationType getType() {
		return type;
	}

	public VistaAuthor getObserver() {
		return observer;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public List<String> getFacility() {
		return facility;
	}

	@Override
	public Integer getListLength() {
		return null;
	}

	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventManager.EventCode getEventCode() {
		return null;
	}
}
