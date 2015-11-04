package gov.med.va.innovations.service.impl;

import gov.med.va.innovations.dao.PagingLookupDao;
import gov.med.va.innovations.service.PagingLookupManager;
import gov.med.va.innovations.ui.util.ExtendedPaginatedList;

import java.util.List;


public class PagingLookupManagerImpl extends UniversalManagerImpl implements
        PagingLookupManager {
    private PagingLookupDao pagingDao;

    /**
     * Method that allows setting the DAO to talk to the data store with.
     * 
     * @param dao
     *            the dao implementation
     */
    public void setLookupDao(PagingLookupDao pagingDao) {
        super.dao = pagingDao;
        this.pagingDao = pagingDao;
    }

    @SuppressWarnings("unchecked")
    public ExtendedPaginatedList getAllRecordsPage(Class clazz,
            ExtendedPaginatedList paginatedList) {
        List results = pagingDao.getAllRecordsPage(clazz, paginatedList
                .getFirstRecordIndex(), paginatedList.getPageSize(), paginatedList
                .getSortDirection(), paginatedList.getSortCriterion());
        paginatedList.setList(results);
        paginatedList.setTotalNumberOfRows(pagingDao.getAllRecordsCount(clazz));
        return paginatedList;
    }

    public PagingLookupDao getPagingDao() {
        return pagingDao;
    }

    public void setPagingDao(PagingLookupDao pagingDao) {
        this.pagingDao = pagingDao;
    }

}
