package gov.med.va.innovations.util;

import gov.med.va.innovations.service.MdwsConnectionAdvice;
import gov.va.medora.mdws.emrsvc.DataSourceArray;
import gov.va.medora.mdws.emrsvc.EmrSvc;
import gov.va.medora.mdws.emrsvc.EmrSvcSoap;
import gov.va.medora.mdws.emrsvc.UserTO;
import gov.va.medora.mdws.querysvc.QuerySvc;
import gov.va.medora.mdws.querysvc.QuerySvcSoap;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.aop.aspectj.annotation.AspectJProxyFactory;

public class MdwsClient {
	private static final Log LOG = LogFactory.getLog(MdwsClient.class);
    private static final QName EMR_SERVICE_NAME = new QName("http://mdws.medora.va.gov/EmrSvc", "EmrSvc");
    private static final QName QUERY_SERVICE_NAME = new QName("http://mdws.medora.va.gov/QuerySvc", "QuerySvc");    
    public final static URL EMR_WSDL_LOCATION;
    public final static URL QUERY_WSDL_LOCATION;

	private boolean emrConnected;
	private boolean queryConnected;
	private boolean loggedIn;

	private String accessCode;
	private String verifyCode;
	private EmrSvcSoap emrService;
	private QuerySvcSoap queryService;
	private String serviceAddress;
	private String initialSite;
	private MdwsConnectionAdvice mdwsConnectionAdvice;
	
    static
    {
        ClassLoader cl = Thread.currentThread().getContextClassLoader();
        if ( null == cl ) cl = MdwsClient.class.getClassLoader();
        EMR_WSDL_LOCATION = cl.getResource( "wsdl/emrsvc.wsdl" );
        QUERY_WSDL_LOCATION = cl.getResource( "wsdl/querysvc.wsdl" );
    }


	public MdwsClient(String serviceAddress, String initialSite, MdwsConnectionAdvice mdwsConnectionAdvice) {
		this.serviceAddress = serviceAddress;
		this.initialSite = initialSite;
		this.mdwsConnectionAdvice = mdwsConnectionAdvice;
		if (!emrConnected) {
			connect();
		}
		
	}
	
	private EmrSvcSoap makeEmrService() {
// This code loads the wsdl from the target server, which seems off, when it can be loaded locally
//		URL wsdlURL = null;
//		try {
//			if (null == wsdlAddress)
//				wsdlURL = new URL(serviceAddress + "?WSDL");
//			else
//				wsdlURL = new URL(wsdlAddress);
//		} catch (MalformedURLException mue) {
//			LOG.error("Bad URL - can't find WSDL: " + serviceAddress + "?WSDL", mue);
//		}
		long start = System.currentTimeMillis();
        EmrSvc ss = new EmrSvc(EMR_WSDL_LOCATION, EMR_SERVICE_NAME);
        if (LOG.isDebugEnabled()) LOG.debug("It took " + ((System.currentTimeMillis()-start)/1000.0) + " seconds to create the Web service client");
        

		start = System.currentTimeMillis();
        EmrSvcSoap binding = ss.getEmrSvcSoap12();  
        if (LOG.isDebugEnabled()) LOG.debug("It took " + ((System.currentTimeMillis()-start)/1000.0) + " seconds to create the Web service binding");
		(( BindingProvider) binding ).getRequestContext().put( BindingProvider.SESSION_MAINTAIN_PROPERTY, true);
        ( (BindingProvider) binding ).getRequestContext().put( BindingProvider.ENDPOINT_ADDRESS_PROPERTY, serviceAddress );

		// Need to create aspectable client
		AspectJProxyFactory factory = new AspectJProxyFactory(binding);
		factory.addAspect(mdwsConnectionAdvice);
		binding = factory.getProxy();
		
		return binding;
	}
	
	private QuerySvcSoap makeQueryService() {
		long start = System.currentTimeMillis();
		QuerySvc ss = new QuerySvc(QUERY_WSDL_LOCATION, QUERY_SERVICE_NAME);
        if (LOG.isDebugEnabled()) LOG.debug("It took " + ((System.currentTimeMillis()-start)/1000.0) + " seconds to create the QUERY Web service client");
        

		start = System.currentTimeMillis();
        QuerySvcSoap binding = ss.getQuerySvcSoap12();
        if (LOG.isDebugEnabled()) LOG.debug("It took " + ((System.currentTimeMillis()-start)/1000.0) + " seconds to create the QUERY Web service binding");
		( (BindingProvider) binding ).getRequestContext().put( BindingProvider.SESSION_MAINTAIN_PROPERTY, true);
		String queryAddress = serviceAddress.substring(0,serviceAddress.lastIndexOf('/')) + "/querysvc.asmx";
        ( (BindingProvider) binding ).getRequestContext().put( BindingProvider.ENDPOINT_ADDRESS_PROPERTY, queryAddress );

		// Need to create aspectable client
		AspectJProxyFactory factory = new AspectJProxyFactory(binding);
		factory.addAspect(mdwsConnectionAdvice);
		binding = factory.getProxy();
		
		gov.va.medora.mdws.querysvc.DataSourceArray connStatus = binding.connect(initialSite);
		if (null != connStatus.getFault()) {
			LOG.error("Error occured connecting to queryscv: " + connStatus.getFault().getMessage());
		}

		return binding;
	}

	protected void connect() {
		if  (null == emrService)
			emrService = makeEmrService();
		
		DataSourceArray sites = emrService.connect(initialSite);
		if (sites.getCount() > 0 && sites.getFault() == null)
			emrConnected = true;
		if (null != accessCode && null != verifyCode) {
			UserTO user = emrService.login(accessCode, verifyCode, "");
			if (null != user.getFault()) {
				LOG.error("Problem with reconnect: " + user.getFault().getMessage());
			}
		}
	}
	
	public void disconnect() {
		if (emrConnected) {
			emrService.disconnect();
		}
		emrConnected = false;
		
		if (queryConnected) {
			queryService.disconnect();
		}
		queryConnected = false;
	}
	
	public EmrSvcSoap getEmrService() {
		if (!emrConnected) 
			connect();
		
		return emrService;
	}
	
	public QuerySvcSoap getQueryService() {
		if (null == queryService) {
			queryService = makeQueryService();
		}
		
		if (!queryConnected) { 
			gov.va.medora.mdws.querysvc.DataSourceArray connStatus = queryService.connect(initialSite);
			if (null != connStatus.getFault()) {
				LOG.error("Error occured connecting to queryscv: " + connStatus.getFault().getMessage());
			}
			else
				queryConnected = true;
		}
				
		return queryService;
	}

	public boolean isEmrConnected() {
		return emrConnected;
	}


	public boolean isQueryConnected() {
		return queryConnected;
	}
	
	public void queryLogin() {
		queryService.login(accessCode, verifyCode, "");
	}
	
	public void setAccessCode(String accessCode) {
		this.accessCode = accessCode;
	}

	public void setVerifyCode(String verifyCode) {
		this.verifyCode = verifyCode;
	}
	
	public boolean isLoggedIn() {
		return loggedIn;
	}

	public void setLoggedIn(boolean loggedIn) {
		this.loggedIn = loggedIn;
	}
}
