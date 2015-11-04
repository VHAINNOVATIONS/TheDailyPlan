package gov.med.va.innovations.service;

import gov.med.va.innovations.dao.rpc.VistaRpcDao;
import gov.med.va.innovations.domain.VistaSignon;
import gov.va.med.lom.javaBroker.rpc.RpcBroker;
import gov.va.med.lom.javaBroker.rpc.patient.models.PatientListItem;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;

public class VistaRpcManagerTest extends BaseManagerTestCase {
	private VistaRpcDao dao;
	private RpcBroker broker;
    private Log LOG = LogFactory.getLog(VistaRpcManagerTest.class);

	public void setVistaRpcDao(VistaRpcDao dao) {
		this.dao = dao;
	}
	
	@Test
    public void testVistaSignon() throws Exception {
		LOG.debug("Test VistA Sign-on");
		
		broker = dao.getBroker();
		VistaSignon signon = dao.doVistaSignon(broker, "vhaino321", "verify123.");
		assertTrue(signon.isSignonSucceeded());
		assertTrue(null != signon.getDuz());
		assertTrue(null != signon.getGreeting());
		
		signon = dao.doVistaSignon(broker, "vhaino321", "verify123"); // No trailing '.'
		assertFalse(signon.isSignonSucceeded());
    }
	
	@Test 
	public void testGetPatientBySsn() throws Exception {
		if (null == broker) {
			testVistaSignon();
		}
		
//		PatientListItem patient = dao.getPatientBySsn(broker, "111111111");
//		assertNotNull(patient);
	}
}
