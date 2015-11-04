package gov.med.va.innovations.dao.mdws;

import gov.med.va.innovations.dao.BaseDaoTestCase;
import gov.med.va.innovations.util.MdwsClientFactory;
import gov.med.va.innovations.util.SessionSecurityContextHolder;
import gov.va.medora.mdws.emrsvc.EmrSvcSoap;
import gov.va.medora.mdws.emrsvc.TaggedHospitalLocationArray;
import gov.va.medora.mdws.emrsvc.TaggedText;
import gov.va.medora.mdws.emrsvc.UserTO;

public class VistaMdwsClientFactoryTest extends BaseDaoTestCase {
	private MdwsClientFactory clientFactory;
    
	public void setMdwsClientFactory(MdwsClientFactory clientFactory) {
        this.clientFactory = clientFactory;
    }
	
	@Override
	protected void onTearDown() {
		clientFactory.destroy();
	}
	
	public void testVistaLogin() {
		SessionSecurityContextHolder.setSessionID("-1");
		String access = "vhaino321";
		String verify = "verify123.";
		EmrSvcSoap binding = clientFactory.getMdwsForClient();
		UserTO user = binding.login(access, verify, "");
		assertTrue(null != user.getDUZ());
		clientFactory.cacheCredentials(access, verify);
		binding.disconnect();
		// After disconnect, factory should serve up a connected binding as long as credentials have been cached
		binding = clientFactory.getMdwsForClient();
		TaggedHospitalLocationArray locations = binding.getWards();
		assertTrue(locations.getCount() > 0);
		
		// Test for separation of clients
		SessionSecurityContextHolder.clearSessionID();
		SessionSecurityContextHolder.setSessionID("-2");
		binding = clientFactory.getMdwsForClient();
		try {
			binding.getTeams();
			fail("getTeams didn't throw SoapFaultException");
		}	
		catch(Throwable sfe) {
			assertNotNull(sfe);
		}
		
		// Test convenience harness
		binding = clientFactory.getMdwsForClient(access, verify);
		TaggedText teams = binding.getTeams();
		assertNull(teams.getFault());
		binding.disconnect();
		binding = clientFactory.getMdwsForClient();
		teams = binding.getTeams();
		assertNull(teams.getFault());
	}

}
