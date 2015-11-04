package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;

import java.util.List;

public class VistaOrderList extends VistaTO {
	private static final long serialVersionUID = 8454681513708254820L;
	protected List<VistaOrder> orders;
	
	public List<VistaOrder> getOrders() {
		return orders;
	}
	public void setOrders(List<VistaOrder> orders) {
		this.orders = orders;
	}
	
	@Override
	public Integer getListLength() {
		return orders.size();
	}

	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventManager.EventCode getEventCode() {
		return null;
	}
	
}
