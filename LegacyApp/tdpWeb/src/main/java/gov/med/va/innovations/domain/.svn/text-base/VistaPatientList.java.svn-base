package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;

import java.util.List;

public class VistaPatientList extends VistaTO {
	private static final long serialVersionUID = 8454681513708254820L;
	protected List<VistaPatient> patients;
	protected int total;
	protected int first;
	protected int last;
	
	public List<VistaPatient> getPatients() {
		return patients;
	}
	public void setPatients(List<VistaPatient> patients) {
		this.patients = patients;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public int getFirst() {
		return first;
	}
	public void setFirst(int first) {
		this.first = first;
	}
	public int getLast() {
		return last;
	}
	public void setLast(int last) {
		this.last = last;
	}
	@Override
	public Integer getListLength() {
		return patients.size();
	}
	
	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventManager.EventCode getEventCode() {
		return null;
	}
	
}
