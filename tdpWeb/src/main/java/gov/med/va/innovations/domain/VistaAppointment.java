package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.med.va.innovations.util.DateConverter;
import gov.med.va.innovations.util.DateUtil;
import gov.va.medora.mdws.emrsvc.AppointmentTO;

import java.util.Date;

public class VistaAppointment extends VistaTO {
	private static final long serialVersionUID = 135942235465266773L;
	private static final DateConverter DC = new DateConverter();
	protected String id;
    protected Date timestamp;
    protected String title;
    protected String status;
    protected String text;
    protected String facility;
    protected VistaLocation clinic;
    protected Date labDateTime;
    protected Date xrayDateTime;
    protected Date ekgDateTime;
    protected String purpose;
    protected String type;
    protected String currentStatus;

    public VistaAppointment(AppointmentTO mdws) {
    	this.id = mdws.getId();
    	this.timestamp = DC.convertVistaDate(mdws.getTimestamp());
    	this.title = mdws.getTitle();
    	this.status = mdws.getStatus();
    	this.text = mdws.getText();
    	this.facility = null == mdws.getFacility() ? null : mdws.getFacility().getText();
    	this.clinic = null == mdws.getClinic() ? null : new VistaLocation(mdws.getClinic());
    	this.labDateTime = DC.convertVistaDate(mdws.getLabDateTime());
    	this.xrayDateTime = DC.convertVistaDate(mdws.getXrayDateTime());
    	this.ekgDateTime = DC.convertVistaDate(mdws.getEkgDateTime());
    	this.purpose = mdws.getPurpose();
    	this.type = mdws.getType();
    	this.currentStatus = mdws.getCurrentStatus();
    }

	public static DateConverter getDc() {
		return DC;
	}

	public String getId() {
		return id;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public String getTitle() {
		return title;
	}

	public String getStatus() {
		return status;
	}

	public String getText() {
		return text;
	}

	public String getFacility() {
		return facility;
	}

	public VistaLocation getClinic() {
		return clinic;
	}

	public Date getLabDateTime() {
		return labDateTime;
	}

	public Date getXrayDateTime() {
		return xrayDateTime;
	}

	public Date getEkgDateTime() {
		return ekgDateTime;
	}

	public String getPurpose() {
		return purpose;
	}

	public String getType() {
		return type;
	}

	public String getCurrentStatus() {
		return currentStatus;
	}

	public String getTimestampString() {
		return DateUtil.getDateTime(timestamp);
	}

	public Object getLabDateTimeString() {
		return DateUtil.getDateTime(labDateTime);
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
