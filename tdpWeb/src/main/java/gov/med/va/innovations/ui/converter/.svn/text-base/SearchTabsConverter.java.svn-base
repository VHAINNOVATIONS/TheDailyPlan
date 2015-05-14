package gov.med.va.innovations.ui.converter;

import gov.med.va.innovations.domain.SearchTabs;

import java.util.Map;

import org.apache.struts2.util.StrutsTypeConverter;

public class SearchTabsConverter extends StrutsTypeConverter {

	@Override
	public Object convertFromString(Map context, String[] values, Class toClass) {
		return SearchTabs.getSearchTabs(values[0]);
	}

	@Override
	public String convertToString(Map context, Object o) {
		return ((SearchTabs)o).getDisplay();
	}

}
