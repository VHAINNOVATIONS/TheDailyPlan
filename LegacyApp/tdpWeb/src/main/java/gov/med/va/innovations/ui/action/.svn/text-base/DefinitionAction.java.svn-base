package gov.med.va.innovations.ui.action;

import gov.med.va.innovations.domain.Definition;
import gov.med.va.innovations.domain.DefinitionStatus;
import gov.med.va.innovations.service.DefinitionManager;
import gov.med.va.innovations.service.PagingLookupManager;
import gov.med.va.innovations.ui.util.ExtendedPaginatedList;
import gov.med.va.innovations.ui.util.PaginateListFactory;

import org.apache.struts2.interceptor.validation.SkipValidation;
import org.displaytag.pagination.PaginatedList;
import org.springframework.dao.DataIntegrityViolationException;

import com.opensymphony.xwork2.validator.annotations.Validation;

@Validation
public class DefinitionAction extends BaseAction {

	private static final long serialVersionUID = 110706864090515863L;
    private PagingLookupManager pagingManager;
    private PaginateListFactory paginatedListFactory;
    private DefinitionManager definitionManager;
    private PaginatedList definitions;
    private Definition definition;
    private Long id;

    public void setId(Long id) {
    	this.id = id;
    }

	public Definition getDefinition() {
		return definition;
	}

	public void setDefinition(Definition definition) {
		this.definition = definition;
	}

    public void setPagingLookupManager(PagingLookupManager pagingManager) {
        this.pagingManager = pagingManager;
    }

	public void setPaginatedListFactory(PaginateListFactory paginatedListFactory) {
		this.paginatedListFactory = paginatedListFactory;
	}

	public void setDefinitionManager(
			DefinitionManager definitionManager2) {
		this.definitionManager = (DefinitionManager) definitionManager2;
	}

	public String lookup() {
        loadDefinitions();
		return SUCCESS;
	}

	public PaginatedList getDefinitions() {
		return definitions;		
	}

	public String list() {
        loadDefinitions();
		return SUCCESS;
	}

	@SkipValidation
	public String reload() {
        this.definitionManager.reloadCommonMedlineDefs();
	    saveMessage(getText("definition.reloaded"));
		return SUCCESS;
	}

	private void loadDefinitions() {
		ExtendedPaginatedList paginatedList = paginatedListFactory
        	.getPaginatedListFromRequest(getRequest());
		paginatedList.setSortCriterion("abbreviation");
		definitions = pagingManager.getAllRecordsPage(Definition.class, paginatedList);
	}
	public String delete() {
		definitionManager.remove(Definition.class,definition.getId());
	    saveMessage(getText("definition.deleted"));

	    return SUCCESS;
	}

	public String edit() {
	    if (id != null) {
	        definition = (Definition) definitionManager.get(Definition.class,id);
	    } else {
	    	definition = new Definition();
	    	definition.setStatus(DefinitionStatus.MISSING);
	    }

	    return SUCCESS;
	}

	public String save() throws Exception {
	    if (cancel != null) {
	        return CANCEL;
	    }
	    if (LOG.isDebugEnabled()) LOG.debug("Starting Save...");

	    if (delete != null) {
	        return delete();
	    }

	    boolean isNew = (definition.getId() == null);

	    try {
	    	definition = (Definition) definitionManager.save(definition);
	    }
	    catch(DataIntegrityViolationException die) {
	    	addActionError(getText("definition.exists", new String[]{definition.getAbbreviation()}));
	    	return INPUT;
	    }

	    String key = (isNew) ? "definition.added" : "definition.updated";
	    saveMessage(getText(key));

	    if (!isNew) {
	        return INPUT;
	    } else {
	        return SUCCESS;
	    }
	}
}
