package gov.med.va.innovations.dao.ibatis.handler;

import gov.med.va.innovations.domain.DefinitionStatus;

public class DefinitionStatusTypeHandler extends EnumTypeHandler<DefinitionStatus>
 {

	public DefinitionStatusTypeHandler() {
		super(DefinitionStatus.class);
	}

	@Override
	public Object valueOf(String s) {
		
		if(null == s || s.equals(""))
			return DefinitionStatus.COMMON;
		
		return DefinitionStatus.getDefinitionStatus(s);		
	}

}
