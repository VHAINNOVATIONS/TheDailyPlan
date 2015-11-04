package gov.med.va.innovations.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;

import junit.framework.TestCase;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class CriteriaUtilTest extends TestCase {
    //~ Instance fields ========================================================

    @SuppressWarnings("unused")
	private final Log log = LogFactory.getLog(CriteriaUtilTest.class);

    //~ Constructors ===========================================================

    public CriteriaUtilTest(String name) {
        super(name);
    }

    @SuppressWarnings("unchecked")
	public void testMarshalUnmarshal() throws Exception {
    	String criteriaStr = "Date:fromDate:01/01/1999;Date:toDate:12/12/2010;List:reportList:A=Y^B=Y^C=Y^D=N";
    	Map<String,Object> criteria = CriteriaUtil.parseCriteriaString(criteriaStr);
    	assertNotNull(criteria);
    	assertTrue(criteria.size() == 3);
    	List<String> reports = (List<String>) criteria.get("reportList");
    	assertTrue(reports.size() == 3);
    	reports.add("D");
    	
    	String critStr2 = CriteriaUtil.createCriteriaString(criteria);
    	assertTrue(critStr2.substring(0,critStr2.length()-1).equals(criteriaStr.substring(0,criteriaStr.length()-1)));
    }
    
    public void testDateHandler() throws Exception {
    	DateFormat df = new SimpleDateFormat("yyyyMMdd");
    	String criteriaStr = "Date:fromDate:T";
    	Map<String,Object> criteria = CriteriaUtil.parseCriteriaString(criteriaStr);
    	assertNotNull(criteria);
    	assertEquals(df.format(criteria.get("fromDate")),df.format(new Date()));
    	
    	Calendar cal = new GregorianCalendar();
    	criteriaStr = "Date:fromDate:T-10d";
    	criteria = CriteriaUtil.parseCriteriaString(criteriaStr);
    	assertNotNull(criteria);
    	cal.add(Calendar.DATE, -10);
    	assertEquals(df.format(criteria.get("fromDate")),df.format(cal.getTime()));
    	
    	cal = new GregorianCalendar();
    	criteriaStr = "Date:fromDate:T+1M";
    	criteria = CriteriaUtil.parseCriteriaString(criteriaStr);
    	assertNotNull(criteria);
    	cal.add(Calendar.MONTH, 1);
    	assertEquals(df.format(criteria.get("fromDate")),df.format(cal.getTime()));
    	
    	cal = new GregorianCalendar();
    	criteriaStr = "Date:fromDate:T-2Y";
    	criteria = CriteriaUtil.parseCriteriaString(criteriaStr);
    	assertNotNull(criteria);
    	cal.add(Calendar.YEAR, -2);
    	assertEquals(df.format(criteria.get("fromDate")),df.format(cal.getTime()));

    }
}
