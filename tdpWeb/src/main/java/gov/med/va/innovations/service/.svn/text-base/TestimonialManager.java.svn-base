package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.Testimonial;

import java.util.List;

/**
 * Business Service Interface to talk to persistence layer and
 * retrieve values for abbreviation definitions.
 *
 * @author mark
 */
public interface TestimonialManager extends GenericManager<Testimonial, Long> {
    
	/**
	 * Allows testimonial retrieval by title
	 * @param title
	 * @return
	 */
	Testimonial getTestimonialByTitle(String title);
    
    List<Testimonial> list();
}
