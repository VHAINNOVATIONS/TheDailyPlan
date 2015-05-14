package gov.med.va.innovations.ui.action;

import gov.med.va.innovations.domain.Definition;
import gov.med.va.innovations.service.DefinitionManager;
import gov.med.va.innovations.service.PagingLookupManager;
import gov.med.va.innovations.ui.util.PaginateListFactory;

import org.apache.struts2.ServletActionContext;
import org.springframework.mock.web.MockHttpServletRequest;

import com.opensymphony.xwork2.ActionSupport;

public class DefinitionActionTest extends BaseActionTestCase {
    private DefinitionAction action;

    @Override
    protected void onSetUpBeforeTransaction() throws Exception {
        super.onSetUpBeforeTransaction();
        action = new DefinitionAction();
        DefinitionManager definitionManager = (DefinitionManager) applicationContext.getBean("definitionManager");
        PagingLookupManager pagingManager = (PagingLookupManager) applicationContext.getBean("pagingLookupManager");
        PaginateListFactory paginatedListFactory = (PaginateListFactory) applicationContext.getBean("paginatedListFactory");
        action.setDefinitionManager(definitionManager);
        action.setPaginatedListFactory(paginatedListFactory);
        action.setPagingLookupManager(pagingManager);

        // add a test definition to the database
        Definition def = definitionManager.getDefinition("AC");
        if (null == def)
        	def = new Definition();
        def.setAbbreviation("AC");
        def.setDefinition("All Clear");
        definitionManager.save(def);
    }

    public void testLookup() throws Exception {
        assertEquals(action.lookup(), ActionSupport.SUCCESS);
        assertTrue(action.getDefinitions().getList().size() >= 1);
    }
    
    public void testEdit() throws Exception {
        log.debug("testing edit...");
        action.setId(-1L);
        assertNull(action.getDefinition());
        assertEquals("success", action.edit());
        assertNotNull(action.getDefinition());
        assertFalse(action.hasActionErrors());
    }

    public void testSave() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        ServletActionContext.setRequest(request);
        action.setId(-1L);
        assertEquals("success", action.edit());
        assertNotNull(action.getDefinition());
        
        // update last name and save
        action.getDefinition().setDefinition("Updated Definition");
        assertEquals("input", action.save());
        assertEquals("Updated Definition", action.getDefinition().getDefinition());
        assertFalse(action.hasActionErrors());
        assertFalse(action.hasFieldErrors());
        assertNotNull(request.getSession().getAttribute("messages"));
    }

    public void testRemove() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        ServletActionContext.setRequest(request);
        action.setDelete("");
        Definition def = new Definition();
        def.setId(-2L);
        action.setDefinition(def);
        assertEquals("success", action.delete());
        assertNotNull(request.getSession().getAttribute("messages"));
    }

}
