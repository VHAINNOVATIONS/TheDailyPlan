package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.med.va.innovations.util.DateConverter;
import gov.va.medora.mdws.emrsvc.LabSpecimenTO;

import java.io.Serializable;
import java.util.Date;

public class VistaLabSpecimen extends VistaTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2777930562486322942L;
	private static final DateConverter DC = new DateConverter();
    protected String id;
    protected String name;
    protected Date collectionDate;
    protected String accessionNum;
    protected String site;
    protected String facility;

    public VistaLabSpecimen(LabSpecimenTO mdws) {
    	this.id = mdws.getId();
    	this.name = mdws.getName();
    	this.collectionDate = DC.convertVistaDate(mdws.getCollectionDate());
    	this.accessionNum = mdws.getAccessionNum();
    	this.site = mdws.getSite();
    	this.facility = null == mdws.getFacility() ? "" : mdws.getFacility().getText();
    }

	protected VistaLabSpecimen() {}

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

	public String getName() {
		return name;
	}

	public Date getCollectionDate() {
		return collectionDate;
	}

	public String getAccessionNum() {
		return accessionNum;
	}

	public String getSite() {
		return site;
	}

	public String getFacility() {
		return facility;
	}

}
