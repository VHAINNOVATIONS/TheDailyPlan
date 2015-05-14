package gov.med.va.innovations.dao;

import gov.med.va.innovations.domain.DocumentEvent;
import gov.med.va.innovations.domain.EventType;

import java.util.List;

/**
 * This class tests the current DocmentDao implementation class
 * @author mark
 */
public class DocumentEventDaoTest extends BaseDaoTestCase {
    private DocumentEventDao dao;
    
    public void setDocumentEventDao(DocumentEventDao dao) {
        this.dao = dao;
    }

    public void testGetEvents() {
        List<DocumentEvent> events = dao.getAll();
        log.debug(events);
        assertTrue(events.size() > 0);
    }
    
    public void testGetEventTypes() {
    	List<EventType> types = dao.getEventTypes();
        assertTrue(types.size() > 0);
        
        EventType type = dao.getEventType("RPT");
        assertNotNull(type);
    }
    
    public void testGetEventsByPatient() {
        
    	List<DocumentEvent> events = dao.findByPatient("237");
        assertTrue(events.size() > 0);
        
        events = dao.findByPatient("1");
        assertTrue(events.size() == 0);       
        
        events = dao.findByPatient("RPT", "237");
        assertTrue(events.size() > 0);       
        
        events = dao.findByPatient("MED", "237");
        assertTrue(events.size() == 2);       
        
        events = dao.findRecentByPatient("MED", "237");
        assertTrue(events.size() == 1);       
    }
    
    public void testGenerateReportId() {
    	String id = dao.generateReportId();
    	assertNotNull(id);
    	
    	int newId = Integer.valueOf(dao.generateReportId());
    	
    	assertTrue(newId == Integer.valueOf(id)+1);
    }
}
