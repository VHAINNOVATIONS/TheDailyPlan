package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.Template;
import gov.med.va.innovations.domain.VistaTO;

import java.util.List;

/**
 * Business Service Interface to talk to persistence layer and
 * retrieve values for report templates.
 *
 * @author mark
 */
public interface TemplateManager extends GenericManager<Template, Long> {
    
	/**
	 * Allows template retrieval by name
	 * @param title
	 * @return a template matching the name
	 */
	Template getTemplateByname(String name);
	
	/**
	 * Save template, ensuring that all mandatory components are included
	 * @param template is the Template to save
	 * @return the updated Template
	 */
	Template saveTemplate(Template template);
    
	/**
	 * List all Templates for management
	 * @return a list of all templates
	 */
    List<Template> list();
    
    /**
     * Retrieve all templates specific to a ward, including defaults
     * @param ward
     * @return
     */
    List<Template> getTemplatesForWard(String ward);
    
    /**
     * Retrieve all components for display and selection
     * 
     * @return a List of all defined components
     */
    List<Component> getAllComponents();
    
    /**
     * Translate the component velocity template into an HTML snippet for the report
     * @param name is the Component Name containing the template
     * @param vistaTO is the EMR object used to load the template
     * @return a string containing the translated HTML
     */
    String getComponent(String name, VistaTO vistaTO);
    
    
    /**
     * Retrieve all components by component type: Mandatory or Non-mandatory
     * @param isMandatory determines whether to select Mandatory or Non-mandatory components
     * @return a list of all selected components
     */
    List<Component> getComponentsByType(boolean isMandatory);

    /**
     * Retrieve a specific component by Id
     * @param id the Id of the component to retrieve
     * @return a fully populated COmponent
     */
	Component getComponent(Long id);

	/**
	 * Remove component referenced by Id
	 * @param id the Id of the component to remove
	 */
	void removeComponent(Long id);

	/**
	 * Save updates to the component
	 * @param component is the component object to persist
	 * @return the persisted component
	 */
	Component saveComponent(Component component);

	/**
	 * Tests whether the component identified by the provided Id is owned by at least one template
	 * @param componentId is the ID of the Component to check
	 * @return true if the component is assigned to at least one template
	 */
	boolean isComponentOwned(Long componentId);
}
