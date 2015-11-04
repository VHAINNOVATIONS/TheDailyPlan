package gov.med.va.innovations.domain;

import java.util.List;

import junit.framework.TestCase;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class VistaImmunizationTest extends TestCase {
    //~ Instance fields ========================================================

    @SuppressWarnings("unused")
	private final Log log = LogFactory.getLog(VistaImmunizationTest.class);

    //~ Constructors ===========================================================

    public VistaImmunizationTest(String name) {
        super(name);
    }

    public void testParseImmunization() throws Exception {
    	List<VistaImmunization> report = VistaImmunization.parseTextBlob(blob);
    	assertTrue(report.size() == 6);
    	for(VistaImmunization shot : report) {
	    	assertNotNull(shot);
	    	assertNotNull(shot.getDateStr());
	    	assertNotNull(shot.getFacility());
	    	assertNotNull(shot.getImmunization());
	    	assertNotNull(shot.getReaction());
	    	if (null != shot.getComments())
	    		assertTrue(!"".equals(shot.getComments()));
    	}

    }

    private String blob = new StringBuilder("Printed for data from 01/10/2010 to 01/10/2011                 01/10/2011 11:00\n")
	.append("***********************  CONFIDENTIAL  SUMMARY   pg. 1 ************************\n")
	.append("ABCDEFG,FRANCIS R JR    666-00-1584                             DOB: 06/09/1924\n")
	.append("\n")
	.append("----------------------------- IM - Immunizations -----------------------------\n")
	.append("\n")
	.append("Immunization    Series Date        Facility     Reaction\n")
	.append("\n")
	.append("FLU                    11/30/2010  ANN ARBOR *\n")
	.append("     Comments: UT3666AA \n")
	.append("FLU H1N1               12/01/2009  ANN ARBOR *\n")
	.append("     Comments: Novartis \n")
	.append("HEPA/HEPB AD           01/10/2011  TOLEDO CBO*\n")
	.append("                1      12/10/2010  TOLEDO CBO*\n")
	.append("INFLUENZA              12/01/2009  ANN ARBOR *\n")
	.append("     Comments: 98435P1 \n")
	.append("PNEUMO-VAC             01/05/2007  TOLEDO CBO*\n")
	.append("     Comments: 0958f \n")
	.append("     \n")
	.append("*** END ***************  CONFIDENTIAL  SUMMARY   pg. 1 ***********************\n")
	.append("\n")
	.append("\n")
	.append("\n").toString();
}
