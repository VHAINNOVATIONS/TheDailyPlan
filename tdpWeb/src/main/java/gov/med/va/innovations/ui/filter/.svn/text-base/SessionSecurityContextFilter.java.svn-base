package gov.med.va.innovations.ui.filter;

import gov.med.va.innovations.util.SessionSecurityContextHolder;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class SessionSecurityContextFilter implements Filter {
	private static final Log LOG = LogFactory.getLog(SessionSecurityContextFilter.class);
	 @SuppressWarnings("unused")
	private FilterConfig filterConfig;

	@Override
	public void destroy() {
		this.filterConfig = null;
	}

	/**
	 * Stuff the sessionId into a threadlocal, to be used to tie WebService clients to a particular user
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		
		SessionSecurityContextHolder.setSessionID(((HttpServletRequest)request).getSession().getId());
		
		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
			this.filterConfig = filterConfig;
	}

}
