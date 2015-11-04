package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.DocumentEvent;
import gov.med.va.innovations.domain.EventType;
import gov.med.va.innovations.domain.VistaMedicationList;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.service.EventManager.EventCode;
import gov.med.va.innovations.util.DateUtil;
import gov.med.va.innovations.util.SessionSecurityContextHolder;

import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class EventManagerTest extends BaseManagerTestCase {
    //~ Instance fields ========================================================
	final String PID = "237";

    private EventManager mgr = null;
    private Log log = LogFactory.getLog(EventManagerTest.class);
    private DocumentEvent event;
	private VistaManager vista;
	private ReportManager report;
	
	public void setVistaManager(VistaManager manager) {
		this.vista = manager;
	}
    
    public void setEventManager(EventManager eventManager) {
        this.mgr = eventManager;
    }
    
    public void setReportManager(ReportManager reportManager) {
        this.report = reportManager;
    }

	protected void onSetUp() {
		SessionSecurityContextHolder.setSessionID("EventManagerTest");
		DateUtil.setBypassTodayCheck(true);
	}

    public void testGetEvent() throws Exception {
    	event = mgr.get(1L);
        assertNotNull(event);
        
        log.debug(event);
        
        List<DocumentEvent> events = mgr.getRecentEvents(EventCode.MED, "237");
        assertTrue(events.size() > 0);
    }

    public void testSaveEvent() throws Exception {
    	event = mgr.get(1L);
    	Date eventDate = new Date();
    	event.setEventDate(eventDate);

        log.debug("saving event with updated Date: " + event);

        event = mgr.save(event);
        assertEquals(eventDate, event.getEventDate());
    }

    public void testAddAndRemoveDocumentEvent() throws Exception {
    	event = new DocumentEvent();

        // call populate method in super class to populate test data
        // from a properties file matching this class name
    	event = (DocumentEvent) populate(event);
    	event.setEventType(mgr.getType("MED"));
    	event.setEventDate(new Date());
    	
    	event = mgr.save(event);
        assertEquals("1935-10-25", event.getDob());
        
        event.setUpdatedBy("tester");
        mgr.save(event);
        event = mgr.get(Long.valueOf(event.getDocumentEventId()));
        assertNotNull(event.getUpdateTime());

        log.debug("removing event...");

        mgr.remove(Long.valueOf(event.getDocumentEventId()));

        try {
        	event = mgr.get(Long.valueOf(event.getDocumentEventId()));
            fail("Expected 'Exception' not thrown");
        } catch (Exception e) {
            log.debug(e);
            assertNotNull(e);
        }
    }
    
	public void testGenerateEvent() {
		VistaSignon user = vista.doVistaSignon("vhaino321", "verify123.");
		assertNotNull(user);
		VistaPatient patient = vista.getPatientForId(PID);
		VistaMedicationList meds = vista.getActiveMeds(PID);
		
		mgr.generateEvent(patient, meds, report.generateReportId());
		List<DocumentEvent> events = mgr.getEvents(EventCode.MED, PID);
		assertTrue(events.size() > 0);
	}
    
    public void testGetTypes() {
    	List<EventType> types = mgr.getTypes();
    	assertTrue(types.size() > 0);
    	
    	EventType type = mgr.getType(EventCode.RPT.name());
    	assertNotNull(type);
    	type = mgr.getType("TEST");
    	assertNull(type);

    }
    
    public void testGetEvents() {
    	List<DocumentEvent> events = mgr.getEvents(PID);
    	assertTrue(events.size() > 0);
    	
    	events = mgr.getEvents(EventCode.RPT, PID);
    	assertTrue(events.size() > 0);
     }
 }
