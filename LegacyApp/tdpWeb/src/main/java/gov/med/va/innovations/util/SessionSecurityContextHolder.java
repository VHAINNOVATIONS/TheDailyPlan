package gov.med.va.innovations.util;

/**
 * Used by the MdwsClientFactory to pass a unique identifier via a ThreadLocal to the Factory
 * 
 * @author insanmaster
 *
 */
public class SessionSecurityContextHolder {

	  private static final ThreadLocal<String> contextHolder = new ThreadLocal<String>();

	  public static void setSessionID(String sessionID) {
	    contextHolder.set(sessionID);
	  }

	  public static String getSessionID() {
	    return contextHolder.get();
	  }

	  public static void clearSessionID() {
	    contextHolder.remove();
	  }

}