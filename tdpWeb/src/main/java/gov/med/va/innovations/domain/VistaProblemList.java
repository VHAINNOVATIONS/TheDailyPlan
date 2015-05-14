package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.va.medora.mdws.emrsvc.ProblemTO;
import gov.va.medora.mdws.emrsvc.TaggedProblemArray;
import gov.va.medora.mdws.emrsvc.TaggedProblemArrays;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class VistaProblemList extends VistaTO implements Serializable {

	private static final long serialVersionUID = -529661397397108373L;
	private List<VistaProblem> problems = new ArrayList<VistaProblem>();
	
	public VistaProblemList(TaggedProblemArrays problemList) {
		for(TaggedProblemArray tpa : problemList.getArrays().getTaggedProblemArray()) {
			if (null != tpa && tpa.getCount() > 0) {
				for (ProblemTO prob : tpa.getProblems().getProblemTO()) {
					problems.add(new VistaProblem(prob));
				}
			}
		}
	}

	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return problems.size();
	}

	public List<VistaProblem> getProblems() {
		return problems;
	}

}
