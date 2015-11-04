package gov.med.va.innovations.dao.ibatis;

import gov.med.va.innovations.dao.TestimonialDao;
import gov.med.va.innovations.domain.Testimonial;

import java.util.List;

public class TestimonialDaoiBatis extends GenericDaoiBatis<Testimonial, Long> implements
		TestimonialDao {

	
	public TestimonialDaoiBatis(Class<Testimonial> persistentClass) {
		super(Testimonial.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Testimonial> findByTitle(String title) {
        return  (List<Testimonial>) getSqlMapClientTemplate().queryForList("findByTitle", title);
	}

}
