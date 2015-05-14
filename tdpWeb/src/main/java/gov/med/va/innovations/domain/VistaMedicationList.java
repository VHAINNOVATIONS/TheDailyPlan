package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;

import java.util.List;

public class VistaMedicationList extends VistaTO {

	private static final long serialVersionUID = -532061236704228306L;
	private List<VistaMedication> meds;

	public VistaMedicationList(List<VistaMedication> meds) {
		this.meds = meds;
	}

	public List<VistaMedication> getMeds() {
		return meds;
	}

	public void setMeds(List<VistaMedication> meds) {
		this.meds = meds;
	}

	@Override
	public Integer getListLength() {
		return meds.size();
	}

	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventManager.EventCode getEventCode() {
		return EventManager.EventCode.MED;
	}
}
