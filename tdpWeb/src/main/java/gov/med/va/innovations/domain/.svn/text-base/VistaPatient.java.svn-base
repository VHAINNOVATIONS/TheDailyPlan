package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.PatientTO;
import gov.va.medora.mdws.emrsvc.SiteTO;
import gov.va.medora.mdws.emrsvc.TaggedText;

import java.util.ArrayList;
import java.util.List;

public class VistaPatient extends VistaTO {
	private static final long serialVersionUID = 5973327576140407277L;
	protected String name;
    protected String ssn;
    protected String gender;
    protected String dob;
    protected String ethnicity;
    protected int age;
    protected String maritalStatus;
    protected VistaAddress homeAddress;
    protected VistaPhone homePhone;
    protected VistaPhone cellPhone;
    protected String patientName;
    protected String mpiPid;
    protected String mpiChecksum;
    protected String localPid;
    protected List<String> sitePids = new ArrayList<String>();
    protected String vendorPid;
    protected VistaLocation location;
    protected String cwad;
    protected boolean restricted;
    protected String admitTimestamp;
    protected boolean serviceConnected;
    protected int scPercent;
    protected boolean inpatient;
    protected String deceasedDate;
    protected boolean confidentiality;
    protected boolean needsMeansTest;
    protected List<String> patientFlags = new ArrayList<String>();
    protected String cmorSiteId;
    protected String activeInsurance;
    protected boolean isTestPatient;
    protected String currentMeansStatus;
    protected boolean hasInsurance;
    protected String preferredFacility;
    protected String patientType;
    protected boolean isVeteran;
    protected boolean isLocallyAssignedMpiPid;
    protected List<String> sites = new ArrayList<String>();
    
    public VistaPatient(PatientTO mdws) {
    	this.name = mdws.getName();
    	this.ssn = mdws.getSsn();
    	this.gender = mdws.getGender();
    	this.dob = mdws.getDob();
    	this.ethnicity = mdws.getEthnicity();
    	this.age = mdws.getAge();
    	this.maritalStatus = mdws.getMaritalStatus();
    	if (null != mdws.getHomeAddress())
    		this.homeAddress = new VistaAddress(mdws.getHomeAddress());
       	if (null != mdws.getHomePhone())
       		this.homePhone = new VistaPhone(mdws.getHomePhone());
       	if (null != mdws.getCellPhone())
       		this.cellPhone = new VistaPhone(mdws.getCellPhone());
    	this.patientName = mdws.getPatientName();
    	this.mpiPid = mdws.getMpiPid();
    	this.mpiChecksum = mdws.getMpiChecksum();
    	this.localPid = mdws.getLocalPid();
    	if (null != mdws.getSitePids() && mdws.getSitePids().getCount() > 0)
    		for(TaggedText tt : mdws.getSitePids().getResults().getTaggedText()) {
    			this.sitePids.add(tt.getText());
    		}
    	this.vendorPid = mdws.getVendorPid();
    	if (null != mdws.getLocation())
    		this.location = new VistaLocation(mdws.getLocation());
    	this.cwad = mdws.getCwad();
    	this.admitTimestamp = mdws.getAdmitTimestamp();
    	this.scPercent = mdws.getScPercent();
    	this.inpatient = mdws.isInpatient();
    	this.deceasedDate = mdws.getDeceasedDate();
    	this.confidentiality = mdws.getConfidentiality().getTag().equals("1");
    	this.needsMeansTest = mdws.isNeedsMeansTest();
    	if (mdws.getPatientFlags().getCount() > 0) {
    		for (TaggedText tt : mdws.getPatientFlags().getResults().getTaggedText()) {
    			this.patientFlags.add(tt.getTag()+":"+tt.getText());
    		}
    	}
    	this.cmorSiteId = mdws.getCmorSiteId();
    	this.activeInsurance = mdws.getActiveInsurance();
    	this.isTestPatient = mdws.isIsTestPatient();
    	this.currentMeansStatus = mdws.getCurrentMeansStatus();
    	this.hasInsurance = mdws.isHasInsurance();
    	this.preferredFacility = mdws.getPreferredFacility().getText();
    	this.patientType = mdws.getPatientType();
    	this.isVeteran = mdws.isIsVeteran();
    	this.isLocallyAssignedMpiPid = mdws.isIsLocallyAssignedMpiPid();
    	if (null != mdws.getSites() && mdws.getSites().getCount() > 0) {
    		for (SiteTO site : mdws.getSites().getSites().getSiteTO()) {
    			this.sites.add(site.getName());
    		}
    	}
    }
    
    public String getName() {
		return name;
	}
	public String getSsn() {
		return new StringBuffer(ssn.substring(0,3)).append("-")
			.append(ssn.substring(3,5)).append("-")
			.append(ssn.substring(5,9)).toString();
	}
	public String getGender() {
		return gender;
	}
	public String getDob() {
		return dob;
	}
	public String getEthnicity() {
		return ethnicity;
	}
	public int getAge() {
		return age;
	}
	public String getMaritalStatus() {
		return maritalStatus;
	}
	public VistaAddress getHomeAddress() {
		return homeAddress;
	}
	public VistaPhone getHomePhone() {
		return homePhone;
	}
	public VistaPhone getCellPhone() {
		return cellPhone;
	}
	public String getPatientName() {
		return patientName;
	}
	public String getMpiPid() {
		return mpiPid;
	}
	public String getMpiChecksum() {
		return mpiChecksum;
	}
	public String getLocalPid() {
		return localPid;
	}
	public List<String> getSitePids() {
		return sitePids;
	}
	public String getVendorPid() {
		return vendorPid;
	}
	public VistaLocation getLocation() {
		return location;
	}
	public String getCwad() {
		return cwad;
	}
	public boolean isRestricted() {
		return restricted;
	}
	public String getAdmitTimestamp() {
		return admitTimestamp;
	}
	public boolean isServiceConnected() {
		return serviceConnected;
	}
	public int getScPercent() {
		return scPercent;
	}
	public boolean isInpatient() {
		return inpatient;
	}
	public String getDeceasedDate() {
		return deceasedDate;
	}
	public boolean isConfidentiality() {
		return confidentiality;
	}
	public boolean isNeedsMeansTest() {
		return needsMeansTest;
	}
	public List<String> getPatientFlags() {
		return patientFlags;
	}
	public String getCmorSiteId() {
		return cmorSiteId;
	}
	public String getActiveInsurance() {
		return activeInsurance;
	}
	public boolean isTestPatient() {
		return isTestPatient;
	}
	public String getCurrentMeansStatus() {
		return currentMeansStatus;
	}
	public boolean isHasInsurance() {
		return hasInsurance;
	}
	public String getPreferredFacility() {
		return preferredFacility;
	}
	public String getPatientType() {
		return patientType;
	}
	public boolean isVeteran() {
		return isVeteran;
	}
	public boolean isLocallyAssignedMpiPid() {
		return isLocallyAssignedMpiPid;
	}
	public List<String> getSites() {
		return sites;
	}
	public VistaTeam getTeam() {
		return team;
	}
	protected VistaTeam team;

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
