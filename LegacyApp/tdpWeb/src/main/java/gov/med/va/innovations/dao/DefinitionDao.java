package gov.med.va.innovations.dao;

import java.util.List;

import gov.med.va.innovations.domain.Definition;
import gov.med.va.innovations.domain.DefinitionStatus;

public interface DefinitionDao extends UniversalDao  {
	public List<Definition> findByAbbreviation(String abbrev);
	
	public List<Definition> findByStatus(DefinitionStatus status);
}
