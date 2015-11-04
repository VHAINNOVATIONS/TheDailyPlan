package gov.med.va.innovations.dao.ibatis;

import gov.med.va.innovations.dao.ComponentDao;
import gov.med.va.innovations.domain.Component;

import java.util.List;

public class ComponentDaoiBatis extends GenericDaoiBatis<Component, Long> implements
		ComponentDao {

	public ComponentDaoiBatis() {
		super(Component.class);
	}

	@Override
	public void removeTemplateComponents(Long templateId) {
		getSqlMapClientTemplate().delete("deleteTemplateComponentForTemplate", templateId);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Component> getComponentsForTemplate(Long templateId) {
		return getSqlMapClientTemplate().queryForList("getComponentsByTemplate", templateId);
	}

	@Override
	public Component getComponentByName(String name) {
		return (Component) getSqlMapClientTemplate().queryForObject("getComponentByName", name);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Component> getComponentsByType(boolean isMandatory) {
		return getSqlMapClientTemplate().queryForList("getComponentsByType", isMandatory);
	}

	@Override
	public boolean isComponentAssigned(Long componentId) {
		return ((Integer) getSqlMapClientTemplate().queryForObject("getOwned", componentId) > 0);
	}

}
