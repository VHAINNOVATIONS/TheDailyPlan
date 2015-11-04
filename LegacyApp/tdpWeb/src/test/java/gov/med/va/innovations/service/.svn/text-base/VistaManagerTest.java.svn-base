package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.VistaAllergyList;
import gov.med.va.innovations.domain.VistaFault;
import gov.med.va.innovations.domain.VistaGenericList;
import gov.med.va.innovations.domain.VistaLocation;
import gov.med.va.innovations.domain.VistaMedicationList;
import gov.med.va.innovations.domain.VistaOrderList;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaPatientList;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.domain.VistaTeam;
import gov.med.va.innovations.util.DateUtil;
import gov.med.va.innovations.util.SessionSecurityContextHolder;

import java.util.List;

public class VistaManagerTest extends BaseManagerTestCase {
	private static final String ACCESS_CODE = "vhaino321";
	private static final String VERIFY_CODE = "verify123.";
	private VistaManager manager;
	
	public void setVistaManager(VistaManager manager) {
		this.manager = manager;
	}

	protected void onSetUp() {
		SessionSecurityContextHolder.setSessionID("VistaManagerTest");
		DateUtil.setBypassTodayCheck(true);
	}
	
	public void testSignOn() throws Exception {
		VistaSignon user = manager.doVistaSignon(ACCESS_CODE, VERIFY_CODE);
		assertNotNull(user);
		assertNotNull(user.getDuz());
		assertTrue(user.isSignonSucceeded());
	}
	
	public void testGetTeams() throws Exception {
		List<VistaTeam> teams = manager.getTeams();
		assertTrue(teams.size() > 0);
	}
	
	public void testGetUnits() throws Exception {
		List<VistaLocation> locs = manager.getLocations();
		assertTrue(locs.size() > 0);
	}
	
	public void testGetPatients() throws Exception {
		VistaPatientList patients = manager.getPatientsMatching("ONE,PATIENT", 0, 8);
		assertTrue(patients.getPatients().size() > 0);
		assertTrue(patients.getFirst() == 0);
		assertTrue(patients.getLast() == 7);
		assertTrue(patients.getTotal() == 44);
		patients = manager.getPatientsMatching("ONE,PATIENT", 42, 8);
		assertTrue(patients.getPatients().size() > 0);
		assertTrue(patients.getFirst() == 42);
		assertTrue(patients.getLast() == 43);
	}
	
	public void testGetWardPatients() throws Exception {
		List<VistaLocation> wards = manager.getWards();
		for (VistaLocation ward : wards) {
			if (ward.getName().startsWith("ICU")) {
				VistaPatientList patients = manager.getWardPatients(ward.getId());
				assertTrue(patients.getLast() > 0);
				assertTrue(patients.getTotal() > 0);
				assertTrue(patients.getPatients().size() > 0);
				
				break;
			}
		}
	}
	
	public void testGetUnitPatients() throws Exception {
		List<VistaLocation> locs = manager.getLocations();
		for (VistaLocation loc : locs) {
			VistaPatientList patients = manager.getUnitPatients(loc.getId());
			if (patients.getTotal() > 0) {
				System.out.println("WooHoo!!!");
			}
		}
	}

	
	public void testGetTeamPatients() throws Exception {
		List<VistaTeam> teams = manager.getTeams();
		for (VistaTeam team : teams) {
			VistaPatientList patients = manager.getTeamPatients(team.getId());
			if (patients.getPatients().size() > 0) {
				assertTrue(patients.getLast() > 0);
				assertTrue(patients.getTotal() > 0);
				assertTrue(patients.getPatients().size() > 0);
				break;
			}
		}
	}
	
	public void testGetOrders() throws Exception {
		String dfn = getPatientId();
		
		assertTrue(!dfn.equals(""));
		VistaOrderList orders = manager.getAllOrders(dfn);
		assertTrue(orders.getOrders().size() > 0);
	}
	
	public void testGetMedications() throws Exception {
		String dfn = getPatientId();
		
		assertTrue(!dfn.equals(""));
		VistaMedicationList meds = manager.getInpatientMeds(dfn);
//		assertTrue(meds.size() > 0);
		meds = manager.getIvMeds(dfn);
		assertTrue(meds.getMeds().size() > 0);
		meds = manager.getActiveMeds(dfn);
		assertTrue(meds.getMeds().size() > 0);
	}
	
	public void testGetAllergies() throws Exception {
		String dfn = getPatientId();
		
		assertTrue(!dfn.equals(""));
		VistaAllergyList allergies = manager.getAllergies(dfn);
		assertTrue(allergies.getAllergies().size() > 0);
		
	}
	
	public void testGetLabOrders() throws Exception {
		String dfn = getPatientId();
		
		assertTrue(!dfn.equals(""));
		VistaOrderList orders = manager.getLabOrders(dfn);
		assertTrue(orders.getOrders().size() > 0);

		// Test HTML encoding
		orders = manager.getLabOrders("100711");
		assertTrue(orders.getOrders().get(4).getText().indexOf("&amp;") > -1);
	}
	
	public void testGetRadiologyOrders() throws Exception {
		String dfn = getPatientId();
		
		assertTrue(!dfn.equals(""));
		VistaOrderList orders = manager.getRadiologyOrders(dfn);
		assertTrue(orders.getOrders().size() > 0);

	}
	
	
	public void testGetAppointments() throws Exception {
		String dfn = getPatientId();
		
		assertTrue(!dfn.equals(""));
		VistaGenericList appts = manager.getAppointments(dfn);
		assertTrue(appts.getMapList().size() > 0);

	}
	private String getPatientId() {
		VistaPatientList patients = null;
		try {
			patients = manager.getPatientsMatching("ONE,PATIENT", 0, 8);
		} catch (VistaFault e) {
			e.printStackTrace();
		}
		String dfn = "";
		for(VistaPatient patient : patients.getPatients()) {
			if (patient.getName().equals("ONE,PATIENT")) {
				dfn = patient.getLocalPid();
				break;
			}
		}
		return dfn;
	}
}
