package gov.med.va.innovations.dao.mdws;

import gov.med.va.innovations.dao.BaseDaoTestCase;
import gov.med.va.innovations.domain.VistaAllergyList;
import gov.med.va.innovations.domain.VistaAppointmentList;
import gov.med.va.innovations.domain.VistaConsultList;
import gov.med.va.innovations.domain.VistaDirectiveList;
import gov.med.va.innovations.domain.VistaLocation;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.domain.VistaTeam;
import gov.med.va.innovations.util.DateUtil;
import gov.med.va.innovations.util.SessionSecurityContextHolder;

import java.util.List;

import org.junit.Test;

public class VistaMdwsDaoTest extends BaseDaoTestCase {
	private static final String SESSION_ID = "-1";
	private VistaMdwsDao dao;
    
	public void setVistaMdwsDao(VistaMdwsDao dao) {
        this.dao = dao;
    }
	
	@Override
	protected void onSetUp() {
		SessionSecurityContextHolder.setSessionID(SESSION_ID);		
	}
	
	@Override
	protected void onTearDown() {
//		dao.destroy();
	}

	@Test
	public void testVistaSignon() throws Exception {
		String accessCode = "vhaino321";
		String verifyCode = "verify123.";
		VistaSignon result = dao.doVistaSignon(accessCode, verifyCode);
		assertNotNull(result.getDuz());
	}
	
	@Test
	public void testGetTeams() throws Exception {
		List<VistaTeam> teams = dao.getTeams();
		assertTrue(teams.size() > 0);
		assertNotNull(teams.get(0).getId());
		assertNotNull(teams.get(0).getName());
	}

	@Test
	public void testGetLocations() throws Exception {
		List<VistaLocation> locs = dao.getLocations();
		assertTrue(locs.size() > 0);
		assertNotNull(locs.get(0).getId());
		assertNotNull(locs.get(0).getName());
	}
	
	public void testMatchPatients() throws Exception {
		List<VistaPatient> patients = dao.matchPatients("ONE,PATIENT");
		assertTrue(patients.size() > 0);
		patients = dao.detailPatients(patients.subList(0, 8));
		assertTrue(patients.size() == 8);
		assertTrue(patients.get(0).getSsn().length() > 0);
	}
	
	public void testGetAllergies() throws Exception {
		VistaAllergyList list = dao.getAllergies("237");
		if (null == list) {
			List<VistaPatient> patients = dao.matchPatients("ONE,PATIENT");
			list = dao.getAllergies(patients.get(0).getLocalPid());
		}
		assertNotNull(list);
		assertTrue(list.getAllergies().size() > 0);
	}
	
	public void testGetAppointments() throws Exception {
		VistaAppointmentList list = dao.getAppointments("237");
		if (null == list) {
			List<VistaPatient> patients = dao.matchPatients("ONE,PATIENT");
			list = dao.getAppointments(patients.get(0).getLocalPid());
		}
		assertNotNull(list);
		assertTrue(list.getAppointments().size() > 0);
	}
	
	public void testGetConsults() throws Exception {
		VistaConsultList list = dao.getConsults("237");
		if (null == list) {
			List<VistaPatient> patients = dao.matchPatients("ONE,PATIENT");
			list = dao.getConsults(patients.get(0).getLocalPid());
		}
		assertNotNull(list);
		assertTrue(list.getConsults().size() > 0);
	}
	
	public void testAdvancedDirectives() throws Exception {
		VistaDirectiveList list = dao.getAdvancedDirectives("237", DateUtil.convertStringToDate("01/01/2000"), DateUtil.convertStringToDate("12/15/2010"));
		assertNotNull(list);
		assertTrue(list.getListLength() == 3);
		
		list = dao.getAdvancedDirectives("237", DateUtil.convertStringToDate("01/01/2010"), DateUtil.convertStringToDate("12/15/2010"));
		assertTrue(list.getListLength() == 0);
	}
}
