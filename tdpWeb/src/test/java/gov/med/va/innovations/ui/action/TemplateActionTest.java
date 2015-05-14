package gov.med.va.innovations.ui.action;

import gov.med.va.innovations.Constants;
import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.Template;
import gov.med.va.innovations.service.PagingLookupManager;
import gov.med.va.innovations.service.TemplateManager;
import gov.med.va.innovations.ui.listener.StartupListener;
import gov.med.va.innovations.ui.util.PaginateListFactory;

import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.struts2.ServletActionContext;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockServletContext;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.ContextLoaderListener;

import com.opensymphony.xwork2.ActionSupport;

public class TemplateActionTest extends BaseActionTestCase {
    private TemplateAction action;
    private MockServletContext sc = null;
    private ServletContextListener listener = null;
    private ContextLoaderListener springListener = null;

	@Override
    protected void onSetUpBeforeTransaction() throws Exception {
        super.onSetUpBeforeTransaction();
        action = new TemplateAction();
        TemplateManager templateManager = (TemplateManager) applicationContext.getBean("templateManager");
        PagingLookupManager pagingManager = (PagingLookupManager) applicationContext.getBean("pagingLookupManager");
        PaginateListFactory paginatedListFactory = (PaginateListFactory) applicationContext.getBean("paginatedListFactory");
        action.setTemplateManager(templateManager);
        action.setPaginatedListFactory(paginatedListFactory);
        action.setPagingLookupManager(pagingManager);

        // add a test definition to the database
        List<Component> allComps = templateManager.getAllComponents();
        Template tpl = templateManager.getTemplateByname("TEST");
        if (null == tpl)
        	tpl = new Template();
        tpl.setName("Test");
        tpl.setDescription("Test Template");
        tpl.setCreatedBy("test");
        tpl.setComponents(allComps.subList(0, 2));
        templateManager.saveTemplate(tpl);
        
        sc = new MockServletContext("");
        sc.addInitParameter(Constants.CSS_THEME, "simplicity");
        sc.addInitParameter(ContextLoader.CONFIG_LOCATION_PARAM,
                "classpath:/applicationContext-dao.xml, " +
                "classpath:/applicationContext-service.xml, " + 
                "classpath:/applicationContext-resources.xml, " +
                "/WEB-INF/applicationContext.xml");
        springListener = new ContextLoaderListener();
        springListener.contextInitialized(new ServletContextEvent(sc));
        listener = new StartupListener();
        action.setServletContext(sc);
    }

    public void testLookup() throws Exception {
        assertEquals(action.lookup(), ActionSupport.SUCCESS);
        assertTrue(action.getTemplates().getList().size() >= 1);
    }
    
    public void testEdit() throws Exception {
        log.debug("testing edit...");
        action.setId(1L);
        assertNull(action.getTemplate());
        assertEquals("success", action.edit());
        assertNotNull(action.getTemplate());
        assertFalse(action.hasActionErrors());
    }

    public void testSave() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setParameter("components", new String[]{"2","4","6"});
        ServletActionContext.setRequest(request);
        action.setId(1L);
        assertEquals("success", action.edit());
        assertNotNull(action.getTemplate());
        
        // update last name and save
        action.getTemplate().setDescription("Updated Description");
        assertEquals("input", action.save());
        assertEquals("Updated Description", action.getTemplate().getDescription());
        assertFalse(action.hasActionErrors());
        assertFalse(action.hasFieldErrors());
        assertNotNull(request.getSession().getAttribute("messages"));
    }

    public void testRemove() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        ServletActionContext.setRequest(request);
        action.setDelete("");
        Template tpl = new Template();
        tpl.setId(-2L);
        action.setTemplate(tpl);
        assertEquals("success", action.delete());
        assertNotNull(request.getSession().getAttribute("messages"));
    }
    
    public void testEditComponent() throws Exception {
        log.debug("testing editComponent...");
        action.setId(1L);
        assertNull(action.getComponent());
        assertEquals("success", action.editComponent());
        assertNotNull(action.getComponent());
        assertFalse(action.hasActionErrors());
    }

    public void testSaveComponent() throws Exception {
        listener.contextInitialized(new ServletContextEvent(sc));
        MockHttpServletRequest request = new MockHttpServletRequest();
        ServletActionContext.setRequest(request);
        action.setId(1L);
        assertEquals("success", action.editComponent());
        assertNotNull(action.getComponent());
        
        // update last name and save
        action.getComponent().setName("Updated Name");
        assertEquals("input", action.saveComponent());
        assertEquals("Updated Name", action.getComponent().getName());
        assertFalse(action.hasActionErrors());
        assertFalse(action.hasFieldErrors());
        assertNotNull(request.getSession().getAttribute("messages"));
    }

    public void testRemoveComponent() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        ServletActionContext.setRequest(request);
        action.setDelete("");
        Component comp = new Component();
        comp.setId(-2L);
        action.setComponent(comp);
        assertEquals("success", action.deleteComponent());
        assertNotNull(request.getSession().getAttribute("messages"));
    }

}
