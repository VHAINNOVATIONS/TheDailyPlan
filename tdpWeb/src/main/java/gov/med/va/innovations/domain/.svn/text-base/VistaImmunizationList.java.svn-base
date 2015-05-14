package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.va.medora.mdws.emrsvc.TaggedText;
import gov.va.medora.mdws.emrsvc.TaggedTextArray;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class VistaImmunizationList extends VistaTO implements Serializable {
	private static final long serialVersionUID = -7705427136546673486L;
	private List<VistaImmunization> immunizations = new ArrayList<VistaImmunization>();
	
	public VistaImmunizationList(TaggedTextArray mdws) {
		if (mdws.getCount() > 0) {
			for (TaggedText tt : mdws.getResults().getTaggedText()) {
				immunizations.addAll(VistaImmunization.parseTextBlob(tt.getText()));
			}
		}
	}

	@Override
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return immunizations.size();
	}

	public List<VistaImmunization> getImmunizations() {
		return immunizations;
	}

	public void setImmunizations(List<VistaImmunization> immunizations) {
		this.immunizations = immunizations;
	}

}
