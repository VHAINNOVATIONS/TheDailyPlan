package gov.med.va.innovations.dao.ibatis;

import gov.med.va.innovations.dao.DocumentEventDao;
import gov.med.va.innovations.domain.DocumentEvent;
import gov.med.va.innovations.domain.EventType;
import gov.med.va.innovations.domain.Testimonial;
import gov.med.va.innovations.util.DateUtil;
import gov.med.va.innovations.util.ParamMap;

import java.util.List;

public class DocumentEventDaoiBatis extends GenericDaoiBatis<DocumentEvent, Long> implements
		DocumentEventDao {

	
	public DocumentEventDaoiBatis(Class<Testimonial> persistentClass) {
		super(DocumentEvent.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DocumentEvent> findByPatient(String pid) {
        return  (List<DocumentEvent>) getSqlMapClientTemplate().queryForList("findByPatient", pid);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<EventType> getEventTypes() {
		return (List<EventType>) getSqlMapClientTemplate().queryForList("getEventTypes");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DocumentEvent> findByPatient(String code, String pid) {
		ParamMap params = new ParamMap("code", code, "pid", pid);
		return  (List<DocumentEvent>) getSqlMapClientTemplate().queryForList("findByPatientCode",params);
	}

	@Override
	public EventType getEventType(String code) {
		return (EventType) getSqlMapClientTemplate().queryForObject("getEventType", code);
	}

	@Override
	public String generateReportId() {
		ParamMap params = new ParamMap();
		getSqlMapClientTemplate().queryForObject("genReportId", params);
		
		return (String) params.get("reportId");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DocumentEvent> findRecentByPatient(String code, String pid) {
		ParamMap params = new ParamMap("code", code, "pid", pid, "today", DateUtil.getToday().getTime());
		return  (List<DocumentEvent>) getSqlMapClientTemplate().queryForList("findRecentEvents",params);
	}

}
