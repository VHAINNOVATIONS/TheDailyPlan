package gov.med.va.innovations.ui.action;

import gov.med.va.innovations.domain.Testimonial;
import gov.med.va.innovations.service.PagingLookupManager;
import gov.med.va.innovations.service.TestimonialManager;
import gov.med.va.innovations.ui.util.PaginateListFactory;

import org.apache.struts2.ServletActionContext;
import org.springframework.mock.web.MockHttpServletRequest;

import com.opensymphony.xwork2.ActionSupport;

public class TestimonialActionTest extends BaseActionTestCase {
    private TestimonialAction action;

    @Override
    protected void onSetUpBeforeTransaction() throws Exception {
        super.onSetUpBeforeTransaction();
        action = new TestimonialAction();
        TestimonialManager testimonialManager = (TestimonialManager) applicationContext.getBean("testimonialManager");
        PagingLookupManager pagingManager = (PagingLookupManager) applicationContext.getBean("pagingLookupManager");
        PaginateListFactory paginatedListFactory = (PaginateListFactory) applicationContext.getBean("paginatedListFactory");
        action.setTestimonialManager(testimonialManager);
        action.setPaginatedListFactory(paginatedListFactory);
        action.setPagingLookupManager(pagingManager);

        // add a test definition to the database
        Testimonial testimonial = testimonialManager.get(-1L);
        if (null == testimonial)
        	testimonial = new Testimonial();
        testimonial.setTitle("Just in...");
        testimonial.setQuote("A great idea!");
        testimonial.setTestimonial("Mandatory Data");
        testimonial.setCreatedBy("tester");
        testimonialManager.save(testimonial);
    }

    public void testLookup() throws Exception {
        assertEquals(action.lookup(), ActionSupport.SUCCESS);
        assertTrue(action.getTestimonials().getList().size() >= 1);
    }
    
    public void testEdit() throws Exception {
        log.debug("testing edit...");
        action.setId(-1L);
        assertNull(action.getTestimonial());
        assertEquals("success", action.edit());
        assertNotNull(action.getTestimonial());
        assertFalse(action.hasActionErrors());
    }

    public void testSave() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        ServletActionContext.setRequest(request);
        action.setId(-1L);
        assertEquals("success", action.edit());
        assertNotNull(action.getTestimonial());
        
        // update last name and save
        action.getTestimonial().setTestimonial("Updated Definition");
        assertEquals("input", action.save());
        assertEquals("Updated Definition", action.getTestimonial().getTestimonial());
        assertFalse(action.hasActionErrors());
        assertFalse(action.hasFieldErrors());
        assertNotNull(request.getSession().getAttribute("messages"));
    }

    public void testRemove() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        ServletActionContext.setRequest(request);
        action.setDelete("");
        Testimonial tm = new Testimonial();
        tm.setId(-2L);
        action.setTestimonial(tm);
        assertEquals("success", action.delete());
        assertNotNull(request.getSession().getAttribute("messages"));
    }

}
