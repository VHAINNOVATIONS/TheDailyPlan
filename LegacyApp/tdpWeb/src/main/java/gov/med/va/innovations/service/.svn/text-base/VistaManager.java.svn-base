package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.VistaAllergyList;
import gov.med.va.innovations.domain.VistaClinicalWarningList;
import gov.med.va.innovations.domain.VistaFault;
import gov.med.va.innovations.domain.VistaGenericList;
import gov.med.va.innovations.domain.VistaImmunizationList;
import gov.med.va.innovations.domain.VistaLabReportList;
import gov.med.va.innovations.domain.VistaLocation;
import gov.med.va.innovations.domain.VistaMedicationList;
import gov.med.va.innovations.domain.VistaOrderList;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaPatientList;
import gov.med.va.innovations.domain.VistaProblemList;
import gov.med.va.innovations.domain.VistaRadiologyReportList;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.domain.VistaTeam;
import gov.med.va.innovations.domain.VistaVitalSignList;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public interface VistaManager {

	/**
	 * Sign on to VistA system.  Supports either RPC or MDWS
	 * @param accessCode
	 * @param verifyCode
	 * @return VistaSignon result returned from VistA
	 */
	public VistaSignon doVistaSignon(String accessCode, String verifyCode);
	
	/**
	 * Get a list of all specialty teams
	 * @return
	 */
	public List<VistaTeam> getTeams();
	
	/**
	 * Retrieve a list of all locations (clinics, etc.) within the connected facility
	 * @return
	 */
	public List<VistaLocation> getLocations();

	/**
	 * Retrieve a list of Wards for the given Facility
	 * @return
	 */
	public List<VistaLocation> getWards();
	
	/**
	 * Retrieve patients matching a name or SSN filter
	 * @param filter
	 * @param first
	 * @param length
	 * @return
	 * @throws VistaFault 
	 */
	public VistaPatientList getPatientsMatching(String filter, int first, int length) throws VistaFault;

	/**
	 * Returns all patients located in a given Ward
	 * 
	 * @param wardId
	 * @return VistaPatientList contains a list of VistA Patients
	 * @throws VistaFault
	 */
	public VistaPatientList getWardPatients(String wardId) throws VistaFault;

	/**
	 * Returns all patients located in a given Hospital Unit
	 * 
	 * @param unitId
	 * @return VistaPatientList contains a list of VistA Patients
	 * @throws VistaFault
	 */
	public VistaPatientList getUnitPatients(String unitId) throws VistaFault;

	/**
	 * Returns all patients located under a given Team
	 * 
	 * @param teamId
	 * @return VistaPatientList contains a list of VistA Patients
	 * @throws VistaFault
	 */
	public VistaPatientList getTeamPatients(String teamId) throws VistaFault;

	/**
	 * Retrieve a patient with the given ID
	 * @param id
	 * @return a fully populated VistaPatient object
	 */
	public VistaPatient getPatientForId(String id);
	
	/**
	 * Retrieve all orders for a selected patient
	 * 
	 * @param dfn the unique patient identifier
	 * @return list of all orders for the patient
	 */
	public VistaOrderList getAllOrders(String dfn);
	
	/**
	 * Retrieve all inpatient meds for a given patient
	 * @param dfn
	 * @return
	 */
	public VistaMedicationList getInpatientMeds(String dfn);
	
	/**
	 * Retrieve all IV meds for a given patient
	 * @param dfn
	 * @return
	 */
	public VistaMedicationList getIvMeds(String dfn);
	
	/**
	 * Retrieve all Active meds for a given patient
	 * @param dfn
	 * @return
	 */
	public VistaMedicationList getActiveMeds(String dfn);
	
	/**
	 * Retrieve all Allergies for a given patient
	 * @param dfn
	 * @return
	 */
	public VistaAllergyList getAllergies(String dfn);
	
	/**
	 * Get all order of type LAB for the patient
	 * @param dfn unique patient identifier
	 * @return a list of all lab orders for the patient
	 */
	public VistaOrderList getLabOrders(String dfn);
	
	/**
	 * Get all order of type DIET for the patient
	 * @param dfn unique patient identifier
	 * @return a list of all lab orders for the patient
	 */
	public VistaOrderList getDietOrders(String dfn);

	/**
	 * Get all order of type RADIOLOGY for the patient
	 * @param dfn unique patient identifier
	 * @return a list of all radiology/imaging orders for the patient
	 */
	public VistaOrderList getRadiologyOrders(String dfn);

	/**
	 * Get all order of type ACTIVITY for the patient
	 * 
	 * @param dfn unique patient identifier
	 * @return a list of all activity orders for the patient
	 */
	public VistaOrderList getNursingOrders(String dfn);

	/**
	 * Get all order of type PROCEDURE for the patient
	 * 
	 * @param dfn unique patient identifier
	 * @return a list of all procedure orders for the patient
	 */
	public VistaOrderList getProcedureOrders(String dfn);
	
	/**
	 * Get all order of type DO NOT RECISUTATE for the patient
	 * 
	 * @param dfn unique patient identifier
	 * @return a list of all DNR orders for the patient
	 */
	public VistaOrderList getAdvancedDirectivesOrders(String dfn);
	
	/**
	 * Get all appointments and consults for the patient
	 * @param dfn unique patient identifier
	 * @return a list containing all of the patient's consults
	 */
	public VistaGenericList getAppointments(String dfn);
	
	/**
	 * Retrieve the latest vital signs for a patient
	 * @param dfn unique patient identifier
	 * @return An object containing the latest Vitals
	 */
	public VistaVitalSignList getVitals(String dfn);
	
	/**
	 * Retrieve a list of all problems for a patient
	 * 
	 * @param dfn unique patient identifier
	 * @return A list containing the patient's Problems
	 */
	public VistaProblemList getProblems(String dfn);
	
	/**
	 * Retrieve the Lab Results using the provided date range and report selection
	 * @param dfn unique patient identifier
	 * @param from the report Start Date
	 * @param to the report End Date
	 * @param reports a list of which Lab Reports to query
	 * @return a list containing all selected Lab Reports
	 * @throws InvocationTargetException 
	 */
	public VistaLabReportList getLabResults(String dfn, Date from, Date to, ArrayList<String> reports) throws InvocationTargetException;
	
	/**
	 * Retrieve the Radiology Reports for a given patient
	 * @param dfn unique patient identifier
	 * @param from the report Start Date
	 * @param to the report End Date
	 * @return a list containing all selected Radiology Reports
	 */
	public VistaRadiologyReportList getRadiologyReports(String dfn, Date from, Date to);
	
	/**
	 * Retrieve the Clinical Warnings for a given patient
	 * @param dfn unique patient identifier
	 * @param from the report Start Date
	 * @param to the report End Date
	 * @return a list containing all selected Clinical Warnings
	 */
	public VistaClinicalWarningList getClinicalWarnings(String dfn, Date from, Date to);
	
	/**
	 * Retrieve all immunizations
	 * @param dfn unique patient identifier
	 * @param from the report Start Date
	 * @param to the report End Date
	 * @return a list containing all selected Immunizations
	 */
	public VistaImmunizationList getImunizations(String dfn, Date from, Date to);

	/**
	 * Destroy a MDWS client associated with the session
	 */
	public void destroyClient();
}
