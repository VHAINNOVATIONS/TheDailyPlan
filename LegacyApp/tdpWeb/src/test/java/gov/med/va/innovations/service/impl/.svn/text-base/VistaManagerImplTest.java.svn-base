package gov.med.va.innovations.service.impl;

import static org.junit.Assert.assertSame;
import gov.med.va.innovations.dao.TestimonialDao;
import gov.med.va.innovations.domain.Testimonial;

import java.util.ArrayList;
import java.util.List;

import org.jmock.Expectations;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;


public class VistaManagerImplTest extends BaseManagerMockTestCase {
    private TestimonialManagerImpl mgr = null;
    private TestimonialDao testimonialDao = null;

    @Before
    public void setUp() throws Exception {
    	testimonialDao = context.mock(TestimonialDao.class);
        mgr= new TestimonialManagerImpl(testimonialDao);
    }
	
	@After
	public void tearDown() {
		mgr = null;
	}

    @Test
	public void testGetTestimonial() {
        log.debug("testing getAll...");

        final List<Testimonial> testimonials = new ArrayList<Testimonial>();

        // set expected behavior on dao
        context.checking(new Expectations() {{
            one(testimonialDao).getAll();
            will(returnValue(testimonials));
        }});

        List<Testimonial> result = mgr.getAll();

        assertSame(testimonials, result);
	}
}
