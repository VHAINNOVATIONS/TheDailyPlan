package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.UserTO;


public class VistaUser extends VistaTO {
	private static final long serialVersionUID = 8511101583716796192L;
	protected String name;
    protected String ssn;
    protected String duz;
    protected String siteId;
    protected String office;
    protected String phone;
    protected String pager;
    protected String service;
    protected String title;
    protected String orderRole;
    protected String userClass;
    protected String greeting;
    protected String siteMessage;
    
    public VistaUser(UserTO mdws) {
    	this.name = mdws.getName();
    	this.ssn = mdws.getSSN();
    	this.duz = mdws.getDUZ();
    	this.siteId = mdws.getSiteId();
    	this.office = mdws.getOffice();
    	this.phone = mdws.getPhone();
    	this.pager = mdws.getPager();
    	this.service = mdws.getService();
    	this.title = mdws.getTitle();
    	this.orderRole = mdws.getOrderRole();
    	this.userClass = mdws.getUserClass();
    	this.greeting = mdws.getGreeting();
    	this.siteMessage = mdws.getSiteMessage();
    }

	public String getName() {
		return name;
	}

	public String getSsn() {
		return ssn;
	}

	public String getDuz() {
		return duz;
	}

	public String getSiteId() {
		return siteId;
	}

	public String getOffice() {
		return office;
	}

	public String getPhone() {
		return phone;
	}

	public String getPager() {
		return pager;
	}

	public String getService() {
		return service;
	}

	public String getTitle() {
		return title;
	}

	public String getOrderRole() {
		return orderRole;
	}

	public String getUserClass() {
		return userClass;
	}

	public String getGreeting() {
		return greeting;
	}

	public String getSiteMessage() {
		return siteMessage;
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
