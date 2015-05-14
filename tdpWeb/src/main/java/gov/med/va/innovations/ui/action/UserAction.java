package gov.med.va.innovations.ui.action;

import gov.med.va.innovations.Constants;
import gov.med.va.innovations.domain.FontSizes;
import gov.med.va.innovations.domain.Role;
import gov.med.va.innovations.domain.SearchTabs;
import gov.med.va.innovations.domain.User;
import gov.med.va.innovations.domain.VistaTeam;
import gov.med.va.innovations.exception.UserExistsException;
import gov.med.va.innovations.ui.util.RequestUtil;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.mail.MailException;
import org.springframework.security.AccessDeniedException;
import org.springframework.security.Authentication;
import org.springframework.security.AuthenticationTrustResolver;
import org.springframework.security.AuthenticationTrustResolverImpl;
import org.springframework.security.context.SecurityContext;
import org.springframework.security.context.SecurityContextHolder;

import com.opensymphony.xwork2.Preparable;

/**
 * Action for facilitating User Management feature.
 */
public class UserAction extends BaseAction implements Preparable {
    private static final long serialVersionUID = 6776558938712115191L;
    private List<User> users;
    private User user;
    private String id;
	private List<VistaTeam> vistaTeams;


    /**
     * Grab the entity from the database before populating with request parameters
     */
	@Override
    public void prepare() {
        if (getRequest().getMethod().equalsIgnoreCase("post")) {
            // prevent failures on new
            if (!"".equals(getRequest().getParameter("user.id"))) {
                user = userManager.getUser(getRequest().getParameter("user.id"));
            }
        }
        
        vistaTeams = getTeams();
    }

    /**
     * Holder for users to display on list screen
     * @return list of users
     */
    public List<User> getUsers() {
        return users;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    /**
     * Delete the user passed in.
     * @return success
     */
    public String delete() {
        userManager.removeUser(user.getId().toString());
        List<String> args = new ArrayList<String>();
        args.add(user.getFullName());
        saveMessage(getText("user.deleted", args.toArray(new String[0])));

        return SUCCESS;
    }

    /**
     * Grab the user from the database based on the "id" passed in.
     * @return success if user found
     * @throws IOException can happen when sending a "forbidden" from response.sendError()
     */
    public String edit() throws IOException {
        HttpServletRequest request = getRequest();
        boolean editProfile = (request.getRequestURI().indexOf("editProfile") > -1);

        // if URL is "editProfile" - make sure it's the current user
        if (editProfile) {
            // reject if id passed in or "list" parameter passed in
            // someone that is trying this probably knows the AppFuse code
            // but it's a legitimate bug, so I'll fix it. ;-)
            if ((request.getParameter("id") != null) || (request.getParameter("from") != null)) {
                ServletActionContext.getResponse().sendError(HttpServletResponse.SC_FORBIDDEN);
                log.warn("User '" + request.getRemoteUser() + "' is trying to edit user '" 
                         + request.getParameter("id") + "'");

                return null;
            }
        }

        // if a user's id is passed in
        if (id != null) {
            // lookup the user using that id
            user = userManager.getUser(id);
        } else if (editProfile) {
            user = userManager.getUserByUsername(request.getRemoteUser());
        } else {
            user = new User();
            user.addRole(new Role(Constants.USER_ROLE));
        }

        if (user.getUsername() != null) {
            // if user logged in with remember me, display a warning that they can't change passwords
            log.debug("checking for remember me login...");

            AuthenticationTrustResolver resolver = new AuthenticationTrustResolverImpl();
            SecurityContext ctx = SecurityContextHolder.getContext();

            if (ctx != null) {
                Authentication auth = ctx.getAuthentication();

                if (resolver.isRememberMe(auth)) {
                    getSession().setAttribute("cookieLogin", "true");
                    saveMessage(getText("userProfile.cookieLogin"));
                }
            }
        }

        return SUCCESS;
    }

    @SuppressWarnings("unchecked")
	private List<VistaTeam> getTeams() {
		if (null == getSession().getAttribute(Constants.TEAM_LIST_KEY)) {
			getSession().setAttribute(Constants.TEAM_LIST_KEY, vistaManager.getTeams());
		}
		return (List<VistaTeam>) getSession().getAttribute(Constants.TEAM_LIST_KEY);
	}

	/**
     * Default: just returns "success"
     * @return "success"
     */
    public String execute() {
        return SUCCESS;
    }

    /**
     * Sends users to "mainMenu" when !from.equals("list"). Sends everyone else to "cancel"
     * @return "mainMenu" or "cancel"
     */
    public String cancel() {
        if (!"list".equals(from)) {
            return "mainMenu";
        }
        return "cancel";
    }

    /**
     * Save user
     * @return success if everything worked, otherwise input
     * @throws IOException when setting "access denied" fails on response
     */
    public String save() throws Exception {
    	
        Integer originalVersion = user.getVersion();

        boolean isNew = ("".equals(getRequest().getParameter("user.version")));
        // only attempt to change roles if user is admin
        // for other users, prepare() method will handle populating
        if (getRequest().isUserInRole(Constants.ADMIN_ROLE)) {
            user.getRoles().clear(); // APF-788: Removing roles from user doesn't work
            String[] userRoles = getRequest().getParameterValues("userRoles");

            for (int i = 0; userRoles != null && i < userRoles.length; i++) {
                String roleName = userRoles[i];
                user.addRole(roleManager.getRole(roleName));
            }
        }

        getSession().removeAttribute(Constants.TEAM_KEY);
        try {
            userManager.saveUser(user);
        } catch (AccessDeniedException ade) {
            // thrown by UserSecurityAdvice configured in aop:advisor userManagerSecurity
            log.warn(ade.getMessage());
            getResponse().sendError(HttpServletResponse.SC_FORBIDDEN);
            return null;
        } catch (UserExistsException e) {
            List<String> args = new ArrayList<String>();
            args.add(user.getUsername());
            args.add(user.getDuz());
            addActionError(getText("errors.existing.user", args.toArray(new String[0])));

            // reset the version # to what was passed in
            user.setVersion(originalVersion);
            return INPUT;
        } 

        if (!"list".equals(from)) {
            // add success messages
            saveMessage(getText("user.saved"));
            return "mainMenu";
        } else {
            // add success messages
            List<String> args = new ArrayList<String>();
            args.add(user.getFullName());
            if (isNew) {
                saveMessage(getText("user.added", args.toArray(new String[0])));
                // Send an account information e-mail
                mailMessage.setSubject(getText("signup.email.subject"));
                try {
                    sendUserMessage(user, getText("newuser.email.message", args.toArray(new String[0])),
                                    RequestUtil.getAppURL(getRequest()));
                } catch (MailException me) {
                    addActionError(me.getCause().getLocalizedMessage());
                }
                return SUCCESS;
            } else {
                saveMessage(getText("user.updated.byAdmin", args.toArray(new String[0])));
                return INPUT;
            }
        }
    }

    /**
     * Fetch all users from database and put into local "users" variable for retrieval in the UI.
     * @return "success" if no exceptions thrown
     */
    public String list() {
        users = userManager.getUsers(new User());
        return SUCCESS;
    }
    
    public SearchTabs[] getTabList() {   	
    	return SearchTabs.values();
    }
    
    public FontSizes[] getFontList() {
    	return FontSizes.values();
    }

	public List<VistaTeam> getVistaTeams() {
		return vistaTeams;
	}
}
