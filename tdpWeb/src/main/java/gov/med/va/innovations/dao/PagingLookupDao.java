package gov.med.va.innovations.dao;

import java.util.List;

import org.displaytag.properties.SortOrderEnum;

public interface PagingLookupDao extends UniversalDao {
     @SuppressWarnings("unchecked")
	List getAllRecordsPage(Class clazz, int firstResult, int maxResults,
            SortOrderEnum sortDirection, String sortCriterion);
     @SuppressWarnings("unchecked")
	int getAllRecordsCount(Class clazz);
}
