package gov.med.va.innovations.service.impl;

import gov.med.va.innovations.dao.ComponentDao;
import gov.med.va.innovations.dao.TemplateDao;
import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.Template;
import gov.med.va.innovations.domain.VistaTO;
import gov.med.va.innovations.service.TemplateManager;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.springframework.ui.velocity.VelocityEngineUtils;

public class TemplateManagerImpl extends GenericManagerImpl<Template, Long> implements TemplateManager {
    private VelocityEngine velocityEngine;
    private ComponentDao componentDao;
	
	public void setVelocityEngine(VelocityEngine velocityEngine) {
		this.velocityEngine = velocityEngine;
	}
	
	public void setComponentDao(ComponentDao componentDao) {
		this.componentDao = componentDao;
	}

	public TemplateManagerImpl(TemplateDao dao) {
		super(dao);
	}
	
	public TemplateDao getTemplateDao() {
		return (TemplateDao) genericDao;
	}

	@Override
	public String getComponent(String name, VistaTO vistaTO) {
        String result = null;
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("vista", vistaTO);

        try {
            result =
                VelocityEngineUtils.mergeTemplateIntoString(velocityEngine,
                		name, map);
        } catch (VelocityException e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }
        
		return result;
	}

	@Override
	public Template getTemplateByname(String name) {
		return getTemplateDao().getTemplateByName(name);
	}

	@Override
	public List<Template> list() {
		return getAll();
	}

	@Override
	public List<Template> getTemplatesForWard(String ward) {
		return getTemplateDao().getTemplatesForWard(ward);
	}

	@Override
	public List<Component> getAllComponents() {
		return componentDao.getAll();
	}

	@Override
	public List<Component> getComponentsByType(boolean isMandatory) {
		return componentDao.getComponentsByType(isMandatory);
	}

	@Override
	public Template saveTemplate(Template template) {
		List<Component> templateComps = new ArrayList<Component>();
		// Ensure that all mandatory components exist
		templateComps.addAll(getComponentsByType(true));
		// Add selected non-mandatory comps
		if (null != template.getComponents()) {
			for (Component comp : template.getComponents()) {
				if (!comp.isMandatory()) {
					templateComps.add(comp);
				}
			}
		}
		template.setComponents(templateComps);
		
		return save(template);
	}

	@Override
	public Component getComponent(Long id) {
		return componentDao.get(id);
	}

	@Override
	public void removeComponent(Long id) {
		componentDao.remove(id);
	}

	@Override
	public Component saveComponent(Component component) {
		return componentDao.save(component);
	}

	@Override
	public boolean isComponentOwned(Long componentId) {
		return componentDao.isComponentAssigned(componentId);
	}

}
