package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.OrderTypeTO;

public class VistaOrderType extends VistaTO {
	private static final long serialVersionUID = -4967216649156230579L;
	protected String id;
    protected String name1;
    protected String name2;

    public VistaOrderType(OrderTypeTO mdws) {
    	this.id = mdws.getId();
    	this.name1 = mdws.getName1();
    	this.name2 = mdws.getName2();
    }

	public String getId() {
		return id;
	}

	public String getName1() {
		return name1;
	}

	public String getName2() {
		return name2;
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
