package gov.va.medora.mdws.emrsvc;


import gov.med.va.innovations.dao.BaseDaoTestCase;
import gov.med.va.innovations.util.MdwsClientFactory;
import gov.med.va.innovations.util.SessionSecurityContextHolder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.After;
import org.junit.Test;

public class MdwsTestCase extends BaseDaoTestCase {
	private static final Log LOG = LogFactory.getLog(MdwsTestCase.class);
	private MdwsClientFactory clientFactory;
    
	public void setMdwsClientFactory(MdwsClientFactory clientFactory) {
        this.clientFactory = clientFactory;
    }
	private List<String> nonEmptyTeams = new ArrayList<String>();
	private Map<String,Map<String,Object>> goodPatients = new HashMap<String,Map<String,Object>>();
	
	@After
	public void release() throws Exception {
		clientFactory.destroy();
		
	}
	
	@Test
	public void testGatherTestData() throws Exception {
		SessionSecurityContextHolder.setSessionID("0");
		EmrSvcSoap binding = clientFactory.getMdwsForClient("vhaino321","verify123.");
		List<TaggedText> teams = null;
		teams = binding.getTeams().getTaggedResults().getTaggedText();
		assertTrue(teams.size() > 0);
		
//		for(TaggedText team : teams) {
//			TaggedPatientArray patients = binding.getPatientsByTeam(team.getTag());
//				if (patients.getCount() > 0) 
//					nonEmptyTeams.add(team.getTag());
//		}
//		
//		assertTrue(nonEmptyTeams.size() > 0);
		
		List<HospitalLocationTO> wards = binding.getWards().getLocations().getHospitalLocationTO();
		assertTrue(wards.size() > 0);
		
		for (HospitalLocationTO location : wards) {
			TaggedPatientArray patients = binding.getPatientsByWard(location.getId());
			if (patients.getCount() > 0) 
				nonEmptyTeams.add(location.getId());
		}
		

		for (String teamId : nonEmptyTeams) {
			//for (PatientTO patient : binding.getPatientsByTeam(teamId).getPatients().getPatientTO()) {
			for (PatientTO patient : binding.getPatientsByWard(teamId).getPatients().getPatientTO()) {
				String key = patient.getLocalPid();
				patient = binding.select(key);
				assertNotNull(patient);
				assertNotNull(patient.getSsn());
				patient = binding.getDemographics();
				if (patient.isInpatient() && null == goodPatients.get(key)) {
					Map<String,Object> patientData = new HashMap<String,Object>();
					patientData.put("patient", patient);
					TaggedMedicationArrays meds = binding.getAllMeds();
					if (meds.getCount() > 1) {
						LOG.debug("Found meds for "+key);
						patientData.put("meds",meds.getArrays());
					}
					meds = binding.getIvMeds();
					if (meds.getCount() > 1) {
						LOG.debug("Found IV meds for "+key);
						patientData.put("ivMeds",meds.getArrays());
					}
					TaggedAllergyArrays allergies = binding.getAllergies();
					if (allergies.getCount() > 0 && 
							!(allergies.getArrays().getTaggedAllergyArray().get(0).equals("NO KNOWN ALLERGIES") || allergies.getArrays().getTaggedAllergyArray().get(0).equals("Not Assessed"))) {
						LOG.debug("Found Allergies for "+key);
						patientData.put("allergies",allergies.getArrays());
					}
					TaggedInpatientStayArray admissions = binding.getAdmissions();
					if (admissions.getCount() > 0 && admissions.getStays().getInpatientStayTO().get(0) instanceof InpatientStayTO) {
						LOG.debug("Found stay for "+key);
						patientData.put("admissions",admissions.getStays().getInpatientStayTO());
					}
					TaggedConsultArrays consults = binding.getConsultsForPatient();
					if (consults.getCount() > 0 && consults.getArrays().getTaggedConsultArray().get(0).getConsults() instanceof ArrayOfConsultTO) {
						LOG.debug("Found consults for "+key);
						patientData.put("consults",consults.getArrays().getTaggedConsultArray().get(0).getConsults());
					}
					TaggedProblemArrays problems = binding.getProblemList("help");
					if (problems.getCount() > 0 && problems.getArrays().getTaggedProblemArray().get(0).getProblems() instanceof ArrayOfProblemTO) {
						LOG.debug("Found problems for "+key);
						patientData.put("problems",problems.getArrays().getTaggedProblemArray().get(0).getProblems());
					}
					TaggedChemHemRptArrays chemHemRpts = binding.getChemHemReports("1990-01-01", "2010-06-30", 20);
					if (chemHemRpts.getCount() > 0) {
						LOG.debug("Found chemHemRpts for "+key);
						patientData.put("chemHemRpts", chemHemRpts.getArrays());
					}
					if (patientData.size() > 1)
						goodPatients.put(key, patientData);
				}
			}
		}
		
		String[] pids = goodPatients.keySet().toArray(new String[0]);
		Arrays.sort(pids);
		Set<String> rank = new TreeSet<String>();
		for(String pid:pids) {
			rank.add(goodPatients.get(pid).size()-1+":"+pid);
		}
		
		for (String sorted: rank) {
			String[] val = sorted.split(":");
			LOG.info("Patient " + val[1] + " has " + val[0] + " items");
		}
	}
}
