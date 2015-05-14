package gov.med.va.innovations.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import gov.med.va.innovations.Constants;
import org.springframework.context.i18n.LocaleContextHolder;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * Date Utility Class used to convert Strings to Dates and Timestamps
 * 
 * @author <a href="mailto:matt@raibledesigns.com">Matt Raible</a>
 *  Modified by <a href="mailto:dan@getrolling.com">Dan Kibler </a> 
 *  to correct time pattern. Minutes should be mm not MM (MM is month). 
 */
public class DateUtil {
    private static Log log = LogFactory.getLog(DateUtil.class);
    private static final String TIME_PATTERN = "HH:mm";
    private static Date currentOverride;
    private static boolean bypassTodayCheck;
    private static DateUtil instance;

    /**
     * Checkstyle rule: utility classes should not have public constructor
     */
    private DateUtil() {
    }
    
    public static DateUtil getInstance() {
    	if (null == instance) {
    		instance = new DateUtil();
    	}
    	
    	return instance;
    }

    /**
     * Return default datePattern (MM/dd/yyyy)
     * @return a string representing the date pattern on the UI
     */
    public static String getDatePattern() {
        Locale locale = LocaleContextHolder.getLocale();
        String defaultDatePattern;
        try {
            defaultDatePattern = ResourceBundle.getBundle(Constants.BUNDLE_KEY, locale)
                .getString("date.format");
        } catch (MissingResourceException mse) {
            defaultDatePattern = "MM/dd/yyyy";
        }

        return defaultDatePattern;
    }

    /**
     * Return default datePattern (yyyyMMdd)
     * @return a string representing the date pattern on the UI
     */
    public static String getVistaDatePattern() {
        return "yyyyMMdd";
    }

    public static String getDateTimePattern() {
        return DateUtil.getDatePattern() + getTimePattern();
    }

    public static String getTimePattern() {
        return " HH:mm";
    }

    /**
     * This method attempts to convert an Oracle-formatted date
     * in the form dd-MMM-yyyy to mm/dd/yyyy.
     *
     * @param aDate date from database as a string
     * @return formatted string for the ui
     */
    public static String getDate(Date aDate) {
        SimpleDateFormat df;
        String returnValue = "";

        if (aDate != null) {
            df = new SimpleDateFormat(getDatePattern());
            returnValue = df.format(aDate);
        }

        return (returnValue);
    }

    /**
     * This method generates a string representation of a date/time
     * in the format you specify on input
     *
     * @param aMask the date pattern the string is in
     * @param strDate a string representation of a date
     * @return a converted Date object
     * @see java.text.SimpleDateFormat
     * @throws ParseException when String doesn't match the expected format
     */
    public static Date convertStringToDate(String aMask, String strDate)
      throws ParseException {
        SimpleDateFormat df;
        Date date;
        df = new SimpleDateFormat(aMask);

        if (log.isDebugEnabled()) {
            log.debug("converting '" + strDate + "' to date with mask '" + aMask + "'");
        }

        try {
            date = df.parse(strDate);
        } catch (ParseException pe) {
            //log.error("ParseException: " + pe);
            throw new ParseException(pe.getMessage(), pe.getErrorOffset());
        }

        return (date);
    }

    /**
     * This method returns the current date time in the format:
     * MM/dd/yyyy HH:MM a
     *
     * @param theTime the current time
     * @return the current date/time
     */
    public static String getTimeNow(Date theTime) {
        return getDateTime(TIME_PATTERN, theTime);
    }

    /**
     * This method returns the current date in the format: MM/dd/yyyy
     * 
     * @return the current date
     * @throws ParseException when String doesn't match the expected format
     */
    public static Calendar getToday() {
        Date today = new Date();
        if (null != currentOverride) {
        	today = currentOverride;
        }
        SimpleDateFormat df = new SimpleDateFormat(getDatePattern());

        // This seems like quite a hack (date -> string -> date),
        // but it works ;-)
        String todayAsString = df.format(today);
        Calendar cal = new GregorianCalendar();
        try {
			cal.setTime(convertStringToDate(todayAsString));
		} catch (ParseException pe) {
			log.error("Can not parse date using: "+getDatePattern(), pe);
		}

        return cal;
    }

    /**
     * This method generates a string representation of a date's date/time
     * in the format you specify on input
     *
     * @param aMask the date pattern the string is in
     * @param aDate a date object
     * @return a formatted string representation of the date
     * 
     * @see java.text.SimpleDateFormat
     */
    public static String getDateTime(String aMask, Date aDate) {
        SimpleDateFormat df = null;
        String returnValue = "";

        if (aDate == null) {
            log.error("aDate is null!");
        } else {
            df = new SimpleDateFormat(aMask);
            returnValue = df.format(aDate);
        }

        return (returnValue);
    }

    /**
     * This method generates a string representation of a date's date/time
     * in the standard format
     *
     * @param aDate a date object
     * @return a formatted string representation of the date
     * 
     * @see java.text.SimpleDateFormat
     */
    public static String getDateTime(Date aDate) {
         return getDateTime(getDateTimePattern(), aDate);
    }

    /**
     * This method generates a string representation of a date based
     * on the System Property 'dateFormat'
     * in the format you specify on input
     * 
     * @param aDate A date to convert
     * @return a string representation of the date
     */
    public static String convertDateToString(Date aDate) {
        return getDateTime(getDatePattern(), aDate);
    }

    /**
     * This method generates a string representation of a date based
     * on the format 'HH:mm'
     * 
     * @param aDate A date to convert
     * @return a string representation of the time portion
     */
    public static String convertTimeToString(Date aDate) {
        return getDateTime(getTimePattern(), aDate);
    }
    
    public static String convertDateToVistaString(Date aDate) {
        return getDateTime(getVistaDatePattern(), aDate);
    }

    /**
     * This method converts a String to a date using the datePattern
     * 
     * @param strDate the date to convert (in format MM/dd/yyyy)
     * @return a date object
     * @throws ParseException when String doesn't match the expected format
     */
    public static Date convertStringToDate(String strDate)
      throws ParseException {
        Date aDate = null;

        try {
            if (log.isDebugEnabled()) {
                log.debug("converting date with pattern: " + getDatePattern());
            }

            aDate = convertStringToDate(getDatePattern(), strDate);
        } catch (ParseException pe) {
            log.error("Could not convert '" + strDate + "' to a date, throwing exception");
            pe.printStackTrace();
            throw new ParseException(pe.getMessage(),
                                     pe.getErrorOffset());
        }

        return aDate;
    }
    
    /**
     * Used to check if a date is within a given range
     * 
     * @param check is the date to check
     * @param from is the beginning range of the Date/Time
     * @param to is the ending range of the Date/Time
     * @return
     */
    public static boolean isBetween(Date check, Date from, Date to) {
    	if (bypassTodayCheck) return true;
    	
    	if (null == check || null == from || null == to)
    		return false;
    	
    	Calendar start = new GregorianCalendar();
    	start.setTime(from);
    	start.set(Calendar.HOUR, 0);
    	start.set(Calendar.MINUTE, 0);
    	start.set(Calendar.SECOND, 0);
    	start.set(Calendar.MILLISECOND, 0);
    	start.add(Calendar.SECOND, -1);
    	Calendar end = new GregorianCalendar();
    	end.setTime(to);
    	end.set(Calendar.HOUR, 23);
    	end.set(Calendar.MINUTE, 59);
    	end.set(Calendar.SECOND, 59);
    	end.set(Calendar.MILLISECOND, 999);
    	end.add(Calendar.MILLISECOND, 1);
    	Calendar checkCal = new GregorianCalendar();
    	checkCal.setTime(check);
    	checkCal.set(Calendar.HOUR, 12);
    	return start.before(checkCal) && end.after(checkCal);
    }
    
    /**
     * Convenience method for determining whether two dates match
     * @param check
     * @param target
     * @return
     */
    public static boolean isOn(Date check, Date target) {
    	if (bypassTodayCheck) return true;
    	
    	Calendar checkCal = new GregorianCalendar();
    	checkCal.setTime(check);
    	
    	Calendar targetCal = new GregorianCalendar();
    	targetCal.setTime(target);
    	
    	return checkCal.get(Calendar.MONTH) == targetCal.get(Calendar.MONTH) &&
    		checkCal.get(Calendar.DATE) == targetCal.get(Calendar.DATE) &&
    		checkCal.get(Calendar.YEAR) == targetCal.get(Calendar.YEAR);
    }
    
    /**
     * Convenience method to add specified number of days to the given date
     * @param date the starting date
     * @param days the number of days to increment (may be negative)
     * @return the computed date
     */
    public static Date dateAdd(Date date, int days) {
    	Calendar cal = new GregorianCalendar();
    	cal.setTime(date);
    	cal.add(Calendar.DAY_OF_MONTH, days);
    	return cal.getTime();
    }
    
    /**
     * Determine if the date provided is today.  Note that this may be overridden to
     * enable dumping all orders for examination.
     * 
     * @param aDate the date to check
     * 
     * @return true if aDate is today
     */
    public static boolean isToday(Date aDate) {
    	if (bypassTodayCheck) return true;
    	
    	return isOn(getToday().getTime(), aDate);
    }

	public static void setCurrentOverride(Date currentOverride) {
		DateUtil.currentOverride = currentOverride;
	}

	public static Date getCurrentOverride() {
		return currentOverride;
	}

	public static void setBypassTodayCheck(boolean bypassTodayCheck) {
		DateUtil.bypassTodayCheck = bypassTodayCheck;
	}

	public static boolean isBypassTodayCheck() {
		return bypassTodayCheck;
	}
}
