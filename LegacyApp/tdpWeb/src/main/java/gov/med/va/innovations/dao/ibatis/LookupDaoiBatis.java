package gov.med.va.innovations.dao.ibatis;

import gov.med.va.innovations.dao.LookupDao;
import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.Role;

import java.util.List;


/**
 * iBatis implementation of LookupDao.
 *
 * @author <a href="mailto:matt@raibledesigns.com">Matt Raible</a>
 */
public class LookupDaoiBatis extends UniversalDaoiBatis implements LookupDao {

    /**
     * {@inheritDoc}
     */
    @SuppressWarnings("unchecked")
    public List<Role> getRoles() {
        log.debug("Retrieving all role names...");

        return getSqlMapClientTemplate().queryForList("getRoles", null);
    }

	@SuppressWarnings("unchecked")
	@Override
	public List<Component> getComponents() {
        log.debug("Retrieving all component names...");

        return getSqlMapClientTemplate().queryForList("getComponentBeans", null);
	}
}
