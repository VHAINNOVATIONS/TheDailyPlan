package gov.med.va.innovations.ui.converter;

import gov.med.va.innovations.domain.DefinitionStatus;

import java.util.Map;

import org.apache.struts2.util.StrutsTypeConverter;

public class DefinitionStatusConverter extends StrutsTypeConverter {

	@Override
	public Object convertFromString(Map context, String[] values, Class toClass) {
		return DefinitionStatus.getDefinitionStatus(values[0]);
	}

	@Override
	public String convertToString(Map context, Object o) {
		return ((DefinitionStatus)o).getDisplayName();
	}

}
