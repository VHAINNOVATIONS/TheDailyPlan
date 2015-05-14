package gov.med.va.innovations.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Essentially just a shorthand HashMap<String,Object>
 */
public class ParamMap extends HashMap<String,Object> {
	
	private static final long serialVersionUID=-1931453742284423321L;

	/**
	 * Assembles a ParamMap quickly using an array of alternating keys and values
	 * @param mappings a varargs array in the form ("key1", value1, "key2", value2 ...)
	 * @throws IllegalArgumentException if mappings contains an odd number of keys
	 * @throws ClassCastException if an element expected to be a key was not of type java.lang.String
	 */
	public ParamMap(Object... mappings) {
		//twice the amount of space we need, just in case we want to add entries afterwards
		super(mappings.length);
		
		if(mappings.length % 2 > 0) {
			throw new IllegalArgumentException("key count does not match value count");
		}
		
		for(int i = 0; i < mappings.length; i += 2) {
			put((String)mappings[i], mappings[i+1]);
		}
	}
	
	public static ParamMap getMappings(String parameters) {
		String[] nvPairs = new String[0];
		if (null != parameters) {
			nvPairs = parameters.split(",");
		}
		List<Object> mappings = new ArrayList<Object>(nvPairs.length);
		for(String nvPair:nvPairs) {
			String[] nv = nvPair.split("=");
			mappings.add(nv[0]);
			mappings.add(nv[1]);
		}
		
		return new ParamMap(mappings.toArray());
	}
}
