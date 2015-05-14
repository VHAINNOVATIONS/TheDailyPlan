package gov.med.va.innovations.service.impl;

import gov.med.va.innovations.dao.LookupDao;
import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.Role;
import gov.med.va.innovations.domain.LabelValue;
import gov.med.va.innovations.Constants;
import org.jmock.Expectations;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;


public class LookupManagerImplTest extends BaseManagerMockTestCase {
    private LookupManagerImpl mgr = new LookupManagerImpl();
    private LookupDao lookupDao = null;

    @Before
    public void setUp() throws Exception {
        lookupDao = context.mock(LookupDao.class);
        mgr.setLookupDao(lookupDao);
    }

    @Test
    public void testGetAllRoles() {
        log.debug("entered 'testGetAllRoles' method");

        // set expected behavior on dao
        Role role = new Role(Constants.ADMIN_ROLE);
        final List<Role> testData = new ArrayList<Role>();
        testData.add(role);
        context.checking(new Expectations() {{
            one(lookupDao).getRoles();
            will(returnValue(testData));
        }});

        List<LabelValue> roles = mgr.getAllRoles();
        assertTrue(roles.size() > 0);
    }

    @Test
    public void testGetAllComponents() {
        log.debug("entered 'testGetAllComponents' method");

        // set expected behavior on dao
        Component component = new Component();
        final List<Component> testData = new ArrayList<Component>();
        testData.add(component);
        context.checking(new Expectations() {{
            one(lookupDao).getComponents();
            will(returnValue(testData));
        }});

        List<LabelValue> components = mgr.getAllComponents();
        assertTrue(components.size() > 0);
    }
}
