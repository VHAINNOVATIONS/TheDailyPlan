package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.VistaTO;
import gov.med.va.innovations.ui.util.MarkupUtil;
import gov.med.va.innovations.util.annotation.EscapeForXhtml;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.aop.AfterReturningAdvice;

/**
 * This advice is responsible for enforcing security and only allowing administrators
 * to modify users. Users are allowed to modify themselves.
 *
 * @author mraible
 */
public class MdwsXhtmlAdvice implements AfterReturningAdvice {
    /**
     * Default "Access Denied" error message (not i18n-ized).
     */
    private final Log log = LogFactory.getLog(MdwsXhtmlAdvice.class);
    private static final int CALL_DEPTH = 2;

    /**
     * After returning, grab the return object, for any annotated methods, escape the HTML
     * @param returnValue the user object
     * @param method the name of the method executed
     * @param args the arguments to the method
     * @param target the target class
     */
    @SuppressWarnings("unchecked")
	public void afterReturning(Object returnValue, Method method, Object[] args, Object target)
    throws Throwable {
    	if (null == returnValue)
    		return;
    	
    	Class<? extends VistaTO> clazz = (Class<? extends VistaTO>) returnValue.getClass();
    	if (null == clazz.getAnnotation(EscapeForXhtml.class) && !hasList(clazz.getMethods(), CALL_DEPTH)) {
    		return;
    	}
    	
    	if (null != clazz.getAnnotation(EscapeForXhtml.class))
    		processClass(returnValue);
    	else {
    		for (Method mtd : clazz.getDeclaredMethods()) {
    			if (mtd.getName().startsWith("get") && mtd.getReturnType().getSimpleName().equals("List")) {
    				List list = (List) mtd.invoke(returnValue, new Object[]{});
    				if (null != list)
	    				for (Object item : list) {
	    					if (!processClass(item))
	    						break;
	    				}
    			}
    		}
    	}
    }

	@SuppressWarnings("unchecked")
	private boolean processClass(Object returnValue)
			throws IllegalAccessException, InvocationTargetException,
			NoSuchMethodException {
		
		if (returnValue instanceof VistaTO && ((VistaTO)returnValue).isHtmlApplied())
			return false;
		
    	Class<? extends VistaTO> clazz = (Class<? extends VistaTO>) returnValue.getClass();
    	boolean annotated = false;
		for (Method mtd : clazz.getDeclaredMethods()) {
        	if (mtd.isAnnotationPresent(EscapeForXhtml.class)) {
        		annotated = true;
        		if (mtd.getName().startsWith("get")) {
        			String marked = MarkupUtil.stringToHTMLString((String) mtd.invoke(returnValue, new Object[]{}));
        			// get setter
        			Method setter = clazz.getDeclaredMethod("s"+ mtd.getName().substring(1), String.class);
        			if (null == setter)
        				throw new InvocationTargetException(new Exception("The object " + returnValue.getClass().getName() + " has no setter named: " + "s"+ mtd.getName().substring(1)));
        			setter.invoke(returnValue, marked);
        		}
            	else{
                	// TODO: handle case where setter is annotated, disallowing both getter and setter to be annotated
                	log.error("Setter was annotated, and is unhandled");        		
            	}
           	}
		}
		
		return annotated;
	}

	private boolean hasList(Method[] methods, int recursionMax) {
		if (recursionMax < 0)
			return false; 
		
		for (Method mtd : methods) {
			Class<?> rt = mtd.getReturnType();
			if (rt.getName().endsWith("util.List"))
				return true;
			else if (null != rt.getSuperclass() && rt.getSuperclass().getName().endsWith("VistaTO")) {
				if (hasList(rt.getClass().getDeclaredMethods(), recursionMax - 1))
					return true;
			}
		}
		return false;
	}

}
