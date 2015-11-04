package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.UserTO;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;


public class VistaSignon extends VistaTO {
	private static final long serialVersionUID = 5392385334549202926L;
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
    protected boolean signonSucceeded;

//    public VistaSignon(VistaSignonRpc rpc) {
//    	VistaSignonResult result = rpc.getVistaSignonResult();
//    	if (result.getDuz() > 0)
//     		this.name = result.getGreeting().substring(result.getGreeting().lastIndexOf(' '));
//    	this.ssn = String.valueOf(result.getIen());
//    	this.duz = String.valueOf(result.getDuz());
//    	this.greeting = result.getGreeting();
//    	this.signonSucceeded = result.getSignonSucceeded();
//    }
    
    public VistaSignon(UserTO mdws) {
    	this.name = mdws.getName();
    	this.ssn = mdws.getSSN();
    	this.siteId = mdws.getSiteId();
    	this.duz = mdws.getDUZ();
    	this.office = mdws.getOffice();
    	this.phone = mdws.getPhone();
    	this.pager = mdws.getPager();
    	this.service = mdws.getService();
    	this.title = mdws.getTitle();
    	this.orderRole = mdws.getOrderRole();
    	this.userClass = mdws.getUserClass();
    	this.greeting = mdws.getGreeting();
    	this.siteMessage = mdws.getSiteMessage();
    	this.signonSucceeded = null != mdws.getDUZ();
    }
    
    /**
     * {@inheritDoc}
     */
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VistaSignon)) {
            return false;
        }

        final VistaSignon user = (VistaSignon) o;

        return !(duz != null ? !duz.equals(user.getDuz()) : user.getDuz() != null);

    }
    
    /**
     * {@inheritDoc}
     */
    public int hashCode() {
        return (duz != null ? duz.hashCode() : 0);
    }

    /**
     * {@inheritDoc}
     */
    public String toString() {
        ToStringBuilder sb = new ToStringBuilder(this, ToStringStyle.DEFAULT_STYLE)
                .append("duz", this.duz)
                .append("name", this.name)
                .append("ssn", this.ssn)
                .append("greeting", this.greeting);
        return sb.toString();
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

	public String getDuz() {
		return duz;
	}

	public void setDuz(String duz) {
		this.duz = duz;
	}

	public String getSiteId() {
		return siteId;
	}

	public void setSiteId(String siteId) {
		this.siteId = siteId;
	}

	public String getOffice() {
		return office;
	}

	public void setOffice(String office) {
		this.office = office;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPager() {
		return pager;
	}

	public void setPager(String pager) {
		this.pager = pager;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getOrderRole() {
		return orderRole;
	}

	public void setOrderRole(String orderRole) {
		this.orderRole = orderRole;
	}

	public String getUserClass() {
		return userClass;
	}

	public void setUserClass(String userClass) {
		this.userClass = userClass;
	}

	public String getGreeting() {
		return greeting;
	}

	public void setGreeting(String greeting) {
		this.greeting = greeting;
	}

	public String getSiteMessage() {
		return siteMessage;
	}

	public void setSiteMessage(String siteMessage) {
		this.siteMessage = siteMessage;
	}

	public boolean isSignonSucceeded() {
		return signonSucceeded;
	}

	public void setSignonSucceeded(boolean signonSucceeded) {
		this.signonSucceeded = signonSucceeded;
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
