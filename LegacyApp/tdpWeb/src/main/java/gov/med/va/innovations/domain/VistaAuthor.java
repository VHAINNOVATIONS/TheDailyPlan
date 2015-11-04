package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.AuthorTO;

public class VistaAuthor extends VistaTO {
	private static final long serialVersionUID = 1L;
	protected String id;
    protected String name;
    protected String signature;

    public VistaAuthor(AuthorTO mdws) {
    	if (null == mdws)
    		return;
    	
    	this.id = mdws.getId();
    	this.name = mdws.getName();
    	this.signature = mdws.getSignature();
    }

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getSignature() {
		return signature;
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
