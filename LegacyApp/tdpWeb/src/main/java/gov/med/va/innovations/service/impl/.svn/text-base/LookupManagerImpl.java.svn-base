package gov.med.va.innovations.service.impl;

import gov.med.va.innovations.dao.LookupDao;
import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.LabelValue;
import gov.med.va.innovations.domain.Role;
import gov.med.va.innovations.service.LookupManager;

import java.util.ArrayList;
import java.util.List;


/**
 * Implementation of LookupManager interface to talk to the persistence layer.
 *
 * @author <a href="mailto:matt@raibledesigns.com">Matt Raible</a>
 */
public class LookupManagerImpl extends UniversalManagerImpl implements LookupManager {
    private LookupDao dao;

    /**
     * Method that allows setting the DAO to talk to the data store with.
     * @param dao the dao implementation
     */
    public void setLookupDao(LookupDao dao) {
        super.dao = dao;
        this.dao = dao;
    }

    /**
     * {@inheritDoc}
     */
    public List<LabelValue> getAllRoles() {
        List<Role> roles = dao.getRoles();
        List<LabelValue> list = new ArrayList<LabelValue>();

        for (Role role1 : roles) {
            list.add(new LabelValue(role1.getName(), role1.getName()));
        }

        return list;
    }

	@Override
	public List<LabelValue> getAllComponents() {
        List<Component> components = dao.getComponents();
        List<LabelValue> list = new ArrayList<LabelValue>();

        for (Component comp1 : components) {
            list.add(new LabelValue(comp1.getName(), comp1.getName()));
        }

        return list;
	}
}
