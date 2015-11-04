package gov.med.va.innovations.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.AuthenticationException;
import org.springframework.security.ui.webapp.AuthenticationProcessingFilterEntryPoint;

public class CustomAuthenticationEntryPoint extends
		AuthenticationProcessingFilterEntryPoint {
	private static final Log logger = LogFactory.getLog(CustomAuthenticationEntryPoint.class);

	@Override
	public void commence(ServletRequest request, ServletResponse response, 
			AuthenticationException authException) throws IOException, ServletException {
		super.commence(request, response, authException);
	}
}
