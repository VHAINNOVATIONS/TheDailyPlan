package gov.med.va.innovations.dao;


import java.util.List;

import gov.med.va.innovations.domain.Component;

/**
 * Component Data Access Object (DAO) interface.
 */
public interface ComponentDao extends GenericDao<Component, Long> {
    /**
     * Gets component information based on template id
     * @param templateId the owning Template id
     * @return list of populated component objects
     */
    List<Component> getComponentsForTemplate(Long templateId);
    
    /**
     * Retrieve component by name
     * 
     * @param name
     * @return populated component object
     */
    Component getComponentByName(String name);
    
    /**
     * Retrieve component by type: Mandatory or non-mandatory
     * 
     * @param isMandatory whether to select Mandatory or non-mandatory components
     * @return list of populated component objects
     */
    List<Component> getComponentsByType(boolean isMandatory);

    /**
     * Removes a component from the database by owning Template Id
     * @param templateId the component's owning template id
     */
    void removeTemplateComponents(Long templateId);
    
    /**
     * Used to determine if the component has been assigned to a template
     * @param componentId is the component's unique id
     * @return true if it is assigned to a Template
     */
    boolean isComponentAssigned(Long componentId);
}
