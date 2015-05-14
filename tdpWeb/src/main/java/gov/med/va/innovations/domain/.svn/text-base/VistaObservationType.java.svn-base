package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.ObservationTypeTO;

public class VistaObservationType extends VistaTO {
	private static final long serialVersionUID = 1261457315102964156L;
	protected String id;
    protected String category;
    protected String name;
    protected String shortName;
    protected String dataId;
    protected String dataName;
    protected String dataType;

    public VistaObservationType(ObservationTypeTO mdws) {
    	this.id = mdws.getId();
    	this.category = mdws.getCategory();
    	this.name = mdws.getName();
    	this.shortName = mdws.getShortName();
    	this.dataId = mdws.getDataId();
    	this.dataName = mdws.getDataName();
    	this.dataType = mdws.getDataType();
    }

	public String getId() {
		return id;
	}

	public String getCategory() {
		return category;
	}

	public String getName() {
		return name;
	}

	public String getShortName() {
		return shortName;
	}

	public String getDataId() {
		return dataId;
	}

	public String getDataName() {
		return dataName;
	}

	public String getDataType() {
		return dataType;
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
