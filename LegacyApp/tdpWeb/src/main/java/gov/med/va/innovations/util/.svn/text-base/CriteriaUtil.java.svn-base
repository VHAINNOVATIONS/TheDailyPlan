package gov.med.va.innovations.util;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class CriteriaUtil {
	private static final String CRIT_DELIMITER = ";";
	private static final String TYPE_DELIMITER = ":";
	private static final String LIST_DELIMITER = "\\^";
	private static final Pattern datePattern = Pattern.compile("^[tT]{1}?[+-]?(\\d+)*(\\D)*");


	public enum Type {Date,List};
	public enum Value {fromDate,toDate,reportList};

	public static Map<String,Object> parseCriteriaString(String criteria) {
		Map<String, Object> critMap = new HashMap<String,Object>();
		for (String crit : criteria.split(CRIT_DELIMITER)) {
			String[] critComps = crit.split(TYPE_DELIMITER);
			if (critComps.length < 3) {
				throw new IllegalArgumentException("Invalid criteria length.  Must consist of TYPE:VALUE:CRITERIA");
			}
			@SuppressWarnings("unused") // Sanity Check
			Value value = Value.valueOf(critComps[1]);
			switch (Type.valueOf(critComps[0])) {
			case Date:
				try {
					critMap.put(critComps[1], normalizeDate(critComps[2]));
				} catch (ParseException e) {
					throw new IllegalArgumentException("Bad Date Format. " + e.getMessage());
				}
				break;
			case List:
				List<String> reports = new ArrayList<String>();
				for(String report:critComps[2].split(LIST_DELIMITER)) {
					String[] reportItems = report.split("=");
					if (reportItems[1].substring(0,1).equalsIgnoreCase("y") || reportItems[1].substring(0,1).equals("1"))
						reports.add(reportItems[0]);
				}
				critMap.put(critComps[1],reports);
				break;
			default:
				throw new IllegalArgumentException("Unknown Criteria Type: "+critComps[0]);
			}
		}
		
		return critMap;		
	}
	
	private static Object normalizeDate(String date) throws ParseException {
		if (date.indexOf('T') > -1 || date.indexOf('t') > -1) {
			Calendar cal = DateUtil.getToday();
			int unit, amount=0;
			Matcher amtMatch = datePattern.matcher(date);
			if (amtMatch.find() && amtMatch.groupCount() > 1)
				amount = Integer.parseInt(null == amtMatch.group(1)?"0":amtMatch.group(1));
			if (date.indexOf('Y') > -1 || date.indexOf('y') > -1)
				unit = Calendar.YEAR;
			else if (date.indexOf('M') > -1 || date.indexOf('m') > -1)
				unit = Calendar.MONTH;
			else if (date.indexOf('D') > -1 || date.indexOf('d') > -1)
				unit = Calendar.DATE;
			else
				unit = Calendar.DATE;
			if (date.indexOf('-')>-1)
				amount *= -1;

			cal.add(unit, amount);
			
			return cal.getTime();
		}
		else
			return DateUtil.convertStringToDate(date);
	}

	/**
	 * Pulls the key portion of the criteria so that it maintains it's order, and can be used to 
	 * process a criteria Map
	 * 
	 * @param criteria the criteria string used to store the criteria
	 * @return a list of properly ordered strings used as keys for a criteria Map
	 */
	public static List<String> parseCriteriaToKeys(String criteria) {
		List<String> critList = new ArrayList<String>();
		for (String crit : criteria.split(CRIT_DELIMITER)) {
			String[] critComps = crit.split(TYPE_DELIMITER);
			critList.add(critComps[1]);
		}
		
		return critList;
	}
	
	@SuppressWarnings("unchecked")
	public static String createCriteriaString(Map<String,Object> critMap) {
		StringBuffer buf = new StringBuffer();
		for (String key : critMap.keySet()) {
			if (buf.length() > 0)
				buf.append(CRIT_DELIMITER);
			
			switch(Value.valueOf(key)) {
			case fromDate:
				buf.append(Type.Date.name()).append(TYPE_DELIMITER).append(Value.fromDate.name()).append(TYPE_DELIMITER).append(DateUtil.convertDateToString((Date) critMap.get(key)));
				break;
			case toDate:
				buf.append(Type.Date.name()).append(TYPE_DELIMITER).append(Value.toDate.name()).append(TYPE_DELIMITER).append(DateUtil.convertDateToString((Date) critMap.get(key)));
				break;
			case reportList:
				buf.append(Type.List.name()).append(TYPE_DELIMITER).append(Value.reportList.name()).append(TYPE_DELIMITER);
				for (String ent:(List<String>)critMap.get(key)) {
					buf.append(ent).append("=Y").append("^");
				}
				buf.deleteCharAt(buf.length()-1);
				break;
			default:
			}
			
		}
		
		return buf.toString();
	}

}
