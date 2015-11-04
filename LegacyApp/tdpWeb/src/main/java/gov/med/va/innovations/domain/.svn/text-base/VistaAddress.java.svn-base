package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.AddressTO;

public class VistaAddress extends VistaTO {
	private static final long serialVersionUID = -1838868411506100531L;
	protected String streetAddress1;
    protected String streetAddress2;
    protected String streetAddress3;
    protected String city;
    protected String county;
    protected String state;
    protected String zipcode;
    
    public VistaAddress(AddressTO mdws) {
    	this.streetAddress1 = mdws.getStreetAddress1();
    	this.streetAddress2	= mdws.getStreetAddress2();
    	this.streetAddress3 = mdws.getStreetAddress3();
    	this.city = mdws.getCity();
    	this.county = mdws.getCounty();
    	this.state = mdws.getState();
    	this.zipcode = mdws.getZipcode();
    }
    
	public String getStreetAddress1() {
		return streetAddress1;
	}
	public void setStreetAddress1(String streetAddress1) {
		this.streetAddress1 = streetAddress1;
	}
	public String getStreetAddress2() {
		return streetAddress2;
	}
	public void setStreetAddress2(String streetAddress2) {
		this.streetAddress2 = streetAddress2;
	}
	public String getStreetAddress3() {
		return streetAddress3;
	}
	public void setStreetAddress3(String streetAddress3) {
		this.streetAddress3 = streetAddress3;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCounty() {
		return county;
	}
	public void setCounty(String county) {
		this.county = county;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	@Override
	public Integer getListLength() {
		return null;
	}

	@Override
	public EventManager.EventCode getEventCode() {
		return null;
	}

}
