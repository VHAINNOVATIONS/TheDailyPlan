package gov.med.va.innovations.service.impl;

import static org.junit.Assert.assertSame;

import java.util.ArrayList;
import java.util.List;

import gov.med.va.innovations.dao.TestimonialDao;
import gov.med.va.innovations.domain.Testimonial;

import org.jmock.Expectations;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;


public class TestimonialManagerImplTest extends BaseManagerMockTestCase {
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
	public void testFinder() {
        log.debug("testing findByTitle...");

        final String title = "Patient Evaluations";
        final List<Testimonial> testimonial = new ArrayList<Testimonial>();
        testimonial.add(new Testimonial());
        testimonial.get(0).setTitle("Patient Evaluations");

        // set expected behavior on dao
        context.checking(new Expectations() {{
            one(testimonialDao).findByTitle(title);
            will(returnValue(testimonial));
        }});

        Testimonial result = mgr.getTestimonialByTitle(title);

        assertSame(testimonial.get(0), result);
	}
}
