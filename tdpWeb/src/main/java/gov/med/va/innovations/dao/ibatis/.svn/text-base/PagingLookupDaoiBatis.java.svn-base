package gov.med.va.innovations.dao.ibatis;

import gov.med.va.innovations.dao.PagingLookupDao;

import java.util.List;

import org.displaytag.properties.SortOrderEnum;

public class PagingLookupDaoiBatis extends UniversalDaoiBatis implements
        PagingLookupDao {

    @SuppressWarnings("unchecked")
    public int getAllRecordsCount(Class clazz) {
        int count = count(clazz);
        return count;
    }

    @SuppressWarnings("unchecked")
    public List getAllRecordsPage(Class clazz, int firstResult, int maxResults,
            SortOrderEnum sortDirection, String sortCriterion) {
        String criteria = sortCriterion == null ? "id" : sortCriterion;
        if (sortDirection != null) {
            if (sortDirection.equals(SortOrderEnum.ASCENDING)) {
                criteria += " ASC";
            }
            if (sortDirection.equals(SortOrderEnum.DESCENDING)) {
            	criteria += " DESC";
            }
        }
        List results = findByCriteria(clazz, criteria, firstResult, firstResult + maxResults);
        return results;
    }
}
