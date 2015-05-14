package gov.med.va.innovations.dao;

import gov.med.va.innovations.domain.Component;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;

/**
 * This class tests the current TemplateDao and ComponentDao implementation classes
 */
public class ComponentDaoTest extends BaseDaoTestCase {
    private ComponentDao dao;
    
    public void setComponentDao(ComponentDao componentDao) {
		this.dao = componentDao;
	}

    public void testGetInvalid() throws Exception {
        List<Component> comps = dao.getComponentsForTemplate(-5000L);
        assertTrue(comps.size() == 0);
    }

    public void testGetComponent() throws Exception {
    	List<Component> comps = dao.getComponentsForTemplate(-1L);
        assertNotNull(comps);
        
        Component comp = dao.getComponentByName("Next of Kin");
        assertNotNull(comp);
    }

    public void testUpdateComponent() throws Exception {
        Component comp = dao.get(1L);
        comp.setTemplate("test descr");
        dao.save(comp);
        flush();
        
        comp = dao.get(1L);
        assertEquals("test descr", comp.getTemplate());
    }

    public void testAddAndRemoveComponent() throws Exception {
        Component comp = new Component();
        comp.setMandatory(false);
        comp.setName("new Template");
        comp.setTitle("<h4>new Template</h4>");
        comp.setTemplate("Velocity Template");
        comp.setMethod("callMe");
        comp.setCreatedBy("tester");
        comp = dao.save(comp);
        flush();
        
        comp = dao.get(comp.getId());
        assertNotNull(comp.getName());
        assertNotNull(comp.getCreateDate());
        
        List<Component> comps = dao.getComponentsByType(false);
        assertTrue(comps.size() > 0);
        boolean found = false;
        for(Component chk : comps) {
        	if (chk.getId().equals(comp.getId())) {
        		found = true;
        		break;
        	}
        }
        assertTrue(found);
        comps = dao.getComponentsByType(true);
        assertTrue(comps.size() >= 9);
        
        // Duplicate name should fail
        comp.setId(null);
        try {
        	comp = dao.save(comp);
        	fail("Duplicate name not caught");
        }
        catch(Exception e) {
        	assertTrue(e instanceof DataIntegrityViolationException);
        	assertNull(comp.getId());
        }

        dao.removeTemplateComponents(-1L);
        flush();

        comps = dao.getComponentsForTemplate(-1L);
        assertEquals(comps.size(),0);
    }
    
    public void testCheckOwnership() throws Exception {
    	Component comp = dao.getComponentByName("Next of Kin");
    	assertNotNull(comp);
    	assertTrue(dao.isComponentAssigned(comp.getId()));
    }
}
