package gov.med.va.innovations.dao;

import gov.med.va.innovations.domain.Testimonial;

import java.util.List;

/**
 * This class tests the current LookupDao implementation class
 * @author mraible
 */
public class TestimonialDaoTest extends BaseDaoTestCase {
    private TestimonialDao dao;
    
    public void setTestimonialDao(TestimonialDao dao) {
        this.dao = dao;
    }

    public void testGetTestimonials() {
        List<Testimonial> testimonials = dao.getAll();
        log.debug(testimonials);
        assertTrue(testimonials.size() > 0);
    }
}
