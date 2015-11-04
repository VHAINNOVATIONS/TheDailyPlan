package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.DocumentEvent;
import gov.med.va.innovations.domain.EventType;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaTO;

import java.util.List;

/**
 * Business Service Interface to talk to persistence layer and
 * manage event logging and retrieval.
 *
 * @author mark
 */
public interface EventManager extends GenericManager<DocumentEvent, Long> {
	
	public static enum EventCode {RPT, MED}
    
	/**
	 * Will trigger a DocumentEvent to be persisted for those objects containing an EventCode
	 * @param patient is the patient who is to be tracked
	 * @param vistaObject is the VistA type to be logged 
	 */
	void generateEvent(VistaPatient patient, VistaTO vistaObject, String reportId);
    
	/**
	 * Retrieve all event type from the database
	 * @return a list of EventTypes
	 */
    List<EventType> getTypes();
    
    /**
     * Retrieve an event type by code
     * @param code is the unique code of the event type
     * @return the returned event type
     */
    EventType getType(String code);
    
    /**
     * Retrieve all events by Patient ID
     * @param pid unique patient identifier
     * @return A list of all patient events
     */
    List<DocumentEvent> getEvents(String pid);
    
    /**
     * Retrieve all events with a given code for a given patient
     * @param code the Event Code to retrieve
     * @param pid the unique patient identifier
     * @return A list of all patient events
     */
    List<DocumentEvent> getEvents(EventCode code, String pid);
    
    /**
     * Retrieve the most recently generated events with a given code for the given patient
     * @param code the Event Code to retrieve
     * @param pid the unique patient identifier
     * @return A list of all patient events
      */
    List<DocumentEvent> getRecentEvents(EventCode code, String pid);

	/**
	 * Generate a new Report Identifier
	 * 
	 * @return a new sequence used for identifying a report 
	 */
	String generateReportId();
}
