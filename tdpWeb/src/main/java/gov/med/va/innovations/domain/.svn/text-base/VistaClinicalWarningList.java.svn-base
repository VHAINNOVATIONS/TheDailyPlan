package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.va.medora.mdws.emrsvc.TaggedText;
import gov.va.medora.mdws.emrsvc.TaggedTextArray;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class VistaClinicalWarningList extends VistaTO implements Serializable {
	private static final long serialVersionUID = -7705427136546673486L;
	private List<VistaClinicalWarning> warnings = new ArrayList<VistaClinicalWarning>();
	
	public VistaClinicalWarningList(TaggedTextArray mdws) {
		if (mdws.getCount() > 0) {
			for (TaggedText tt : mdws.getResults().getTaggedText()) {
				warnings.addAll(VistaClinicalWarning.parseTextBlob(tt.getText()));
			}
		}
	}

	@Override
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return warnings.size();
	}

	public List<VistaClinicalWarning> getWarnings() {
		return warnings;
	}

	public void setWarnings(List<VistaClinicalWarning> warnings) {
		this.warnings = warnings;
	}

}
