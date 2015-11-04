package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.Testimonial;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class TestimonialManagerTest extends BaseManagerTestCase {
    //~ Instance fields ========================================================

    private TestimonialManager mgr = null;
    private Log log = LogFactory.getLog(TestimonialManagerTest.class);
    private Testimonial testimonial;
    
    public void setTestimonialManager(TestimonialManager testimonialManager) {
        this.mgr = testimonialManager;
    }

    public void testGetTestimonial() throws Exception {
    	testimonial = mgr.get(-1L);
        assertNotNull(testimonial);
        
        log.debug(testimonial);
    }

    public void testSaveTestimonial() throws Exception {
    	testimonial = mgr.getTestimonialByTitle("Patient Evaluations");
    	testimonial.setImageLink("/new/link");

        log.debug("saving testimonial with updated Link: " + testimonial);

        testimonial = mgr.save(testimonial);
        assertEquals("/new/link", testimonial.getImageLink());
    }

    public void testAddAndRemoveTestimonial() throws Exception {
    	testimonial = new Testimonial();

        // call populate method in super class to populate test data
        // from a properties file matching this class name
    	testimonial = (Testimonial) populate(testimonial);

    	testimonial = mgr.save(testimonial);
        assertEquals("Patient Review", testimonial.getTitle());
        
        testimonial.setUpdatedBy("tester");
        mgr.save(testimonial);
        testimonial = mgr.get(testimonial.getId());
        assertNotNull(testimonial.getUpdateDate());

        log.debug("removing testimonial...");

        mgr.remove(testimonial.getId());

        try {
        	testimonial = mgr.getTestimonialByTitle("Patient Review");
            fail("Expected 'Exception' not thrown");
        } catch (Exception e) {
            log.debug(e);
            assertNotNull(e);
        }
    }
}
