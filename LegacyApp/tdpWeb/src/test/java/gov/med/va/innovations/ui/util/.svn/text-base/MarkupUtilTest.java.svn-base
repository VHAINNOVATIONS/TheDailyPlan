package gov.med.va.innovations.ui.util;

import junit.framework.TestCase;

public class MarkupUtilTest extends TestCase {


    public void testGenMarkup() throws Exception {
    	try {
        	MarkupUtil.genTag("span", "definition", new String[]{"test"}, new String[]{});
        	fail("Unmatched attributes not caught");
    	}
    	catch (IllegalArgumentException ie) {}
    	String tag = MarkupUtil.genTag("span", "definition", new String[]{"expansion1", "exp2"}, new String[]{"Exp 1","exp 2"});
    	assertTrue(tag.length() > 0);
    	assertTrue(tag.indexOf("<span") > -1);
    	assertTrue(tag.indexOf("</span>") > -1);
    	assertTrue(tag.indexOf(">definition</") > -1);
    	assertTrue(tag.indexOf("<span expansion1=") > -1);
    	assertTrue(tag.indexOf("expansion1=\"Exp 1\"") > -1);
    	assertTrue(tag.indexOf("exp2=\"exp 2\"") > -1);
    }
}
