package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.va.medora.mdws.emrsvc.VitalSignSetTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class VistaVitalSignList extends VistaTO implements Serializable {

	private static final long serialVersionUID = -2027112199126296610L;
	protected List<VistaVitalSign> vitals = new ArrayList<VistaVitalSign>();

	public VistaVitalSignList(List<VitalSignSetTO> mdws) {
		for (VitalSignSetTO vitalSet:mdws) {
			vitals.add(new VistaVitalSign(vitalSet));
		}

	}

	@Override
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return vitals.size();
	}

	public List<VistaVitalSign> getVitals() {
		return vitals;
	}

	public void setVitals(List<VistaVitalSign> vitals) {
		this.vitals = vitals;
	}

}
