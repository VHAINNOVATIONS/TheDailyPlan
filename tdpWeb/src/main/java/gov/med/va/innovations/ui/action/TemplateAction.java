package gov.med.va.innovations.ui.action;

import gov.med.va.innovations.Constants;
import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.Template;
import gov.med.va.innovations.domain.VistaLocation;
import gov.med.va.innovations.service.PagingLookupManager;
import gov.med.va.innovations.service.TemplateManager;
import gov.med.va.innovations.ui.listener.StartupListener;
import gov.med.va.innovations.ui.util.ExtendedPaginatedList;
import gov.med.va.innovations.ui.util.PaginateListFactory;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.struts2.util.ServletContextAware;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.displaytag.pagination.PaginatedList;
import org.springframework.dao.DataIntegrityViolationException;

import com.opensymphony.xwork2.validator.annotations.Validation;

@Validation
public class TemplateAction extends BaseAction implements ServletContextAware {

	private static final long serialVersionUID = 110706864090515863L;
	private static final String COMPONENT = "component";
    private PagingLookupManager pagingManager;
    private PaginateListFactory paginatedListFactory;
    private TemplateManager templateManager;
    private PaginatedList templates;
    private Template template;
    private Component component;
    private Long id;
    private Long componentId;
	private ServletContext sContext;

    public void setId(Long id) {
    	this.id = id;
    }

	public Template getTemplate() {
		return template;
	}

	public void setTemplate(Template template) {
		this.template = template;
	}

    public void setPagingLookupManager(PagingLookupManager pagingManager) {
        this.pagingManager = pagingManager;
    }

	public void setPaginatedListFactory(PaginateListFactory paginatedListFactory) {
		this.paginatedListFactory = paginatedListFactory;
	}

	public void setTemplateManager(
			TemplateManager templateManager2) {
		this.templateManager = (TemplateManager) templateManager2;
	}

	public String lookup() {
		loadTemplates();
		return SUCCESS;
	}

	public PaginatedList getTemplates() {
		return templates;		
	}
	
	@SuppressWarnings("unchecked")
	public List<VistaLocation> getWards() {
		if (null == getSession().getAttribute(Constants.WARD_LIST)) {
			getSession().setAttribute(Constants.WARD_LIST, vistaManager.getWards());
		}
		
		return (List<VistaLocation>) getSession().getAttribute(Constants.WARD_LIST);
	}

	public String list() {
        loadTemplates();
		return SUCCESS;
	}

	private void loadTemplates() {
		ExtendedPaginatedList paginatedList = paginatedListFactory
        	.getPaginatedListFromRequest(getRequest());
		paginatedList.setSortCriterion("template_name");
		templates = pagingManager.getAllRecordsPage(Template.class, paginatedList);
	}

	public String delete() {
		templateManager.remove(template.getId());
	    saveMessage(getText("template.deleted"));

	    return SUCCESS;
	}


	public String deleteComponent() {
		templateManager.removeComponent(component.getId());
	    
	    StartupListener.setupContext(sContext);

	    saveMessage(getText("component.deleted"));

	    return SUCCESS;
	}

	public String edit() {
	    if (id != null) {
	    	template = (Template) templateManager.get(id);
			stripMandatory();
	    } else {
	    	template = new Template();
	    }

	    return SUCCESS;
	}

	private void stripMandatory() {
		// Strip all Mandatory components, as these are not editable
		List<Component> comps = new ArrayList<Component>();
		comps.addAll(template.getComponents());
		for (Component comp:comps) {
			if (comp.isMandatory()) {
				template.getComponents().remove(comp);
			}
		}
	}
	
	public String editComponent() {
		Long compId = (Long) getRequest().getAttribute("componentId");
	    if (componentId != null) {
	    	component = (Component) templateManager.getComponent(componentId);
	    } else if (compId != null) {
	    	component = (Component) templateManager.getComponent(compId);
	    	componentId = compId;
	    } else {
	    	component = new Component();
	    }

		return SUCCESS;		
	}
	
	public String doComponent() {
		getRequest().setAttribute("componentId", this.componentId);
		return COMPONENT;		
	}
	
	public String getJsonComponents() {
		List<JSONObject> comps = new ArrayList<JSONObject>();
		for (Component comp : templateManager.getComponentsByType(false)) {
			JSONObject json = new JSONObject();
			try {
				json.put("id", comp.getId());
				json.put("name", comp.getName());
				comps.add(json);
			} catch (JSONException e) {
				LOG.error("Error converting component to JSON", e);
			}
		}
		return new JSONArray(comps).toString();
	}
	
	public boolean isComponentOwned() {
		return templateManager.isComponentOwned(componentId);
	}

	public String save() throws Exception {
	    if (cancel != null) {
	        return CANCEL;
	    }
	    if (LOG.isDebugEnabled()) LOG.debug("Starting Save...");

	    if (delete != null) {
	        return delete();
	    }

	    boolean isNew = (template.getId() == null);

	    try {
	    	List<Component> components = templateManager.getAllComponents();
	    	String[] selComponents = getRequest().getParameterValues("components");
	    	if (null == selComponents)
	    		selComponents = new String[]{};
	    	template.setComponents(new ArrayList<Component>(selComponents.length));

            for (String componentName : selComponents) {
            	for (Component comp : components) {
            		if (comp.getName().equals(componentName)) {
            			template.getComponents().add(comp);
            			break;
            		}
            	}
            }
            
            if (null == template.getCreatedBy())
            	template.setCreatedBy(getRequest().getUserPrincipal().getName());
            
	    	template = (Template) templateManager.saveTemplate(template);
	    	stripMandatory();
	    }
	    catch(DataIntegrityViolationException die) {
	    	addActionError(getText("template.exists", new String[]{template.getName()}));
	    	return INPUT;
	    }

	    String key = (isNew) ? "template.added" : "template.updated";
	    saveMessage(getText(key));

	    if (!isNew) {
	        return INPUT;
	    } else {
	        return SUCCESS;
	    }
	}
	
	public String saveComponent() throws Exception {
	    if (cancel != null) {
	        return CANCEL;
	    }
	    if (LOG.isDebugEnabled()) LOG.debug("Starting SaveComponent...");

	    if (delete != null) {
	        return deleteComponent();
	    }

	    boolean isNew = (component.getId() == null);

	    try {
	    	if (!component.getTitle().startsWith("<h4>")) {
	    		component.setTitle(new StringBuffer("<h4>").append(component.getTitle()).append("</h4>").toString());
	    	}
	    	if (isNew) {
		    	component.setMandatory(false);
		    	component.setMethod("getDefault");
	    	}
	    	if (null == component.getCreatedBy())
	    		component.setCreatedBy(getRequest().getUserPrincipal().getName());
	    	component = (Component) templateManager.saveComponent(component);
	    }
	    catch(DataIntegrityViolationException die) {
	    	addActionError(getText("component.exists", new String[]{component.getName()}));
	    	return INPUT;
	    }
	    
	    StartupListener.setupContext(sContext);

	    String key = (isNew) ? "component.added" : "component.updated";
	    saveMessage(getText(key));

	    if (!isNew) {
	        return INPUT;
	    } else {
	        return SUCCESS;
	    }
	}

	public Component getComponent() {
		return component;
	}

	public void setComponent(Component component) {
		this.component = component;
	}

	@Override
	public void setServletContext(ServletContext ctx) {
		this.sContext = ctx;
	}

	public Long getComponentId() {
		return componentId;
	}

	public void setComponentId(Long componentId) {
		this.componentId = componentId;
	}
}
