package gov.med.va.innovations.domain;

import java.util.List;

import junit.framework.TestCase;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class VistaClinicalWarningTest extends TestCase {
    //~ Instance fields ========================================================

    @SuppressWarnings("unused")
	private final Log log = LogFactory.getLog(VistaClinicalWarningTest.class);

    //~ Constructors ===========================================================

    public VistaClinicalWarningTest(String name) {
        super(name);
    }

    public void testParseClinicalWarning() throws Exception {
    	List<VistaClinicalWarning> report = VistaClinicalWarning.parseTextBlob(blob);
    	assertTrue(report.size() == 3);
    	for(VistaClinicalWarning warning : report) {
	    	assertNotNull(warning);
	    	assertNotNull(warning.getLocalTitle());
	    	assertNotNull(warning.getSignedBy());
	    	assertNotNull(warning.getStandardTitle());
	    	assertTrue(!"".equals(warning.getText()));
    	}

    }

    private String blob = new StringBuilder("Printed for data from 02/12/1874 to 01/05/2011                 01/05/2011 13:58\n")
    		.append("***********************  CONFIDENTIAL  SUMMARY   pg. 1 ************************\n")
	.append("LMNOPQ,STANLEY ABCDEFG JR    000-00-0532                        DOB: 12/25/1946\n")
	.append("                                        \n")
	.append("\n")
	.append("--------------------------- CW - Clinical Warnings ---------------------------\n")
	.append("                                  \n")
	.append("10/16/2008 16:25  Local Title: CLINICAL WARNING\n")
	.append("               Standard Title: CLINICAL WARNING\n")
   .append("\n")
   .append("MRSA Positive\n")
   .append("\n")
	.append("\n")
	.append("               Signed by:  /es/  JACOB P XYZZ RN\n")
   .append("                           Registered Nurse\n")
   .append("                           10/16/2008 16:26\n")
   .append("\n")
   .append("                                 Digital Pager:  670-3135\n")
     .append("\n")
     .append("05/30/2007 12:58  Local Title: RESEARCH STUDY ENROLLMENT \n")
     .append("               Standard Title: RESEARCH INITIAL EVALUATION NOTE\n")
   .append("\n")
   .append("Name of VA Principal Investigator: Dr. John MNOPQR\n")
   .append("      Phone Number & Pager Number: 734 769-7100 x6233\n")
      .append("\n")
      .append("\n")
      .append("Name of Study Coordinator: Dana ABCDEFGH\n")
	.append("\n")
	.append("\n")
	.append("Phone Number & Pager Number: 734 769-7100 x0000\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("Title of Research Study:\n") 
	.append("Effective Care Management of Depressed Diabetes Patients: \"The Positive\n") 
	.append("Steps Study\" (Consent for Long-Term Management)\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("Date of Subject Enrollment: Mar 1,2007\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("Date Participation Completed: Mar 1, 2008\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("               Signed by:  /es/  KATHY WERTYUIO\n")
   .append("                           Research Assistant\n")
   .append("                           05/30/2007 12:59\n")
   .append("\n")
   .append("05/30/2007 12:57  Local Title: RESEARCH STUDY ENROLLMENT\n") 
   .append("               Standard Title: RESEARCH INITIAL EVALUATION NOTE\n")
    .append("\n")
    .append("Name of VA Principal Investigator: Dr. John MNOPQR\n")
    .append("      Phone Number & Pager Number: 734 769-7100 x0000\n")
    .append(" \n")
    .append("\n")
    .append("Name of Study Coordinator: Dana ABCDEFGH\n")
    .append("\n")
	.append("\n")
	.append("Phone Number & Pager Number: 734 769-7100 x0000\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("Title of Research Study:\n") 
	.append("Effective Care Management of Depressed Diabetes Patients: \"The Positive\n") 
	.append("Steps Study\" (Consent for Screening Survey)\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("Date of Subject Enrollment: Mar 1,2007\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("Date Participation Completed: Mar 1, 2008\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("\n")
	.append("               Signed by:  /es/  KATHY WERTYUIO\n")
    .append("                           Research Assistant\n")
    .append("                           05/30/2007 12:58\n")
    .append("\n")
    .append("\n")
	.append("*** END ***************  CONFIDENTIAL  SUMMARY   pg. 1 ***********************\n")
	.append("\n")
	.append("\n")
	.append("\n")
    .toString();
}
