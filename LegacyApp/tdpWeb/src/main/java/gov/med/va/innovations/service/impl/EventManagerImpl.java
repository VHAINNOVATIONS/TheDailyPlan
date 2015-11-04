package gov.med.va.innovations.service.impl;

import gov.med.va.innovations.dao.DocumentEventDao;
import gov.med.va.innovations.domain.DocumentEvent;
import gov.med.va.innovations.domain.EventType;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaTO;
import gov.med.va.innovations.service.EventManager;
import gov.med.va.innovations.util.DateUtil;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import javax.ws.rs.Path;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.Authentication;
import org.springframework.security.context.SecurityContext;
import org.springframework.security.context.SecurityContextHolder;
import org.springframework.security.userdetails.UserDetails;

/**
 * Implementation of TestimonialManager interface.
 * 
 * @author mark
 */
@Path("/testimonials")
public class EventManagerImpl extends GenericManagerImpl<DocumentEvent, Long> implements EventManager {
	private static final Log LOG = LogFactory.getLog(EventManagerImpl.class);

	private DocumentEventDao dao;

	public EventManagerImpl(DocumentEventDao genericDao) {
		super(genericDao);
		dao = genericDao;
	}

    public void setDocumentEventDao(DocumentEventDao dao) {
        this.dao = dao;
    }

	@SuppressWarnings("unchecked")
	@Override
	public void generateEvent(VistaPatient patient, VistaTO vistaObject, String reportId) {
		if (null == vistaObject || null == vistaObject.getEventCode() || null == reportId)
			return;
		
		EventType type = dao.getEventType(vistaObject.getEventCode().name());
		
		String username = "unknown";
        if (SecurityContextHolder.getContext() != null) {
          SecurityContext sc = SecurityContextHolder.getContext();
          Authentication auth = sc.getAuthentication();
          if (auth != null) {
              username = ((UserDetails) auth.getPrincipal()).getUsername();
          }
        }
		
        if (null == vistaObject.getListLength() || 0 == vistaObject.getListLength())
        	createEvent(patient, reportId, type, username, null);
        else {
        	for (Method mtd : vistaObject.getClass().getMethods()) {
        		if (mtd.getName().startsWith("get") && mtd.getReturnType() == List.class && mtd.getGenericParameterTypes().length == 0) {
        			try {
						List<VistaTO> children = (List<VistaTO>) mtd.invoke(vistaObject, new Object[]{});
						for(VistaTO target : children) {
							type = dao.getEventType(target.getEventCode().name());
							if (null != target.getEventCode()) {
								Method targetIdGetter = target.getClass().getMethod("getId", new Class[]{});
								String targetId = "";
								if (null != targetIdGetter)
									targetId = (String) targetIdGetter.invoke(target, new Object[]{});
								createEvent(patient, reportId, type, username, targetId);
							}
						}
					} catch (IllegalArgumentException e) {
						LOG.error("Illegal Argument - should be none", e);
					} catch (IllegalAccessException e) {
						LOG.error("Illegal Access", e);
					} catch (InvocationTargetException e) {
						LOG.error("Invokation Target", e);
					} catch (SecurityException e) {
						LOG.error("Invokation Target", e);
					} catch (NoSuchMethodException e) {
						LOG.error("Invokation Target", e);
					}
        		}
        	}
        }
	}

	private void createEvent(VistaPatient patient, String reportId,
			EventType type, String username, String targetId) {
		DocumentEvent event = new DocumentEvent();
		event.setDob(patient.getDob());
		event.setDocumentId(reportId);
		event.setEventDate(DateUtil.getToday().getTime());
		event.setEventType(type);
		event.setFirstName(patient.getPatientName().substring(patient.getPatientName().indexOf(',')+1));
		event.setLastName(patient.getPatientName().substring(0,patient.getPatientName().indexOf(',')));
		event.setMedUnitId(Integer.valueOf(patient.getLocation().getId()));
		event.setPatientId(patient.getLocalPid());
		event.setEventTargetId(targetId);
		event.setSsn(patient.getSsn());
		event.setUpdatedBy(username);
		
		dao.save(event);
	}

	@Override
	public List<DocumentEvent> getEvents(String pid) {
		return dao.findByPatient(pid);
	}

	@Override
	public List<DocumentEvent> getEvents(EventCode code, String pid) {
		return dao.findByPatient(code.name(), pid);
	}

	@Override
	public List<EventType> getTypes() {
		return dao.getEventTypes();
	}

	@Override
	public EventType getType(String code) {
		return dao.getEventType(code);
	}

	@Override
	public String generateReportId() {
		return dao.generateReportId();
	}

	@Override
	public List<DocumentEvent> getRecentEvents(EventCode code, String pid) {
		return dao.findRecentByPatient(code.name(), pid);
	}
}