package gov.med.va.innovations.service.impl;

import gov.med.va.innovations.dao.TestimonialDao;
import gov.med.va.innovations.domain.Testimonial;
import gov.med.va.innovations.service.TestimonialManager;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.annotation.Secured;

/**
 * Implementation of TestimonialManager interface.
 * 
 * @author mark
 */
@Path("/testimonials")
public class TestimonialManagerImpl extends GenericManagerImpl<Testimonial, Long> implements TestimonialManager {
	@SuppressWarnings("unused")
	private static final Log LOG = LogFactory.getLog(TestimonialManagerImpl.class);

	private TestimonialDao dao;

	public TestimonialManagerImpl(TestimonialDao genericDao) {
		super(genericDao);
		dao = genericDao;
	}

    public void setTestimonialDao(TestimonialDao dao) {
        this.dao = dao;
    }

	@Override
	@Produces("application/json")
	@Secured("ROLE_USER")
	@GET
	@Path("/title/{title}")
	public Testimonial getTestimonialByTitle(@PathParam("title") String title) {
		List<Testimonial> tms = dao.findByTitle(title);
		return tms.get(0);
	}

	@Override
	@Produces("application/json")
	@GET
	public List<Testimonial> list() {
		return getAll();
	}
}