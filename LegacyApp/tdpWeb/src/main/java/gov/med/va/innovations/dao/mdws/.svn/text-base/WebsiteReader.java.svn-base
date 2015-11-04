package gov.med.va.innovations.dao.mdws;
import gov.med.va.innovations.domain.Definition;
import gov.med.va.innovations.domain.DefinitionStatus;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.text.MutableAttributeSet;
import javax.swing.text.html.HTML.Attribute;
import javax.swing.text.html.HTML.Tag;
import javax.swing.text.html.HTMLEditorKit.ParserCallback;
import javax.swing.text.html.parser.ParserDelegator;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Used to look up common dictionary terms from Merriam Webster's online medical dictionary
 * @author mark
 *
 */
public class WebsiteReader {
  
  private static final Log LOG = LogFactory.getLog(WebsiteReader.class);
  private static final String COMMON_TERMS_URL = "http://www.nlm.nih.gov/medlineplus/appendixb.html";
  private static final String SPECIFIC_TERM_URL = "http://www.merriam-webster.com/medlineplus/";
  private Map<String,Definition> DEFS = Collections.synchronizedMap(new HashMap<String, Definition>());
  
  public static Map<String,List<String>> extractCommonDefs(String overrideUrl) throws IOException {
    final Map<String,List<String>> dict = new HashMap<String,List<String>>();
    final String TRIGGER = "ABG";
    
    if (null == overrideUrl) {
    	overrideUrl = COMMON_TERMS_URL;
    }
    
    ParserDelegator parserDelegator = new ParserDelegator();
    ParserCallback parserCallback = new ParserCallback() {
    	private boolean isTag = false;
    	private boolean isNewRow = false;
    	private boolean isToKeep = false;
    	private boolean doneDeal = false;
    	private String key;
      public void handleText(final char[] data, final int pos) {
    	  if (doneDeal)
    		  return;
    	  
    	  if (isTag) {
    		  if (isNewRow) {
    			  key = new String(data);
    			  dict.put(key, new ArrayList<String>());
    			  if (TRIGGER.equals(key)) {
    				  isToKeep = true;
    			  }
    			  isNewRow = false;
    		  }
    		  else {
   				  LOG.info("Adding: "+key+": "+new String(data));
    			  dict.get(key).add(new String(data));
    		  }
    	  }
      }
      public void handleStartTag(Tag tag, MutableAttributeSet attribute, int pos) {
    	  if (tag == Tag.TR) {
    		  isNewRow = true;
    	  }
        if (tag == Tag.TD) {
        	isTag = true;
        }
      }
      public void handleEndTag(Tag t, final int pos) { 
    	  if (t == Tag.TD) {
    		  isTag = false;
    	  }
    	  if (t == Tag.TABLE) {
    		  if (isToKeep)
    			  doneDeal = true;
    		  else
    			  dict.clear();
    	  }
      }
      public void handleSimpleTag(Tag t, MutableAttributeSet a, final int pos) { }
      public void handleComment(final char[] data, final int pos) { }
      public void handleError(final java.lang.String errMsg, final int pos) { }
    };
    
    Reader reader = new InputStreamReader(new URL(overrideUrl).openStream());
    parserDelegator.parse(reader, parserCallback, true);
    return dict;
  }
  
  public List<Definition> lookupTerm(String term) throws IOException {
	final List<Definition> defs = new ArrayList<Definition>();
	final StringBuffer buf = new StringBuffer();
	
	buf.replace(0, buf.length(), term);
	
	ParserDelegator parserDelegator = new ParserDelegator();
	ParserCallback parserCallback = new ParserCallback() {
		boolean found = false;
		boolean multiple = false;
		StringBuffer definition;
	      public void handleText(final char[] data, final int pos) { 
	    	  if (found && data.length > 0) {
	    		  definition.append(new String(data));
	    	  }
	      }
	      public void handleStartTag(Tag tag, MutableAttributeSet attribute, int pos) {
	    	  if (tag == Tag.DIV && attribute.containsAttribute(Attribute.CLASS, "d")) {
	    		  definition = new StringBuffer();
	    		  found = true;
	    	  }
	    	  else if (tag == Tag.OL && attribute.containsAttribute(Attribute.CLASS, "results")) {
	    		  multiple = true;
	    	  }
	    	  else if (tag == Tag.SPAN && attribute.containsAttribute(Attribute.CLASS, "vi")) {
	    		  definition.append("; ");
	    	  }
	    	  
	    	  if (multiple && tag == Tag.A) {
	    		  String link = (String)attribute.getAttribute(Attribute.HREF);
	    		  link = link.substring(link.lastIndexOf('/')+1);
	    		  if (!DEFS.containsKey(link)) {
	    			  try {
	    				LOG.info("Multiple Definition is: "+link);
	    				DEFS.put(link, new Definition());
						defs.addAll(lookupTerm(link));
						updateDefs(defs);
	    			  } catch (IndexOutOfBoundsException oob) {
	    				  // None found - Ignore  
	    			  } catch (IOException ioe) {
						LOG.error("Problem looking up term "+link, ioe);
					  }
	    		  }
	    	  }
	      }

	      
	      public void handleEndTag(Tag t, final int pos) { 
	    	  if (multiple && t== Tag.OL) {
	    		  multiple = false;
	    	  }
	    	  if (found && t == Tag.DIV) {
	    		  defs.add(new Definition(buf.toString(), definition.toString(), DefinitionStatus.MEDLINEPLUS));
	    		  found = false;
	    	  }
	      }
	      public void handleSimpleTag(Tag t, MutableAttributeSet a, final int pos) {
	    	  if (found && t == Tag.BR) {
	    		  defs.add(new Definition(buf.toString(), definition.toString(), DefinitionStatus.MEDLINEPLUS));
	    		  definition = new StringBuffer();
	    	  }
	      }
	      public void handleComment(final char[] data, final int pos) { }
	      public void handleError(final java.lang.String errMsg, final int pos) { }
	      
		      
			private void updateDefs(List<Definition> defs) {
				for (Definition def:defs) {
					DEFS.put(def.getAbbreviation(), def);
				}
		      }
	};
	
    Reader reader = new InputStreamReader(new URL(SPECIFIC_TERM_URL + URLEncoder.encode(term, "UTF-8")).openStream(),"UTF-8");
    parserDelegator.parse(reader, parserCallback, true);
    return uniqueDefinition(defs);
  }
  
  private List<Definition> uniqueDefinition(
			List<Definition> defs) {
		List<Definition> unique = new ArrayList<Definition>();
		Map<String,Object> defMap = new HashMap<String,Object>();
		
		for (Definition newDef:defs) {
			if (!defMap.containsKey(newDef.getDefinition())) {
				defMap.put(newDef.getDefinition(), newDef);
				unique.add(newDef);
				if (LOG.isDebugEnabled()) LOG.debug(newDef.getAbbreviation()+"-"+newDef.getDefinition());
			}
		}
		return unique;
	}
 
  public final static void main(String[] args) throws Exception{
	  if (args.length == 0) {
		    Map<String,List<String>> defs = WebsiteReader.extractCommonDefs(null);
		    String [] keys = defs.keySet().toArray(new String[0]);
		    Arrays.sort(keys);
		    for (String def : keys) {
		      System.out.println(def + ": "+defs.get(def).get(0));
		    }
		    args = new String[]{"TID", "RXUD", "MD", "AA"};
	  }
    
	System.out.println("\nLooking up some specific terms\n-----------------------------");
	WebsiteReader reader = new WebsiteReader();
	for(String term: args) {
		System.out.print(term + ": ");
		for (Definition def: reader.lookupTerm(term)) {
			System.out.println(def.getAbbreviation() + ": " + def.getDefinition());
		}
	}
  }
}

