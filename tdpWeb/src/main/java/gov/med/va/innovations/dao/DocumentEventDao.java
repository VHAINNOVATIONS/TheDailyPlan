package gov.med.va.innovations.dao;

import gov.med.va.innovations.domain.DocumentEvent;
import gov.med.va.innovations.domain.EventType;

import java.util.List;

public interface DocumentEventDao extends GenericDao<DocumentEvent, Long> {
	/**
	 * Retrieve all events for a patient
	 * @param pid the unique patient identifier
	 * 
	 * @return A list of events, which may be empty if no events exist
	 */
	public List<DocumentEvent> findByPatient(String pid);
	
	/**
	 * Retrieve all events for a patient with the given code
	 * 
	 * @param code is the identifier for the EventType
	 * @param pid the unique patient identifier
	 * @return A list of events, which may be empty if no events exist
	 */
	public List<DocumentEvent> findByPatient(String code, String pid);
	
	/**
	 * Retrieve the most recent events for a patient with the given code
	 * 
	 * @param code is the identifier for the EventType
	 * @param pid the unique patient identifier
	 * @return A list of events, which may be empty if no events exist
	 */
	public List<DocumentEvent> findRecentByPatient(String code, String pid);
	
	/**
	 * Retrieve all event types
	 * 
	 * @return a list of all defined event types
	 */
	public List<EventType> getEventTypes();
	
	/**
	 * Retrieve a specific event types
	 * 
	 * @return an event type with the matching code
	 */
	public EventType getEventType(String code);
	
	/**
	 * Generates a sequential report Id for every report generated
	 * 
	 * @return the generated reportId
	 */
	public String generateReportId();
}

