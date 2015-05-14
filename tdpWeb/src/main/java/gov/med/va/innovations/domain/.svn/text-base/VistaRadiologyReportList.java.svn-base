package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.RadiologyReportTO;
import gov.va.medora.mdws.emrsvc.TaggedRadiologyReportArray;
import gov.va.medora.mdws.emrsvc.TaggedRadiologyReportArrays;

import java.util.ArrayList;
import java.util.List;

public class VistaRadiologyReportList extends VistaTO {
	private static final long serialVersionUID = 6026204561031001229L;
	protected List<VistaRadiologyReport> reports = new ArrayList<VistaRadiologyReport>();
	
	public VistaRadiologyReportList(TaggedRadiologyReportArrays rpts) {
		if (rpts.getCount() > 0) {
			for (TaggedRadiologyReportArray tra : rpts.getArrays().getTaggedRadiologyReportArray()) {
				if (tra.getCount() > 0) {
					for (RadiologyReportTO rr : tra.getRpts().getRadiologyReportTO()) {
						reports.add(new VistaRadiologyReport(rr));
					}
				}
			}
		}
	}
	public List<VistaRadiologyReport> getRadiologyReports() {
		return reports;
	}
	public void setRadiologyReports(List<VistaRadiologyReport> reports) {
		this.reports = reports;
	}
	
	@Override
	public Integer getListLength() {
		return reports.size();
	}

	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventManager.EventCode getEventCode() {
		return null;
	}
	
}
