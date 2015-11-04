package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.med.va.innovations.util.DateConverter;
import gov.va.medora.mdws.emrsvc.ChemHemRpt;
import gov.va.medora.mdws.emrsvc.CytologyRpt;
import gov.va.medora.mdws.emrsvc.LabResultTO;
import gov.va.medora.mdws.emrsvc.MicrobiologyRpt;
import gov.va.medora.mdws.emrsvc.SurgicalPathologyRpt;
import gov.va.medora.mdws.emrsvc.TaggedChemHemRptArray;
import gov.va.medora.mdws.emrsvc.TaggedChemHemRptArrays;
import gov.va.medora.mdws.emrsvc.TaggedCytologyRptArray;
import gov.va.medora.mdws.emrsvc.TaggedCytologyRptArrays;
import gov.va.medora.mdws.emrsvc.TaggedMicrobiologyRptArray;
import gov.va.medora.mdws.emrsvc.TaggedMicrobiologyRptArrays;
import gov.va.medora.mdws.emrsvc.TaggedSurgicalPathologyRptArray;
import gov.va.medora.mdws.emrsvc.TaggedSurgicalPathologyRptArrays;
import gov.va.medora.mdws.emrsvc.TaggedText;
import gov.va.medora.mdws.emrsvc.TaggedTextArray;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class VistaLabReportList extends VistaTO implements Serializable {

	private static final long serialVersionUID = 409188885707745866L;
	private static final DateConverter DC = new DateConverter();
	private static final String PARSE_ELECTRON_MICROSCOPY = "ELECTRON MICROSCOPY";
	private static final String PARSE_CYTOPATHOLOGY = "CYTOPATHOLOGY";
	
	private List<VistaLabReport> labReports = new ArrayList<VistaLabReport>();
	
 
	public VistaLabReportList(TaggedChemHemRptArrays cha) {
		if (cha.getCount() >0) {
			for (TaggedChemHemRptArray ra : cha.getArrays().getTaggedChemHemRptArray()) {
				if (ra.getCount() > 0) {
					for (ChemHemRpt rpt : ra.getRpts().getChemHemRpt()) {
						if (null != rpt.getResults() && null != rpt.getResults().getLabResultTO()) {
							for (LabResultTO result : rpt.getResults().getLabResultTO()) {
								VistaLabReport lr = new VistaLabReport(result);
								lr.setCollectionDate(DC.convertVistaDate(rpt.getTimestamp()));
								lr.setFacility(new VistaFacility(rpt.getFacility()));
								labReports.add(lr);
							}
						}
					}
				}
			}
		}

	}

	public VistaLabReportList(TaggedCytologyRptArrays cha) {
		if (cha.getCount() >0) {
			for (TaggedCytologyRptArray ra : cha.getArrays().getTaggedCytologyRptArray()) {
				if (ra.getCount() > 0) {
					for (CytologyRpt rpt : ra.getRpts().getCytologyRpt()) {
						labReports.add(new VistaLabReport(rpt));
					}
				}
			}
		}
	}

	public VistaLabReportList(TaggedTextArray tta) {
		if (tta.getCount() > 0) {
			for (TaggedText tt : tta.getResults().getTaggedText()) {
				if (null != tt.getTaggedResults() && null != tt.getTaggedResults().getTaggedText()) {
					for (TaggedText t : tt.getTaggedResults().getTaggedText()) {
						if (t.getText().contains(PARSE_ELECTRON_MICROSCOPY))
							labReports.add(VistaLabReport.parseElectronMicroscopy(t.getText()));
						else if (t.getText().contains(PARSE_CYTOPATHOLOGY))
							labReports.add(VistaLabReport.parseCytoPathology(t.getText()));
					}
				}
				else {
					if (tt.getText().contains(PARSE_ELECTRON_MICROSCOPY))
						labReports.add(VistaLabReport.parseElectronMicroscopy(tt.getText()));
					else if (tt.getText().contains(PARSE_CYTOPATHOLOGY))
						labReports.add(VistaLabReport.parseCytoPathology(tt.getText()));
				}
			}
		}
	}

	public VistaLabReportList(TaggedMicrobiologyRptArrays cha) {
		if (cha.getCount() >0) {
			for (TaggedMicrobiologyRptArray ra : cha.getArrays().getTaggedMicrobiologyRptArray()) {
				if (ra.getCount() > 0) {
					for (MicrobiologyRpt rpt : ra.getRpts().getMicrobiologyRpt()) {
						labReports.add(new VistaLabReport(rpt));
					}
				}
			}
		}
	}

	public VistaLabReportList(TaggedSurgicalPathologyRptArrays cha) {
		if (cha.getCount() >0) {
			for (TaggedSurgicalPathologyRptArray ra : cha.getArrays().getTaggedSurgicalPathologyRptArray()) {
				if (ra.getCount() > 0) {
					for (SurgicalPathologyRpt rpt : ra.getRpts().getSurgicalPathologyRpt()) {
						labReports.add(new VistaLabReport(rpt));
					}
				}
			}
		}
	}

	@Override
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return labReports.size();
	}

	public List<VistaLabReport> getLabReports() {
		return labReports;
	}

}
