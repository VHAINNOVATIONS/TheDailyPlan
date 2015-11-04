package gov.med.va.innovations.dao.ibatis;

import gov.med.va.innovations.dao.UniversalDao;
import gov.med.va.innovations.util.ParamMap;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.orm.ObjectRetrievalFailureException;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.util.ClassUtils;

/**
 * This class serves as the a class that can CRUD any object without any
 * Spring configuration. The only downside is it does require casting
 * from Object to the object class.
 *
 * @author Bobby Diaz, Bryan Noll
 */
public class UniversalDaoiBatis extends SqlMapClientDaoSupport implements UniversalDao {
    /**
     * Log variable for all child classes. Uses LogFactory.getLog(getClass()) from Commons Logging
     */
    protected final Log log = LogFactory.getLog(getClass());

    /**
     * {@inheritDoc}
     */
    @SuppressWarnings("unchecked")
	public List getAll(Class clazz) {
        return getSqlMapClientTemplate().queryForList(
                iBatisDaoUtils.getSelectQuery(ClassUtils.getShortName(clazz)), null);
    }

    /**
     * {@inheritDoc}
     */
    @SuppressWarnings("unchecked")
	public Object get(Class clazz, Serializable primaryKey) {
        Object object = getSqlMapClientTemplate().queryForObject(
                iBatisDaoUtils.getFindQuery(ClassUtils.getShortName(clazz)), primaryKey);
        if (object == null) {
            throw new ObjectRetrievalFailureException(ClassUtils.getShortName(clazz), primaryKey);
        }
        return object;
    }

    /**
     * {@inheritDoc}
     */
    public Object save(final Object object) {
        String className = ClassUtils.getShortName(object.getClass());
        Object primaryKey = iBatisDaoUtils.getPrimaryKeyValue(object);
        String keyId = null;

        // check for null id
        if (primaryKey != null) {
            keyId = primaryKey.toString();
        }

        // check for new record
        if (StringUtils.isBlank(keyId)) {
            iBatisDaoUtils.prepareObjectForSaveOrUpdate(object);
            primaryKey = getSqlMapClientTemplate().insert(iBatisDaoUtils.getInsertQuery(className), object);

            // check for null id
            if (primaryKey != null) {
                keyId = primaryKey.toString();
            }
            iBatisDaoUtils.setPrimaryKey(object, Long.class, new Long(keyId));
        } else {
            iBatisDaoUtils.prepareObjectForSaveOrUpdate(object);
            getSqlMapClientTemplate().update(iBatisDaoUtils.getUpdateQuery(className), object);
        }

        // check for null id
        if (iBatisDaoUtils.getPrimaryKeyValue(object) == null) {
            throw new ObjectRetrievalFailureException(className, object);
        } else {
            return object;
        }
    }

    /**
     * {@inheritDoc}
     */
    @SuppressWarnings("unchecked")
	public void remove(Class clazz, Serializable primaryKey) {
        getSqlMapClientTemplate().update(iBatisDaoUtils.getDeleteQuery(ClassUtils.getShortName(clazz)), primaryKey);
    }

	@SuppressWarnings("unchecked")
	@Override
	public List findByCriteria(Class clazz, String criteria, int firstResult, int maxResults) {
		Map<String, Object> params = new ParamMap("criteria", criteria, "first", firstResult, "max", maxResults);
        return getSqlMapClientTemplate().queryForList(
                iBatisDaoUtils.getPagingQuery(ClassUtils.getShortName(clazz)), params);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Integer count(Class clazz) {
		return (Integer) getSqlMapClientTemplate().queryForObject(iBatisDaoUtils.getCountgQuery(ClassUtils.getShortName(clazz)));
	}
	

}
