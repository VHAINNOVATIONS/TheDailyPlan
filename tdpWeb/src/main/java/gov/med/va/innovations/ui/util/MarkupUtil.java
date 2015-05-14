package gov.med.va.innovations.ui.util;

public class MarkupUtil {

	/**
	 * Generate a XHTML tag using the provided parameters
	 * 
	 * @param tagElement is the name of the tag to generate (span, div, a, etc)
	 * @param content is the content wrapped by the tag
	 * @param attributes a list of attributes to be inserted into the tag
	 * @param attributeValues the associated values to be matched with each attribute
	 * @throws IllegalArgumentException if the length of attributes and attribute values don't match
	 * 
	 * @return the generated tag
	 */
	public static String genTag(String tagElement, String content, String[] attributes, String[] attributeValues) {
		if (null != attributes && null != attributeValues 
				&& attributes.length != attributeValues.length) 
			throw new IllegalArgumentException("Attributes must match Attribute Value List");
		
		String attag = "@tag@";
		String atcontent = "@content@";
		
		StringBuffer buf = new StringBuffer("<@tag@>@content@</@tag@>");
		int offset = 6;
		for(int i=0; i<attributes.length; i++) {
			String att = " " + attributes[i] + "=\"" + attributeValues[i] + "\"";
			buf.insert(offset, att);
			offset += att.length();
		}
		int start = buf.indexOf(attag);
		int end = start + attag.length();
		buf.replace(start, end, tagElement);
		start = buf.indexOf(atcontent);
		end = start + atcontent.length();
		buf.replace(start, end, content);
		start = buf.indexOf(attag);
		end = start + attag.length();
		buf.replace(start, end, tagElement);
		
		return buf.toString();
	}
	
	/**
	 * Prepare the text for insertion into XHTML markup
	 * @param string is the text to parse and prepare 
	 * @return text suitable for insertion into XHTML
	 */
	public static String stringToHTMLString(String string) {
	    StringBuffer sb = new StringBuffer(string.length());
	    // true if last char was blank
	    boolean lastWasBlankChar = false;
	    int len = string.length();
	    char c;

	    for (int i = 0; i < len; i++)
	        {
	        c = string.charAt(i);
	        if (c == ' ') {
	            // blank gets extra work,
	            // this solves the problem you get if you replace all
	            // blanks with &nbsp;, if you do that you loss 
	            // word breaking
	            if (lastWasBlankChar) {
	                lastWasBlankChar = false;
	                sb.append("&#160;");
	                }
	            else {
	                lastWasBlankChar = true;
	                sb.append(' ');
	                }
	            }
	        else {
	            lastWasBlankChar = false;
	            //
	            // HTML Special Chars
	            if (c == '&' && !string.substring(i).startsWith("&amp;"))
	                sb.append("&amp;");
	            else if (c == '\'')
	            	sb.append("&#39;");
	            else if (c == '"')
	                sb.append("&#34;");
	            else if (c == '<')
	                sb.append("&#60;");
	            else if (c == '>')
	                sb.append("&#62;");
//	            else if (c == '\n')
//	                // Handle Newline
//	                sb.append("&lt;br/&gt;");
	            else {
	                int ci = 0xffff & c;
	                if (ci < 160 )
	                    // nothing special only 7 Bit
	                    sb.append(c);
	                else {
	                    // Not 7 Bit use the unicode system
	                    sb.append("&#");
	                    sb.append(new Integer(ci).toString());
	                    sb.append(';');
	                    }
	                }
	            }
	        }
	    return sb.toString();
	}
}
