package gov.med.va.innovations.service;

import java.lang.reflect.Method;

import gov.med.va.innovations.util.MdwsClientFactory;
import gov.va.medora.mdws.emrsvc.AbstractTO;
import gov.va.medora.mdws.emrsvc.FaultTO;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.util.StopWatch;

@Aspect
public class MdwsConnectionAdvice {
    private final Log log = LogFactory.getLog(MdwsConnectionAdvice.class);
    private MdwsClientFactory factory;
    
    public void setMdwsClientFactory(MdwsClientFactory factory) {
    	this.factory = factory;
    }

    @Pointcut("execution(* gov.va.medora.mdws..*Svc*.*(..))")
    public void mdwsMethods(){}
	
	@Around("mdwsMethods()")
	public Object around(ProceedingJoinPoint call) {
		Object retval = null;
		StopWatch clock = null;
		
		if (log.isDebugEnabled())
			clock = new StopWatch(
	              "Profiling MDWS Call " + call.getSignature().getName());
		
		try {
			if (log.isDebugEnabled()) clock.start(call.toShortString());
			retval =  call.proceed();
			
			Method fm = retval.getClass().getMethod("getFault", new Class[]{});
			Object fault = fm.invoke(retval, new Object[]{});
			if (null != fault) {
				Method mm = fault.getClass().getMethod("getMessage", new Class[]{});
				String message = (String) mm.invoke(fault, new Object[]{});
				Method sm = fault.getClass().getMethod("getSuggestion", new Class[]{});
				String suggestion = (String) sm.invoke(fault, new Object[]{});
				if (message.startsWith("Connections not ready")) {
					factory.reconnect();
					retval =  call.proceed();
				}
				else if (message.startsWith("There is no logged in connection")) {
					factory.reconnect();
					retval =  call.proceed();
				}
				else
					log.warn(message+" Suggestion: "+suggestion);
			}
		} catch (Throwable e) {
			log.error("An exception occurred. Trying to reconnect", e);
			// TODO: Probably need to destroy the session and force a login...
		} finally {
			if (log.isDebugEnabled()) {
				clock.stop();
				log.debug(clock.prettyPrint());
			}
		}
		return retval;
	}

}
