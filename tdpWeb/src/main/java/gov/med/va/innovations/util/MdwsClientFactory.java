package gov.med.va.innovations.util;

import gov.va.medora.mdws.emrsvc.EmrSvcSoap;
import gov.va.medora.mdws.emrsvc.UserTO;
import gov.va.medora.mdws.querysvc.QuerySvcSoap;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * Track stateful Mdws clients by session.  Unfortunately, these cannot be stored in the session
 * as they're non-serializable.  A session Destroyed listener will clean up these entries.
 * @author VHADMAROSENMA
 *
 */
public class MdwsClientFactory  implements ApplicationContextAware {
	private static final Log LOG = LogFactory.getLog(MdwsClientFactory.class);
	private Map<String,MdwsClient> clients = Collections.synchronizedMap(new HashMap<String,MdwsClient>());
	private String initialSite;
	private ApplicationContext applicationContext;
	
	public void setInitialSite(String initialSite) {
		this.initialSite = initialSite;
	}

	public String getInitialSite() {
		return initialSite;
	}

	/**
	 * Retrieve managed session for a session
	 * @param sessionId
	 * @return
	 */
	public EmrSvcSoap getMdwsForClient() {
		String sessionId = getSessionId();
		MdwsClient client = clients.get(sessionId);
		if (client == null) 
			client = createNewClient(sessionId); 

		return client.getEmrService();
	}
	
	/**
	 * Convenience method for retrieving a session, and logging on the session if not already logged on
	 * 
	 * @param sessionId
	 * @param access - Vista Access code
	 * @param verify - Vista verify code
	 * @return
	 */
	public EmrSvcSoap getMdwsForClient(String access, String verify) {
		EmrSvcSoap service = getMdwsForClient();
		MdwsClient client = clients.get(getSessionId());
		if (!client.isLoggedIn()) {
			client.setAccessCode(access);
			client.setVerifyCode(verify);
			UserTO user = service.login(access, verify, "");
			if (user.getDUZ() != null)
				client.setLoggedIn(true);
		}
		return service;
	}

	/**
	 * Retrieve managed session for a session
	 * @param sessionId
	 * @return
	 */
	public QuerySvcSoap getQueryForClient() {
		String sessionId = getSessionId();
		MdwsClient client = clients.get(sessionId);
		if (client == null) 
			client = createNewClient(sessionId); 

		QuerySvcSoap query = client.getQueryService();
		// Log in should have already happened
		client.queryLogin();
		
		return query;
	}
	
	/**
	 * Convenience method for retrieving a session, and logging on the session if not already logged on
	 * 
	 * @param sessionId
	 * @param access - Vista Access code
	 * @param verify - Vista verify code
	 * @return
	 */
	public QuerySvcSoap getQueryForClient(String access, String verify) {
		QuerySvcSoap service = getQueryForClient();
		MdwsClient client = clients.get(getSessionId());
		if (!client.isLoggedIn()) {
			client.setAccessCode(access);
			client.setVerifyCode(verify);
			gov.va.medora.mdws.querysvc.UserTO user = service.login(access, verify, "");
			if (user.getDUZ() != null)
				client.setLoggedIn(true);
		}
		return service;
	}
	
	private String getSessionId() {
		String sessionId = SessionSecurityContextHolder.getSessionID();
		if (null == sessionId) 
			throw new RuntimeException("No session ID stored in SessionSecurityContextHolder!");
		return sessionId;
	}

	public void cacheCredentials(String accessCode, String verifyCode) {
		String sessionId = SessionSecurityContextHolder.getSessionID();
		MdwsClient client = clients.get(sessionId);
		client.setAccessCode(accessCode);
		client.setVerifyCode(verifyCode);
		if (LOG.isDebugEnabled()) LOG.debug("Checking MDWS Client for valid logon");
		if (null != client.getEmrService().getWards() && null == client.getEmrService().getWards().getFault())
			client.setLoggedIn(true);
	}
	
	public void remove() {
		clients.get(getSessionId()).disconnect();
		clients.remove(getSessionId());
	}

	private MdwsClient createNewClient(String sessionId) {
		if (LOG.isDebugEnabled()) LOG.debug("Creating new MDWS Client");
		MdwsClient mdwsClient = (MdwsClient) applicationContext.getBean("mdwsClient");

		clients.put(sessionId, mdwsClient);
		return mdwsClient;
	}
	
	public synchronized void destroy() {
		if (LOG.isDebugEnabled()) LOG.debug("Destroying all MDWS Clients");
		String[] keys = clients.keySet().toArray(new String[0]);
		for (String key : keys) {
			MdwsClient client = clients.get(key);
			client.disconnect();
			clients.remove(key);
		}
	}

	public void reconnect() {
		if (LOG.isDebugEnabled()) LOG.debug("Reconnecting MDWS Client");
		MdwsClient client =clients.get(getSessionId());
		client.disconnect();
		client.connect();
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		this.applicationContext = applicationContext;
	}
}
