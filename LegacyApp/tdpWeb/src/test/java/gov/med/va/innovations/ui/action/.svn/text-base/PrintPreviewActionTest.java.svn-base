package gov.med.va.innovations.ui.action;

import gov.med.va.innovations.domain.User;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.service.UserManager;
import gov.med.va.innovations.util.SessionSecurityContextHolder;

import org.apache.struts2.ServletActionContext;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.providers.UsernamePasswordAuthenticationToken;

public class PrintPreviewActionTest extends BaseActionTestCase {
	private PrintPreviewAction action;
	private UserManager userManager;
	private MockHttpServletRequest request;

	public void setPrintPreviewAction(PrintPreviewAction action) {
		this.action = action;
	}
	
    public void setUserManager(UserManager userManager) {
		this.userManager = userManager;
	}

	@Override
    public void onSetUp() {
    	SessionSecurityContextHolder.setSessionID("printPreview");		
        // so request.getRequestURL() doesn't fail
        request = new MockHttpServletRequest("GET", "/printPreview.html");
        request.setAttribute("patientIds", new String[]{"237","100808"});
        ServletActionContext.setRequest(request);
    }
    
    public void testDisplay() throws Exception {
        VistaSignon signon = action.doVistaSignon("vhaino321", "verify123.");
        if (null != signon.getDuz()) {
        	User user = userManager.getUserByUsername("vhaino321");
        	UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user, "verify123.", null);
        	request.setUserPrincipal(token);
        }

        assertTrue(null != action.getFontList());
        assertTrue(null != action.getDefaultFont() && "MEDIUM".equals(action.getDefaultFont()));
        assertEquals("success", action.execute());
        assertEquals(2,action.getReports().size());
        assertEquals("237",action.getReport().getPatient().getLocalPid());

    	action.setReport(action.getReports().get(1));
    	assertTrue(action.getTemplates().size() == 2);
        assertEquals("success", action.previewPatient());
    	assertEquals(action.getReport().getTemplate().getComponents().size(), action.getReport().getExpandedComponents().size());

    	action.getReport().setTemplate(action.getTemplates().get(1));
    	assertEquals("success", action.changeTemplate());
    	assertEquals(action.getReport().getTemplate().getComponents().size(), action.getReport().getExpandedComponents().size());
    }

}
