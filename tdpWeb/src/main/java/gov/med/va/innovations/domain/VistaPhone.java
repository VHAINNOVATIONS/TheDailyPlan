package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.PhoneNumTO;

public class VistaPhone extends VistaTO {
	private static final long serialVersionUID = 2305828298667240273L;
	protected String areaCode;
    protected String exchange;
    protected String number;
    
    public VistaPhone(PhoneNumTO mdws) {
    	this.areaCode = mdws.getAreaCode();
    	this.exchange = mdws.getExchange();
    	this.number = mdws.getNumber();
    }
    
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public String getExchange() {
		return exchange;
	}
	public void setExchange(String exchange) {
		this.exchange = exchange;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
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
