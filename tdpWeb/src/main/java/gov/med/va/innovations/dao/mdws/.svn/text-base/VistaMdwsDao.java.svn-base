package gov.med.va.innovations.dao.mdws;

import gov.med.va.innovations.dao.VistaDao;
import gov.med.va.innovations.domain.VistaAllergyList;
import gov.med.va.innovations.domain.VistaAppointmentList;
import gov.med.va.innovations.domain.VistaClinicalWarningList;
import gov.med.va.innovations.domain.VistaConsultList;
import gov.med.va.innovations.domain.VistaDirectiveList;
import gov.med.va.innovations.domain.VistaFault;
import gov.med.va.innovations.domain.VistaImmunizationList;
import gov.med.va.innovations.domain.VistaLabReportList;
import gov.med.va.innovations.domain.VistaLocation;
import gov.med.va.innovations.domain.VistaMedication;
import gov.med.va.innovations.domain.VistaMedicationList;
import gov.med.va.innovations.domain.VistaOrder;
import gov.med.va.innovations.domain.VistaOrderList;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaProblemList;
import gov.med.va.innovations.domain.VistaRadiologyReportList;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.domain.VistaTeam;
import gov.med.va.innovations.domain.VistaVitalSignList;
import gov.med.va.innovations.util.DateUtil;
import gov.med.va.innovations.util.MdwsClientFactory;
import gov.va.medora.mdws.emrsvc.EmrSvcSoap;
import gov.va.medora.mdws.emrsvc.HospitalLocationTO;
import gov.va.medora.mdws.emrsvc.MedicationTO;
import gov.va.medora.mdws.emrsvc.OrderTO;
import gov.va.medora.mdws.emrsvc.PatientTO;
import gov.va.medora.mdws.emrsvc.TaggedAllergyArray;
import gov.va.medora.mdws.emrsvc.TaggedAllergyArrays;
import gov.va.medora.mdws.emrsvc.TaggedAppointmentArrays;
import gov.va.medora.mdws.emrsvc.TaggedChemHemRptArrays;
import gov.va.medora.mdws.emrsvc.TaggedCytologyRptArrays;
import gov.va.medora.mdws.emrsvc.TaggedMedicationArray;
import gov.va.medora.mdws.emrsvc.TaggedMedicationArrays;
import gov.va.medora.mdws.emrsvc.TaggedMicrobiologyRptArrays;
import gov.va.medora.mdws.emrsvc.TaggedOrderArray;
import gov.va.medora.mdws.emrsvc.TaggedOrderArrays;
import gov.va.medora.mdws.emrsvc.TaggedPatientArray;
import gov.va.medora.mdws.emrsvc.TaggedPatientArrays;
import gov.va.medora.mdws.emrsvc.TaggedRadiologyReportArrays;
import gov.va.medora.mdws.emrsvc.TaggedSurgicalPathologyRptArrays;
import gov.va.medora.mdws.emrsvc.TaggedText;
import gov.va.medora.mdws.emrsvc.TaggedTextArray;
import gov.va.medora.mdws.emrsvc.TaggedVitalSignSetArray;
import gov.va.medora.mdws.emrsvc.TaggedVitalSignSetArrays;
import gov.va.medora.mdws.emrsvc.UserTO;
import gov.va.medora.mdws.emrsvc.VitalSignSetTO;
import gov.va.medora.mdws.querysvc.QuerySvcSoap;
import gov.va.medora.mdws.querysvc.TextArray;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class VistaMdwsDao implements VistaDao {
	private static final Log LOG = LogFactory.getLog(VistaMdwsDao.class);
	private MdwsClientFactory clientFactory;
    
	public void setMdwsClientFactory(MdwsClientFactory clientFactory) {
        this.clientFactory = clientFactory;
    }
	
	public MdwsClientFactory getMdwsClientFactory() {
		return clientFactory;
	}

	@Override
	public VistaSignon doVistaSignon(String accessCode, String verifyCode) {
		EmrSvcSoap binding = getWsClient();
		UserTO user = binding.login(accessCode, verifyCode, "");
		
		clientFactory.cacheCredentials(accessCode, verifyCode);
		
		if (null != user.getFault() && !user.getFault().getMessage().startsWith("Not a valid")) {
			clientFactory.reconnect();
			user = binding.login(accessCode, verifyCode, "");
		}
		
		return new VistaSignon(user);
	}

	private EmrSvcSoap getWsClient() {
		EmrSvcSoap binding = clientFactory.getMdwsForClient();
		return binding;
	}

	private QuerySvcSoap getWsQueryClient() {
		QuerySvcSoap binding = clientFactory.getQueryForClient();
		return binding;
	}

	@Override
	public List<VistaTeam> getTeams() {
		EmrSvcSoap binding = getWsClient();
		TaggedText teams = binding.getTeams();
		List<VistaTeam> vistaTeams = new ArrayList<VistaTeam>(teams.getTaggedResults().getTaggedText().size());
		for (TaggedText team : teams.getTaggedResults().getTaggedText()) {
			vistaTeams.add(new VistaTeam(team));
		}
		return vistaTeams;
	}

	@Override
	public List<VistaLocation> getLocations() {
		EmrSvcSoap binding = getWsClient();
		List<HospitalLocationTO> locations = binding.getLocations(clientFactory.getInitialSite(), "").getLocations().getHospitalLocationTO();
		List<VistaLocation> vistaLocations = new ArrayList<VistaLocation>(locations.size());
		for(HospitalLocationTO loc : locations) {
			vistaLocations.add(new VistaLocation(loc));
		}
		return vistaLocations;
	}

	@Override
	public List<VistaLocation> getWards() {
		EmrSvcSoap binding = getWsClient();
		List<HospitalLocationTO> locations = binding.getWards().getLocations().getHospitalLocationTO();
		List<VistaLocation> vistaLocations = new ArrayList<VistaLocation>(locations.size());
		for(HospitalLocationTO loc : locations) {
			vistaLocations.add(new VistaLocation(loc));
		}
		return vistaLocations;
	}

	@Override
	public List<VistaPatient> matchPatients(String matchCriteria) throws VistaFault {
		EmrSvcSoap binding = getWsClient();
		TaggedPatientArrays arr =  binding.match(matchCriteria);
		
		if (null != arr.getFault()) {
			LOG.warn(arr.getFault().getMessage());
			throw new VistaFault(arr.getFault());
		}
		
		List<TaggedPatientArray> taggedPatients = arr.getArrays().getTaggedPatientArray();
		List<VistaPatient> patients = new ArrayList<VistaPatient>();
		for (TaggedPatientArray facilityPatients : taggedPatients) {
			if (facilityPatients.getTag().equals(clientFactory.getInitialSite())) {
				for(PatientTO vistaPatient : facilityPatients.getPatients().getPatientTO()) {
					patients.add(new VistaPatient(vistaPatient));
				}
			}
		}

		return patients;
	}
	
	@Override
	public List<VistaPatient> getPatientsForWard(String wardId) throws VistaFault {
		EmrSvcSoap binding = getWsClient();
		TaggedPatientArray arr =  binding.getPatientsByWard(wardId);
		
		List<VistaPatient> patients = new ArrayList<VistaPatient>();
		if (null != arr.getPatients()) {
			for(PatientTO vistaPatient : arr.getPatients().getPatientTO()) {
				patients.add(new VistaPatient(vistaPatient));
			}
		}

		return patients;
	}

	@Override
	public List<VistaPatient> getPatientsForLocation(String unitId) throws VistaFault {
		EmrSvcSoap binding = getWsClient();
		TaggedPatientArray arr =  binding.getPatientsByClinic(unitId);
		
		List<VistaPatient> patients = new ArrayList<VistaPatient>();
		if (null != arr.getPatients()) {
			for(PatientTO vistaPatient : arr.getPatients().getPatientTO()) {
				patients.add(new VistaPatient(vistaPatient));
			}
		}

		return patients;
	}

	@Override
	public List<VistaPatient> getPatientsForTeam(String teamId)
			throws VistaFault {
		EmrSvcSoap binding = getWsClient();
		TaggedPatientArray arr =  binding.getPatientsByTeam(teamId);
		
		List<VistaPatient> patients = new ArrayList<VistaPatient>();
		if (null != arr.getPatients()) {
			for(PatientTO vistaPatient : arr.getPatients().getPatientTO()) {
				patients.add(new VistaPatient(vistaPatient));
			}
		}

		return patients;
	}

	@Override
	public List<VistaPatient> detailPatients(List<VistaPatient> vistaPatients) {
		EmrSvcSoap binding = getWsClient();
		List<VistaPatient> patients = new ArrayList<VistaPatient>();
		for (VistaPatient patient : vistaPatients) {
			PatientTO vistaPatient = binding.select(patient.getLocalPid());
			patients.add(new VistaPatient(vistaPatient));
		}
		
		return patients;
	}

	@Override
	public VistaOrderList getPatientOrders(String pid) {
		List<VistaOrder> vistaOrders = new ArrayList<VistaOrder>();
		EmrSvcSoap binding = getWsClient();
		binding.select(pid);
		TaggedOrderArrays orderArray = binding.getAllOrders();
		
		if (orderArray.getCount() > 0 && null != orderArray.getArrays().getTaggedOrderArray()) {
			for(TaggedOrderArray toa : orderArray.getArrays().getTaggedOrderArray()) {
				if (toa.getCount() > 0 && null != toa.getItems().getOrderTO()) {
					for (OrderTO order:toa.getItems().getOrderTO()) {
						vistaOrders.add(new VistaOrder(order));
					}
				}
			}
		}
		
		VistaOrderList list = new VistaOrderList();
		list.setOrders(vistaOrders);
		return list;
	}

	@Override
	public VistaMedicationList getInpatientMeds(String dfn) {
		List<VistaMedication> vistaMeds = new ArrayList<VistaMedication>();
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		TaggedMedicationArrays medArray = binding.getAllMeds();
		
		if (medArray.getCount() > 0 && null != medArray.getArrays().getTaggedMedicationArray()) {
			for(TaggedMedicationArray tma : medArray.getArrays().getTaggedMedicationArray()) {
				if (tma.getCount() > 0 && null != tma.getMeds().getMedicationTO()) {
					for (MedicationTO med:tma.getMeds().getMedicationTO()) {
						if (med.isIsInpatient() && !med.isIsIV())
						 vistaMeds.add(new VistaMedication(med));
					}
				}
			}
		}
		
		return new VistaMedicationList(vistaMeds);
	}

	@Override
	public VistaMedicationList getIvMeds(String dfn) {
		List<VistaMedication> vistaMeds = new ArrayList<VistaMedication>();
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		TaggedMedicationArrays medArray = binding.getIvMeds();
		
		if (medArray.getCount() > 0 && null != medArray.getArrays().getTaggedMedicationArray()) {
			for(TaggedMedicationArray tma : medArray.getArrays().getTaggedMedicationArray()) {
				if (tma.getCount() > 0 && null != tma.getMeds().getMedicationTO()) {
					for (MedicationTO med:tma.getMeds().getMedicationTO()) {
						if (med.isIsIV())
						 vistaMeds.add(new VistaMedication(med));
					}
				}
			}
		}
		
		return new VistaMedicationList(vistaMeds);
	}

	@Override
	public VistaPatient get(String id) {
		EmrSvcSoap binding = getWsClient();
		return new VistaPatient(binding.select(id));
	}

	@Override
	public VistaAllergyList getAllergies(String dfn) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		TaggedAllergyArrays allergies = binding.getAllergies();
		VistaAllergyList list = null;
		
		if (null != allergies.getArrays() && null != allergies.getArrays().getTaggedAllergyArray()) {
			for (TaggedAllergyArray taa : allergies.getArrays().getTaggedAllergyArray()) {
				if (null == list)
					list = new VistaAllergyList(taa.getAllergies());
				else
					list.addAllergies(taa.getAllergies());
			}
		}
		
		return list;
	}

	@Override
	public VistaAppointmentList getAppointments(String dfn) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		TaggedAppointmentArrays appointments = binding.getAppointments();
		VistaAppointmentList list = null;
		
		if (null != appointments.getArrays() && null != appointments.getArrays()) {
			list = new VistaAppointmentList(appointments.getArrays());
		}
		
		return list;
	}

	@Override
	public VistaConsultList getConsults(String dfn) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		return new VistaConsultList(binding.getConsultsForPatient());
	}

	@Override
	public List<String> getVistaFile(String fileNum, String[] fields,
			String filter, Integer numRecs, Integer start, String part) {
		QuerySvcSoap binding = getWsQueryClient();
		StringBuffer fieldList = new StringBuffer();
		for (String field : fields) {
			fieldList.append(field).append(";");
		}
		fieldList.deleteCharAt(fieldList.length()-1);
		TextArray file = binding.ddrLister(fileNum, "", fieldList.toString(), "IP", null == numRecs ? "" : ""+numRecs, null == start ? "" : ""+start, null == part ? "" : part, "#", "", "");
		List<String> rawFile = new ArrayList<String>();
		
		if ( file.getCount() > 0 && null != file.getText().getString()) {
			for(String record : file.getText().getString()) {
				rawFile.add(record);
			}
		}
		
		return rawFile;
	}

	@Override
	public VistaVitalSignList getVitals(String dfn) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		TaggedVitalSignSetArrays vitals = binding.getVitalSigns();
		List<VitalSignSetTO> vitalsList = new ArrayList<VitalSignSetTO>();
		if (vitals.getCount() > 0) {
			for (TaggedVitalSignSetArray tvsa : vitals.getArrays().getTaggedVitalSignSetArray()) {
				if (tvsa.getCount() > 0)
					vitalsList.addAll(tvsa.getSets().getVitalSignSetTO());
			}
		}

		return new VistaVitalSignList(vitalsList);
	}

	@Override
	public VistaProblemList getProblems(String dfn) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		return new VistaProblemList(binding.getProblemList("ALL"));
	}

	@Override
	public VistaDirectiveList getAdvancedDirectives(String dfn, Date from, Date to) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		String toDate = DateUtil.convertDateToVistaString(to);
		String fromDate = DateUtil.convertDateToVistaString(from);
		TaggedTextArray tta = binding.getAdvanceDirectives(fromDate, toDate, 99);
		return new VistaDirectiveList(tta.getResults().getTaggedText());
	}

	@Override
	public VistaLabReportList getChemHemReports(String dfn, Date from, Date to) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		String toDate = DateUtil.convertDateToVistaString(to);
		String fromDate = DateUtil.convertDateToVistaString(from);
		TaggedChemHemRptArrays cha = binding.getChemHemReports(fromDate, toDate, 99);
		
		return new VistaLabReportList(cha);
	}

	@Override
	public VistaLabReportList getCytologyReports(String dfn, Date from, Date to) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		String toDate = DateUtil.convertDateToVistaString(to);
		String fromDate = DateUtil.convertDateToVistaString(from);
		TaggedCytologyRptArrays cha = binding.getCytologyReports(fromDate, toDate, 99);
		
		return new VistaLabReportList(cha);
	}

	@Override
	public VistaLabReportList getCytopathologyReports(String dfn, Date from,
			Date to) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		TaggedTextArray cha = binding.getCytopathologyReports();
		
		return new VistaLabReportList(cha);
	}

	@Override
	public VistaLabReportList getElectronMicroscopyReports(String dfn,
			Date from, Date to) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		String toDate = DateUtil.convertDateToVistaString(to);
		String fromDate = DateUtil.convertDateToVistaString(from);
		TaggedTextArray cha = binding.getElectronMicroscopyReports(fromDate, toDate, 99);
		
		return new VistaLabReportList(cha);
	}

	@Override
	public VistaLabReportList getMicrobiologyReports(String dfn, Date from,
			Date to) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		String toDate = DateUtil.convertDateToVistaString(to);
		String fromDate = DateUtil.convertDateToVistaString(from);
		TaggedMicrobiologyRptArrays cha = binding.getMicrobiologyReports(fromDate, toDate, 99);
		
		return new VistaLabReportList(cha);
	}

	@Override
	public VistaLabReportList getSurgicalPathologyReports(String dfn,
			Date from, Date to) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		String toDate = DateUtil.convertDateToVistaString(to);
		String fromDate = DateUtil.convertDateToVistaString(from);
		TaggedSurgicalPathologyRptArrays cha = binding.getSurgicalPathologyReports(fromDate, toDate, 99);
		
		return new VistaLabReportList(cha);
	}

	@Override
	public VistaRadiologyReportList getRadiologyReports(String dfn, Date from,
			Date to) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		String toDate = DateUtil.convertDateToVistaString(to);
		String fromDate = DateUtil.convertDateToVistaString(from);
		TaggedRadiologyReportArrays rpt = binding.getRadiologyReports(fromDate, toDate, 99);
		
		return new VistaRadiologyReportList(rpt);
	}

	@Override
	public VistaClinicalWarningList getClinicalWarnings(String dfn, Date from, Date to) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		String toDate = DateUtil.convertDateToVistaString(to);
		String fromDate = DateUtil.convertDateToVistaString(from);
		TaggedTextArray rpt = binding.getClinicalWarnings(fromDate, toDate, 99);
		
		return new VistaClinicalWarningList(rpt);
	}

	@Override
	public VistaImmunizationList getImmunizations(String dfn, Date from, Date to) {
		EmrSvcSoap binding = getWsClient();
		binding.select(dfn);
		String toDate = DateUtil.convertDateToVistaString(to);
		String fromDate = DateUtil.convertDateToVistaString(from);
		TaggedTextArray rpt = binding.getClinicalWarnings(fromDate, toDate, 99);
		
		return new VistaImmunizationList(rpt);
	}
}
