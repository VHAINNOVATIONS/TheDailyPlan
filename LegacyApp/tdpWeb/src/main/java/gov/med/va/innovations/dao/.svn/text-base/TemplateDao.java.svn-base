package gov.med.va.innovations.dao;

import java.util.List;

import gov.med.va.innovations.domain.Template;

public interface TemplateDao extends GenericDao<Template, Long>  {
	public ComponentDao getComponentDao();
	
	public Template save(Template template);

	public Template getTemplateByName(String string);

	public List<Template> getTemplatesForWard(String ward);
}
