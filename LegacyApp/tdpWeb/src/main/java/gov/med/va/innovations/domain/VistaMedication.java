package gov.med.va.innovations.domain;

import java.util.Date;

import gov.med.va.innovations.service.EventManager;
import gov.med.va.innovations.util.DateConverter;
import gov.med.va.innovations.util.DateUtil;
import gov.va.medora.mdws.emrsvc.MedicationTO;


public class VistaMedication extends VistaTO {
	private static final long serialVersionUID = -6156761773421916046L;
	private static final DateConverter dc = new DateConverter();
	public static final String STATUS_ACTIVE = "ACTIVE";
	public static final String STATUS_HOLD = "HOLD";
	
	protected String id;
    protected String name;
    protected String rxNum;
    protected String quantity;
    protected Date expirationDate;
    protected Date issueDate;
    protected Date startDate;
    protected Date stopDate;
    protected String orderId;
    protected String status;
    protected String refills;
    protected boolean isOutpatient;
    protected boolean isInpatient;
    protected boolean isIV;
    protected boolean isUnitDose;
    protected boolean isNonVA;
    protected Date lastFillDate;
    protected String remaining;
    protected String facility;
    protected VistaAuthor provider;
    protected String cost;
    protected String sig;
    protected String type;
    protected String additives;
    protected String solution;
    protected String rate;
    protected String route;
    protected String dose;
    protected String instruction;
    protected String comment;
    protected String dateDocumented;
    protected VistaAuthor documentor;
    protected String detail;
    protected String schedule;
    protected String daysSupply;
    protected boolean isNew;

    public VistaMedication(MedicationTO mdws) {
    	this.id = mdws.getId();
    	this.name = mdws.getName();
    	this.rxNum = mdws.getRxNum();
    	this.quantity = mdws.getQuantity();
    	this.expirationDate = dc.convertVistaDate(mdws.getExpirationDate());
    	this.issueDate = dc.convertVistaDate(mdws.getIssueDate());
    	this.startDate = dc.convertVistaDate(mdws.getStartDate());
    	this.stopDate = dc.convertVistaDate(mdws.getStopDate());
    	this.orderId = mdws.getOrderId();
    	this.status = mdws.getStatus();
    	this.refills = mdws.getRefills();
    	this.isOutpatient = mdws.isIsOutpatient();
    	this.isInpatient = mdws.isIsInpatient();
    	this.isIV = mdws.isIsIV();
    	this.isUnitDose = mdws.isIsUnitDose();
    	this.isNonVA = mdws.isIsNonVA();
    	this.lastFillDate = dc.convertVistaDate(mdws.getLastFillDate());
    	this.remaining = mdws.getRemaining();
    	this.facility = mdws.getFacility().getText();
    	this.provider = null == mdws.getProvider() ? null : new VistaAuthor(mdws.getProvider());
    	this.cost = mdws.getCost();
    	this.sig = mdws.getSig();
    	this.type = mdws.getType();
    	this.additives = mdws.getAdditives();
    	this.solution = mdws.getSolution();
    	this.rate = mdws.getRate();
    	this.route = mdws.getRoute();
    	this.dose = mdws.getDose();
    	this.instruction = mdws.getInstruction();
    	this.comment = mdws.getComment();
    	this.dateDocumented = mdws.getDateDocumented();
    	this.documentor = null == mdws.getDocumentor() ? null : new VistaAuthor(mdws.getDocumentor());
    	this.detail = mdws.getDetail();
    	this.schedule = mdws.getSchedule();
    	this.daysSupply = mdws.getDaysSupply();
    }

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getRxNum() {
		return rxNum;
	}

	public String getQuantity() {
		return quantity;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public String getExpirationDateString() {
		return DateUtil.getDateTime(expirationDate);
	}

	public Date getIssueDate() {
		return issueDate;
	}

	public String getIssueDateString() {
		return DateUtil.getDateTime(issueDate);
	}

	public Date getStartDate() {
		return startDate;
	}

	public String getStartDateString() {
		return DateUtil.getDateTime(startDate);
	}

	public Date getStopDate() {
		return stopDate;
	}

	public String getStopDateString() {
		return DateUtil.getDateTime(stopDate);
	}

	public String getOrderId() {
		return orderId;
	}

	public String getStatus() {
		if (null == status) return "PENDING";
		return status;
	}

	public String getRefills() {
		return refills;
	}

	public boolean isOutpatient() {
		return isOutpatient;
	}

	public boolean isInpatient() {
		return isInpatient;
	}

	public boolean isIV() {
		return isIV;
	}

	public boolean isUnitDose() {
		return isUnitDose;
	}

	public boolean isNonVA() {
		return isNonVA;
	}

	public Date getLastFillDate() {
		return lastFillDate;
	}

	public String getRemaining() {
		return remaining;
	}

	public String getFacility() {
		return facility;
	}

	public VistaAuthor getProvider() {
		return provider;
	}

	public String getCost() {
		return cost;
	}

	public String getSig() {
		return sig;
	}

	public String getType() {
		return type;
	}

	public String getAdditives() {
		return additives;
	}

	public String getSolution() {
		return solution;
	}

	public String getRate() {
		return rate;
	}

	public String getRoute() {
		return route;
	}

	public String getDose() {
		return dose;
	}

	public String getInstruction() {
		return instruction;
	}

	public String getComment() {
		return comment;
	}

	public String getDateDocumented() {
		return dateDocumented;
	}

	public VistaAuthor getDocumentor() {
		return documentor;
	}

	public String getDetail() {
		return detail;
	}

	public String getSchedule() {
		return schedule;
	}

	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}

	public String getDaysSupply() {
		return daysSupply;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDose(String dose) {
		this.dose = dose;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public void setSig(String sig) {
		this.sig = sig;
	}

	@Override
	public Integer getListLength() {
		return null;
	}
	
	public boolean isHighRisk() {
		// TODO: Make a table keyed by Location
		return name.startsWith("MORPHINE") || name.startsWith("GLIPIZIDE");
	}

	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventManager.EventCode getEventCode() {
		return EventManager.EventCode.MED;
	}

	public boolean isNew() {
		return isNew;
	}

	public void setNew(boolean isNew) {
		this.isNew = isNew;
	}
}
