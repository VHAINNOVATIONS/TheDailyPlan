package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.Template;
import gov.med.va.innovations.domain.VistaMedicationList;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.util.DateUtil;
import gov.med.va.innovations.util.SessionSecurityContextHolder;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;

public class TemplateManagerTest extends BaseManagerTestCase {
    //~ Instance fields ========================================================
    private TemplateManager templateManager;
    private VistaManager vistaManager;
    private Log LOG = LogFactory.getLog(TemplateManagerTest.class);
    private Template template;
    
	public void setTemplateManager(TemplateManager templateManager) {
		this.templateManager = templateManager;
	}
	
	public void setVistaManager(VistaManager vistaManager) {
		this.vistaManager = vistaManager;
	}
	
	protected void onSetUp() throws Exception {
		SessionSecurityContextHolder.setSessionID("TemplateManagerTest");
		super.onSetUp();
	}

	@Test
    public void testGetTemplate() throws Exception {
 		template = templateManager.get(1L);
        assertNotNull(template);
        
        log.debug(template);
    }

	@Test
    public void testSaveTemplate() throws Exception {
		template = templateManager.get(1L);
		template.setDescription("New Name");

		template = templateManager.saveTemplate(template);
        assertEquals("New Name", template.getDescription());
    }

	@Test
    public void testAddAndRemoveTemplate() throws Exception {
		template = new Template();
		List<Component> components = templateManager.getComponentsByType(true);
		assertTrue(components.size() >= 9);

        // call populate method in super class to populate test data
        // from a properties file matching this class name
    	template = (Template) populate(template);
    	if (null == template.getName()) {
    		template.setName("Test Template");
    		template.setDescription("Template for Testing");
     	}

    	template = (Template) templateManager.saveTemplate(template);
        assertEquals("Test Template", template.getName());
        
        // Add a new component
        Component comp = components.get(0);
        comp.setId(null);
        comp.setMandatory(false);
        comp.setName("Test Comp");
        comp = templateManager.saveComponent(comp);
        assertFalse(templateManager.isComponentOwned(comp.getId()));
        template.getComponents().add(comp);
        template = templateManager.saveTemplate(template);
        assertTrue(templateManager.isComponentOwned(comp.getId()));

        LOG.debug("removing template...");

        templateManager.remove(template.getId());

        try {
        	template = (Template) templateManager.get(template.getId());
            fail("Expected 'Exception' not thrown");
        } catch (Exception e) {
            LOG.debug(e);
            assertNotNull(e);
        }
        
        // Add it back
        LOG.debug("Adding the template back");
        template.setId(null);
       	templateManager.saveTemplate(template);
        try {
        	template = (Template) templateManager.get(template.getId());
        	assertNotNull(template);
        } catch (Exception e) {
            fail("Template should've been added back!");
        }
    }
	
	@Test
	public void testProcessComponent() throws Exception {
		VistaSignon signon = vistaManager.doVistaSignon("vhaino321", "verify123.");
		assertTrue(null != signon.getDuz());
		DateUtil.setBypassTodayCheck(true);
		VistaMedicationList meds = vistaManager.getIvMeds("237");
		assertTrue(meds.getMeds().size() > 0);
		String compValue = templateManager.getComponent("Active Medications", meds);
		assertTrue(compValue.indexOf('#') == -1);
	}
}
