package gov.med.va.innovations.dao;

import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.Role;

import java.util.List;

/**
 * This class tests the current LookupDao implementation class
 * @author mraible
 */
public class LookupDaoTest extends BaseDaoTestCase {
    private LookupDao dao;
    
    public void setLookupDao(LookupDao dao) {
        this.dao = dao;
    }

    public void testGetRoles() {
        List<Role> roles = dao.getRoles();
        log.debug(roles);
        assertTrue(roles.size() > 0);
    }

    public void testGetComponents() {
        List<Component> components = dao.getComponents();
        log.debug(components);
        assertTrue(components.size() > 0);
    }
}
