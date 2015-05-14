package gov.med.va.innovations.dao.ibatis;

import java.util.List;

import gov.med.va.innovations.dao.ComponentDao;
import gov.med.va.innovations.dao.TemplateDao;
import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.Template;
import gov.med.va.innovations.util.ParamMap;

public class TemplateDaoiBatis extends GenericDaoiBatis<Template, Long> implements
		TemplateDao {
	private ComponentDao dao;
	
	public ComponentDao getComponentDao() {
		return dao;
	}

	public void setComponentDao(ComponentDao dao) {
		this.dao = dao;
	}

	public TemplateDaoiBatis() {
		super(Template.class);
	}
	
	@Override
	public Template save(Template template) {
        if (template.getId() == null) {
            Long id = (Long) getSqlMapClientTemplate().insert("addTemplate", template);
            template.setId(id);
            addTemplateComponents(template);
        } else {
            getSqlMapClientTemplate().update("updateTemplate", template);
            deleteTemplateComponents(template.getId());
            addTemplateComponents(template);
        }
        return template;
	}

	private void deleteTemplateComponents(Long templateId) {
		dao.removeTemplateComponents(templateId);
		
	}

	private void addTemplateComponents(Template template) {
		int priority = 0;
		for (Component component:template.getComponents()) {
			ParamMap params = new ParamMap("componentId",component.getId(),"templateId",template.getId(),"priority",++priority);
			getSqlMapClientTemplate().insert("addTemplateComponent", params);
		}
		
	}
	
	@Override
	public void remove(Long id) {
		dao.removeTemplateComponents(id);
		super.remove(id);
	}

	@Override
	public Template getTemplateByName(String name) {
		return (Template) getSqlMapClientTemplate().queryForObject("getTemplateByName", name);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Template> getTemplatesForWard(String ward) {
		return getSqlMapClientTemplate().queryForList("getTemplatesForWard", ward);
	}

}
