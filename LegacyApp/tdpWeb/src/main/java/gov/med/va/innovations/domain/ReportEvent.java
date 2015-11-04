package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.med.va.innovations.service.EventManager.EventCode;

public class ReportEvent extends VistaTO {

	private static final long serialVersionUID = -84459798922610505L;

	@Override
	public EventCode getEventCode() {
		return EventManager.EventCode.RPT;
	}

	@Override
	public Integer getListLength() {
		return null;
	}

}
