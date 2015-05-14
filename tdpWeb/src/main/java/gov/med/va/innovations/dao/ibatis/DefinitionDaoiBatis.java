package gov.med.va.innovations.dao.ibatis;

import gov.med.va.innovations.dao.DefinitionDao;
import gov.med.va.innovations.domain.Definition;
import gov.med.va.innovations.domain.DefinitionStatus;

import java.util.List;

public class DefinitionDaoiBatis extends UniversalDaoiBatis implements
		DefinitionDao {


	@SuppressWarnings("unchecked")
	@Override
	public List<Definition> findByAbbreviation(String abbrev) {
        return  (List<Definition>) getSqlMapClientTemplate().queryForList("findByAbbreviation", abbrev);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Definition> findByStatus(DefinitionStatus status) {
        return  (List<Definition>) getSqlMapClientTemplate().queryForList("findByStatus", status);
	}
	
	@Override
	public Object save(final Object object) {
		Definition definition = (Definition) object;
		// Is it logically deleted?
		Definition def = (Definition) getSqlMapClientTemplate().queryForObject("getDeletedDefinition", definition.getAbbreviation());
		if (null != def) {
			definition.setId(def.getId());
		}
		
		return (Definition) super.save(definition);
	}

}
