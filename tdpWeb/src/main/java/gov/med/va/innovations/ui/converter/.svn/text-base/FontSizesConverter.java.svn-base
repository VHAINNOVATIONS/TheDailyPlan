package gov.med.va.innovations.ui.converter;

import gov.med.va.innovations.domain.FontSizes;

import java.util.Map;

import org.apache.struts2.util.StrutsTypeConverter;

public class FontSizesConverter extends StrutsTypeConverter {

	@Override
	public Object convertFromString(Map context, String[] values, Class toClass) {
		return FontSizes.getSearchTabs(values[0]);
	}

	@Override
	public String convertToString(Map context, Object o) {
		return ((FontSizes)o).getDisplay();
	}

}
