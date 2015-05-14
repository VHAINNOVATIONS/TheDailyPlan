package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.med.va.innovations.util.DateConverter;
import gov.med.va.innovations.util.DateUtil;
import gov.va.medora.mdws.emrsvc.VitalSignSetTO;
import gov.va.medora.mdws.emrsvc.VitalSignTO;

import java.io.Serializable;
import java.util.Date;

public class VistaVitalSign extends VistaTO implements Serializable {

	private static final long serialVersionUID = 8829116771109417918L;
	private static final DateConverter DC = new DateConverter();
	private Date dateStamp;
	private String bloodPressure;
	private String temperature;
	private String pulse;
	private String respiration;
	
	private enum Type {Temperature, Pulse, Blood_Pressure, Respiration};
	
	public VistaVitalSign(VitalSignSetTO mdws) {
		dateStamp = DC.convertVistaDate(mdws.getTimestamp());
		for (VitalSignTO vs : mdws.getVitalSigns().getVitalSignTO()) {
			Type type = null;
			try {
				type = Type.valueOf(vs.getType().getName().replace(' ', '_'));
			}
			catch (IllegalArgumentException iae) {
				continue;
			}
			switch (type) {
				case Temperature:
					temperature = new StringBuffer(vs.getValue1()).append(vs.getUnits()).toString();
					break;
				case Pulse:
					pulse = new StringBuffer(vs.getValue1()).append(vs.getUnits()).toString();
					break;
				case Blood_Pressure:
					bloodPressure = new StringBuffer(vs.getValue1()).append(" ").append(vs.getUnits()).toString();
					break;
				case Respiration:
					respiration = new StringBuffer(vs.getValue1()).append(vs.getUnits()).toString();
					break;
			}
		}
	}
	
	@Override
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return null == dateStamp ? 0 : 1;
	}

	public Date getDateStamp() {
		return dateStamp;
	}

	public void setDateStamp(Date dateStamp) {
		this.dateStamp = dateStamp;
	}
	
	public String getDate() {
		return DateUtil.convertDateToString(dateStamp);
	}
	
	public String getTime() {
		return DateUtil.convertTimeToString(dateStamp);
	}

	public String getBloodPressure() {
		return null == bloodPressure ? "" : bloodPressure;
	}

	public void setBloodPressure(String bloodPressure) {
		this.bloodPressure = bloodPressure;
	}

	public String getTemperature() {
		return null == temperature ? "" : temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	public String getPulse() {
		return null == pulse ? "" : pulse;
	}

	public void setPulse(String pulse) {
		this.pulse = pulse;
	}

	public String getRespiration() {
		return null == respiration ? "" : respiration;
	}

	public void setRespiration(String respiration) {
		this.respiration = respiration;
	}
}
