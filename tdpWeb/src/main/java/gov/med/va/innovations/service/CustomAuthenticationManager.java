package gov.med.va.innovations.service;

import gov.med.va.innovations.Constants;
import gov.med.va.innovations.domain.Role;
import gov.med.va.innovations.domain.User;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.exception.UserExistsException;
import gov.med.va.innovations.util.SessionSecurityContextHolder;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.Authentication;
import org.springframework.security.AuthenticationException;
import org.springframework.security.AuthenticationManager;
import org.springframework.security.BadCredentialsException;
import org.springframework.security.GrantedAuthority;
import org.springframework.security.providers.UsernamePasswordAuthenticationToken;
import org.springframework.security.ui.WebAuthenticationDetails;

public class CustomAuthenticationManager implements AuthenticationManager {
	@SuppressWarnings("unused")
	private static final Log LOG = LogFactory.getLog(CustomAuthenticationManager.class);

	private UserManager userManager;
	private VistaManager vistaManager;
	private static Role userRole;
	
	public void setUserManager(UserManager userManager) {
		this.userManager = userManager;
	}
	public void setRoleManager(RoleManager roleManager) {
		userRole = roleManager.getRole(Constants.USER_ROLE);
	}

	public void setVistaManager(VistaManager vistaManager) {
		this.vistaManager = vistaManager;
	}

	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException {
		
		if(StringUtils.isBlank((String) authentication.getPrincipal()) || StringUtils.isBlank((String) authentication.getCredentials()))
			throw new BadCredentialsException("Invalid username/password");

		User user = null;
		GrantedAuthority[] grantedAuthorities = null;
		
		WebAuthenticationDetails details = (WebAuthenticationDetails) authentication.getDetails();
		SessionSecurityContextHolder.setSessionID(details.getSessionId());
		VistaSignon vista = vistaManager.doVistaSignon(authentication.getPrincipal().toString(), authentication.getCredentials().toString());
		if (null == vista.getDuz()) {
			vistaManager.destroyClient();
			throw new BadCredentialsException("Invalid username/password");
		}
			
		user = new User();
		user.setUsername((String) authentication.getPrincipal());
		user.setFirstName(vista.getName().substring(vista.getName().indexOf(',')+1));
		user.setLastName(vista.getName().substring(0,vista.getName().indexOf(',')));
		user.setDuz(vista.getDuz());
		user.setEnabled(true);
		user.addRole(userRole);  // Default Role
		try {
			userManager.saveUser(user);
		} catch (UserExistsException uee) {
			user = userManager.getUserByUsername((String) authentication.getPrincipal());
		}

		grantedAuthorities = user.getAuthorities();

		user.setMessage(vista.getGreeting());
		return new UsernamePasswordAuthenticationToken(user, authentication.getCredentials(), grantedAuthorities);
	}
}
