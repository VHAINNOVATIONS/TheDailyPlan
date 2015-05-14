package gov.med.va.innovations.dao;


import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.Role;

import java.util.List;

/**
 * Lookup Data Access Object (GenericDao) interface.  This is used to lookup values in
 * the database (i.e. for drop-downs).
 *
 * @author <a href="mailto:matt@raibledesigns.com">Matt Raible</a>
 */
public interface LookupDao extends UniversalDao {
    //~ Methods ================================================================

    /**
     * Returns all Roles ordered by name
     * @return populated list of roles
     */
    List<Role> getRoles();

    /**
     * Returns all Component ordered by name
     * @return populated list of roles
     */
    List<Component> getComponents();
}
