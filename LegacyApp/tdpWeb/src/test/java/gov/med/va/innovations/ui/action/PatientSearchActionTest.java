package gov.med.va.innovations.ui.action;

import gov.med.va.innovations.domain.User;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.service.UserManager;
import gov.med.va.innovations.util.SessionSecurityContextHolder;

import org.apache.struts2.ServletActionContext;
import org.springframework.mock.web.MockHttpServletRequest;

public class PatientSearchActionTest extends BaseActionTestCase {
	private PatientSearchAction action;
	private UserManager userManager;

	public void setUserManager(UserManager userManager) {
		this.userManager = userManager;
	}

	public void setSearchAction(PatientSearchAction action) {
		this.action = action;
	}
	
    @Override
    public void onSetUp() {
    	SessionSecurityContextHolder.setSessionID("123456");		
    }
    
    public void testDisplay() throws Exception {
        // so request.getRequestURL() doesn't fail
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/mainMenu.html");
        ServletActionContext.setRequest(request);
        VistaSignon signon = action.doVistaSignon("vhaino321", "verify123.");
        if (null != signon.getDuz()) {
        	User user = userManager.getUserByUsername("vhaino321");
        	request.setUserPrincipal(user);
        }

        assertTrue(null != action.getTeam());
        assertTrue(null != action.getUnits());
        assertEquals("success", action.execute());
    }

}
