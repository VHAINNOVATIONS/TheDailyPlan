package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.Definition;
import gov.med.va.innovations.domain.DefinitionStatus;
import gov.med.va.innovations.util.MdwsClientFactory;
import gov.med.va.innovations.util.SessionSecurityContextHolder;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;

public class DefinitionManagerTest extends BaseManagerTestCase {
    //~ Instance fields ========================================================
    private Log LOG = LogFactory.getLog(DefinitionManagerTest.class);
    private Definition definition;
    private DefinitionManager definitionManager;
	private static final String ACCESS_CODE = "vhaino321";
	private static final String VERIFY_CODE = "verify123.";
	private MdwsClientFactory mdwsClientFactory;
	
	public void setMdwsClientFactory(MdwsClientFactory mdwsClientFactory) {
		this.mdwsClientFactory = mdwsClientFactory;
	}

	public void setDefinitionManager(DefinitionManager definitionManager) {
		this.definitionManager = definitionManager;
	}
	
	protected void onSetUp() throws Exception {
		SessionSecurityContextHolder.setSessionID("DefinitionManagerTest");
		super.onSetUp();
	}

	@Test
    public void testGetDefinition() throws Exception {
		definition = definitionManager.getDefinition("BB");  // Logically deleted
		assertNull(definition);
		
    	definition = definitionManager.getDefinition("AA");
        assertNotNull(definition);
        
        log.debug(definition);
    }

	@Test
    public void testSaveDefinition() throws Exception {
    	definition = definitionManager.getDefinition("AA");
    	definition.setDefinition("Auto Assoc");

        log.debug("saving definition with updated defininition: " + definition);

        definition = (Definition) definitionManager.save(definition);
        assertEquals("Auto Assoc", definition.getDefinition());
    }

	@Test
    public void testAddAndRemoveDefinition() throws Exception {
    	definition = new Definition();

        // call populate method in super class to populate test data
        // from a properties file matching this class name
    	definition = (Definition) populate(definition);
    	if (null == definition.getAbbreviation()) {
    		definition.setAbbreviation("MD");
    		definition.setDefinition("Muscular Dystrophy");
    	}
    	definition.setStatus(DefinitionStatus.MISSING);

    	definition = (Definition) definitionManager.save(definition);
        assertEquals("Muscular Dystrophy", definition.getDefinition());

        LOG.debug("removing definition...");

        definitionManager.remove(Definition.class,definition.getId());

        try {
        	definition = (Definition) definitionManager.get(Definition.class,definition.getId());
            fail("Expected 'Exception' not thrown");
        } catch (Exception e) {
            LOG.debug(e);
            assertNotNull(e);
        }
        
        // Add it back
        LOG.debug("Adding the definition back");
        definition.setId(null);
       	definitionManager.save(definition);
        try {
        	definition = (Definition) definitionManager.get(Definition.class,definition.getId());
        	assertNotNull(definition);
        } catch (Exception e) {
            fail("Definition should've been added back!");
        }
    }
	
	@Test
	public void testLookupExternal() throws Exception {
		// Set up VistA connection
		mdwsClientFactory.getQueryForClient(ACCESS_CODE, VERIFY_CODE);
		List<Definition> defs = definitionManager.getCommonMedlineDefs();
		assertTrue(defs.size() > 0);
		
		defs = definitionManager.lookupMedlineDef("TID");
		assertTrue(defs.size() == 1);
		defs = definitionManager.lookupMedlineDef("RXUD");
		assertTrue(defs.size() == 0);
		defs = definitionManager.lookupMedlineDef("MD");
		assertTrue(defs.size() > 0);
	}
	
	@Test
	public void testRetrieveWithLookup() throws Exception {
		definitionManager.reloadCommonMedlineDefs();
		
		definition = new Definition("MD", "Bogus", DefinitionStatus.MISSING);
		definition = (Definition) definitionManager.save(definition);
		assertEquals(definition.getDefinition(), "Bogus");
		definition = definitionManager.getDefinition(definition.getAbbreviation());
		assertNotSame("Three", definition.getDefinition());
		assertNotNull(definition.getNextRefresh());
	}
}
