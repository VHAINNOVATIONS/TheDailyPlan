package gov.med.va.innovations.domain;

import java.util.Date;

import gov.med.va.innovations.service.EventManager;
import gov.med.va.innovations.util.DateConverter;
import gov.med.va.innovations.util.DateUtil;
import gov.med.va.innovations.util.annotation.EscapeForXhtml;
import gov.va.medora.mdws.emrsvc.OrderTO;


public class VistaOrder extends VistaTO {
	private static final long serialVersionUID = -8790110812317823533L;
	private static final DateConverter DC = new DateConverter();

	protected String id;
    protected Date timestamp;
    protected String orderingServiceName;
    protected String treatingSpecialty;
    protected Date startDate;
    protected Date stopDate;
    protected VistaOrderStatus status;
    protected VistaSigStatus sigStatus;
    protected Date dateSigned;
    protected String verifyingNurse;
    protected String dateVerified;
    protected String verifyingClerk;
    protected String chartReviewer;
    protected Date dateReviewed;
    protected VistaUser provider;
    protected String text;
    protected String detail;
    protected String errMsg;
    protected boolean flag;
    protected VistaOrderType type;

    public VistaOrder(OrderTO mdws) {
    	this.id = mdws.getId();
    	this.timestamp = DC.convertVistaDate(mdws.getTimestamp());
    	this.orderingServiceName = mdws.getOrderingServiceName();
    	this.treatingSpecialty = mdws.getTreatingSpecialty();
    	this.startDate = DC.convertVistaDate(mdws.getStartDate());
    	this.stopDate = DC.convertVistaDate(mdws.getStopDate());
    	if (null == stopDate) {
    		stopDate = new Date();
    	}
    	else if (stopDate.before(startDate)) {
    		stopDate = startDate.before(new Date()) ? new Date() : startDate;
    	}
       	this.status = VistaOrderStatus.getVistaOrderStatus(mdws.getStatus());
   		this.sigStatus = VistaSigStatus.getVistaSigStatus(mdws.getSigStatus());
    	this.dateSigned = DC.convertVistaDate(mdws.getDateSigned());
    	this.verifyingNurse = mdws.getVerifyingNurse();
    	this.dateVerified = mdws.getDateVerified();
    	this.verifyingClerk = mdws.getVerifyingClerk();
    	this.chartReviewer = mdws.getChartReviewer();
    	this.dateReviewed = DC.convertVistaDate(mdws.getDateReviewed());
    	this.provider = null == mdws.getProvider() ? null : new VistaUser(mdws.getProvider());
    	this.text = mdws.getText();
    	this.detail = mdws.getDetail();
    	this.errMsg = mdws.getErrMsg();
    	this.flag = mdws.isFlag();
    	this.type = null == mdws.getType() ? null : new VistaOrderType(mdws.getType());
    }

	public VistaOrder(String text) {
		this.text = text;
	}

	public String getId() {
		return id;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public String getTimestampString() {
		return DateUtil.getDateTime(timestamp);
	}

	public String getOrderingServiceName() {
		return orderingServiceName;
	}

	public String getTreatingSpecialty() {
		return treatingSpecialty;
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

	public VistaOrderStatus getStatus() {
		return status;
	}

	public VistaSigStatus getSigStatus() {
		return sigStatus;
	}

	public Date getDateSigned() {
		return dateSigned;
	}

	public String getVerifyingNurse() {
		return verifyingNurse;
	}

	public String getDateVerified() {
		return dateVerified;
	}

	public String getVerifyingClerk() {
		return verifyingClerk;
	}

	public String getChartReviewer() {
		return chartReviewer;
	}

	public Date getDateReviewed() {
		return dateReviewed;
	}

	public VistaUser getProvider() {
		return provider;
	}

	@EscapeForXhtml
	public String getText() {
		return text;
	}

	public String getDetail() {
		return detail;
	}

	public String getErrMsg() {
		return errMsg;
	}

	public boolean isFlag() {
		return flag;
	}

	public VistaOrderType getType() {
		return type;
	}

	public void setText(String text) {
		this.text = text;
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
