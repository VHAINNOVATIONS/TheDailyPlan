package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.med.va.innovations.util.DateConverter;
import gov.va.medora.mdws.emrsvc.SiteTO;
import gov.va.medora.mdws.emrsvc.TaggedText;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class VistaFacility extends VistaTO {
	private static final long serialVersionUID = -3712410174378862280L;
	private static final DateConverter DC = new DateConverter();
	
    protected String sitecode;
    protected String name;
    protected String displayName;
    protected String moniker;
    protected String regionID;
    protected Date lastEventTimestamp;
    protected String lastEventReason;
    protected String uid;
    protected String pid;
    protected String parentSiteId;
    protected List<String> childSites;
    protected String address;
    protected String city;
    protected String state;
    protected String systemName;
    protected String siteType;
    
    public VistaFacility(SiteTO mdws) {
    	this.sitecode = mdws.getSitecode();
    	this.name = mdws.getName();
    	this.displayName = mdws.getDisplayName();
    	this.moniker = mdws.getMoniker();
    	this.regionID = mdws.getRegionID();
    	this.lastEventTimestamp = DC.convertVistaDate(mdws.getLastEventTimestamp());
    	this.lastEventReason = mdws.getLastEventReason();
    	this.uid = mdws.getUid();
    	this.pid = mdws.getPid();
    	this.parentSiteId = mdws.getParentSiteId();
    	if (null != mdws.getChildSites()) {
        	this.childSites = new ArrayList<String>(mdws.getChildSites().getCount());
        	for(SiteTO site : mdws.getChildSites().getSites().getSiteTO()) {
        		this.childSites.add(site.getSitecode());
        	}
    	}
    	this.address = mdws.getAddress();
    	this.city = mdws.getCity();
    	this.state = mdws.getState();
    	this.siteType = mdws.getSiteType();
    }
    
    public VistaFacility(TaggedText taggedText) {
		this.sitecode = taggedText.getText();
		this.name = taggedText.getTag();
		this.displayName = taggedText.getTag();
	}
    
	protected VistaFacility() {
	}

	/**
     * {@inheritDoc}
     */
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VistaFacility)) {
            return false;
        }

        final VistaFacility fac = (VistaFacility) o;

        return !(name != null ? !name.equals(fac.getName()) : fac.getName() != null);

    }
    
    /**
     * {@inheritDoc}
     */
    public int hashCode() {
        return (name != null ? name.hashCode() : 0);
    }

    /**
     * {@inheritDoc}
     */
    public String toString() {
        ToStringBuilder sb = new ToStringBuilder(this, ToStringStyle.DEFAULT_STYLE)
                .append("sitecode", this.sitecode)
                .append("name", this.name)
                .append("displayName",this.displayName);
        return sb.toString();
    }
   
	public String getSitecode() {
		return sitecode;
	}
	public String getName() {
		return name;
	}
	public String getDisplayName() {
		return displayName;
	}
	public String getMoniker() {
		return moniker;
	}
	public String getRegionID() {
		return regionID;
	}
	public Date getLastEventTimestamp() {
		return lastEventTimestamp;
	}
	public String getLastEventReason() {
		return lastEventReason;
	}
	public String getUid() {
		return uid;
	}
	public String getPid() {
		return pid;
	}
	public String getParentSiteId() {
		return parentSiteId;
	}
	public List<String> getChildSites() {
		return childSites;
	}
	public String getAddress() {
		return address;
	}
	public String getCity() {
		return city;
	}
	public String getState() {
		return state;
	}
	public String getSystemName() {
		return systemName;
	}
	public String getSiteType() {
		return siteType;
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
