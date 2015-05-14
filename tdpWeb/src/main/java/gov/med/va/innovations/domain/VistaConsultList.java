package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.ConsultTO;
import gov.va.medora.mdws.emrsvc.TaggedConsultArray;
import gov.va.medora.mdws.emrsvc.TaggedConsultArrays;

import java.util.ArrayList;
import java.util.List;

public class VistaConsultList extends VistaTO {

	private static final long serialVersionUID = -532061236704228306L;
	private List<VistaConsult> consults = new ArrayList<VistaConsult>();

	public VistaConsultList(TaggedConsultArrays mdws) {
		if (null != mdws.getArrays() && null != mdws.getArrays().getTaggedConsultArray()) {
			for (TaggedConsultArray tca : mdws.getArrays().getTaggedConsultArray()) {
				if (null != tca.getConsults() && null != tca.getConsults().getConsultTO()) {
					for(ConsultTO consult : tca.getConsults().getConsultTO()) {
						consults.add(new VistaConsult(consult));
					}
				}
			}
		}
	}

	public List<VistaConsult> getConsults() {
		return consults;
	}

	@Override
	public Integer getListLength() {
		return consults.size();
	}

	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventManager.EventCode getEventCode() {
		return null;
	}
}
