package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.AppointmentTO;
import gov.va.medora.mdws.emrsvc.ArrayOfTaggedAppointmentArray;
import gov.va.medora.mdws.emrsvc.TaggedAppointmentArray;

import java.util.ArrayList;
import java.util.List;

public class VistaAppointmentList extends VistaTO {

	private static final long serialVersionUID = -4257102301502096019L;
	private List<VistaAppointment> appointments = new ArrayList<VistaAppointment>();
	
	
	public VistaAppointmentList(ArrayOfTaggedAppointmentArray mdws) {
		if (null != mdws.getTaggedAppointmentArray()) {
			for (TaggedAppointmentArray taa : mdws.getTaggedAppointmentArray()) {
				for (AppointmentTO appt : taa.getAppts().getAppointmentTO()) {
					appointments.add(new VistaAppointment(appt));
				}
			}
		}
	}

	public void addAppointments(ArrayOfTaggedAppointmentArray mdws) {
		if (null != mdws.getTaggedAppointmentArray()) {
			for (TaggedAppointmentArray taa : mdws.getTaggedAppointmentArray()) {
				for (AppointmentTO appt : taa.getAppts().getAppointmentTO()) {
					appointments.add(new VistaAppointment(appt));
				}
			}
		}
	}

	public List<VistaAppointment> getAppointments() {
		return appointments;
	}

	@Override
	public Integer getListLength() {
		return appointments.size();
	}

	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventManager.EventCode getEventCode() {
		return null;
	}

}
