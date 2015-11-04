/**
 * 
 */
package gov.med.va.innovations.dao;

import gov.med.va.innovations.domain.VistaAllergyList;
import gov.med.va.innovations.domain.VistaAppointmentList;
import gov.med.va.innovations.domain.VistaClinicalWarningList;
import gov.med.va.innovations.domain.VistaConsultList;
import gov.med.va.innovations.domain.VistaDirectiveList;
import gov.med.va.innovations.domain.VistaFault;
import gov.med.va.innovations.domain.VistaImmunizationList;
import gov.med.va.innovations.domain.VistaLabReportList;
import gov.med.va.innovations.domain.VistaLocation;
import gov.med.va.innovations.domain.VistaMedicationList;
import gov.med.va.innovations.domain.VistaOrderList;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaProblemList;
import gov.med.va.innovations.domain.VistaRadiologyReportList;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.domain.VistaTeam;
import gov.med.va.innovations.domain.VistaVitalSignList;
import gov.med.va.innovations.util.MdwsClientFactory;

import java.util.Date;
import java.util.List;

/**
 * @author insanmaster
 *
 */
public interface VistaDao {
	/**
	 * Sign on to the VistA system
	 * @param accessCode
	 * @param verifyCode
	 * @return
	 */
	public VistaSignon doVistaSignon(String accessCode, String verifyCode);
	
	/**
	 * Retrieve all Specialty Teams
	 * @return
	 */
	public List<VistaTeam> getTeams();
	
	/**
	 * Returns a list of all locations (clinics, etc) in the hospital or facility
	 * @return
	 */
	public List<VistaLocation> getLocations();
	
	/**
	 * Returns a list of all wards in the hospital or facility
	 * @return
	 */
	public List<VistaLocation> getWards();
	
	/**
	 * Retrieve a list of patient summaries from VistA using "Last,First" or "Last 4 SSN"
	 * @param matchCriteria
	 * @return
	 */
	public List<VistaPatient> matchPatients(String matchCriteria) throws VistaFault;
	
	/**
	 * Retrieve a list of patient summaries from VistA using "Ward ID"
	 * 
	 * @param ward the ID of the ward
	 * @return a list of VistA Patient summaries
	 * @throws VistaFault
	 */
	public List<VistaPatient> getPatientsForWard(String ward) throws VistaFault;

	/**
	 * Retrieve a list of patient summaries from VistA using "Location ID"
	 * 
	 * @param unitId is the ID of the Location where the inpatients are located
	 * @return
	 * @throws VistaFault 
	 */
	public List<VistaPatient> getPatientsForLocation(String unitId) throws VistaFault;

	/**
	 * Retrieve a list of patient summaries from VistA using "Team ID"
	 * @param teamId
	 * @return
	 */
	public List<VistaPatient> getPatientsForTeam(String teamId) throws VistaFault;
	
	/**
	 * Retrieve details on a subset of patients. Be careful with this, as it incurs a WS call for each patient
	 * @param patients
	 */
	public List<VistaPatient> detailPatients(List<VistaPatient> patients);
	
	/**
	 * Retrieve a list of patient orders for the selected patient
	 * @return list of patient orders
	 */
	public VistaOrderList getPatientOrders(String dfn);
	
	/**
	 * Retrieve all inpatient medications for the given patient id
	 * @param dfn the patient identifier
	 * @return List of VistaMedication
	 */
	public VistaMedicationList getInpatientMeds(String dfn);

	/**
	 * Retrieve all IV medications for the given patient id
	 * @param dfn the patient identifier
	 * @return List of VistaMedication
	 */
	public VistaMedicationList getIvMeds(String dfn);
	
	/**
	 * Retrieve all allergies for the given patient ID
	 * @param dfn the patient identifier
	 * @return list of VistaAllergy
	 */
	public VistaAllergyList getAllergies(String dfn);

	/**
	 * Retrieve all appointments for the given patient ID
	 * @param dfn the patient identifier
	 * @return list of VistaAppointment
	 */
	public VistaAppointmentList getAppointments(String dfn);
	
	/**
	 * Retrieve the latest Vital Signs for a patient
	 * @param dfn the patient identifier
	 * @return the wrapped Vitals
	 */
	public VistaVitalSignList getVitals(String dfn);

	/**
	 * Retrieve all consults for the given patient ID
	 * @param dfn the patient identifier
	 * @return list of VistaConsult
	 */
	public VistaConsultList getConsults(String dfn);
	
	/**
	 * Retrieve all ACTIVE problems for the given patient ID
	 * @param dfn the patient identifier
	 * @return list of VistaProblem
	 */
	public VistaProblemList getProblems(String dfn);
	
	/**
	 * Retrieve Advanced Directives for the given patient
	 * @param dfn the patient identifier
	 * @return list of VistaDirective
	 */
	public VistaDirectiveList getAdvancedDirectives(String dfn, Date from, Date to);
	
	/**
	 * Retrieve Chem/Hem Reports from VistA
	 * @param dfn the patient identifier
	 * @param from the start date of the report
	 * @param to the end date of the report
	 * @return a List of Lab Reports
	 */
	public VistaLabReportList getChemHemReports(String dfn, Date from, Date to);
	
	/**
	 * Retrieve Microbiology Reports from VistA
	 * @param dfn the patient identifier
	 * @param from the start date of the report
	 * @param to the end date of the report
	 * @return a List of Lab Reports
	 */
	public VistaLabReportList getMicrobiologyReports(String dfn, Date from, Date to);
	
	/**
	 * Retrieve Surgical Pathology Reports from VistA
	 * @param dfn the patient identifier
	 * @param from the start date of the report
	 * @param to the end date of the report
	 * @return a List of Lab Reports
	 */
	public VistaLabReportList getSurgicalPathologyReports(String dfn, Date from, Date to);
	
	/**
	 * Retrieve Cytology Reports from VistA
	 * @param dfn the patient identifier
	 * @param from the start date of the report
	 * @param to the end date of the report
	 * @return a List of Lab Reports
	 */
	public VistaLabReportList getCytologyReports(String dfn, Date from, Date to);
	
	/**
	 * Retrieve Cytopathology Reports from VistA
	 * @param dfn the patient identifier
	 * @param from the start date of the report
	 * @param to the end date of the report
	 * @return a List of Lab Reports
	 */
	public VistaLabReportList getCytopathologyReports(String dfn, Date from, Date to);
	
	/**
	 * Retrieve Electron Microscopy Reports from VistA
	 * @param dfn the patient identifier
	 * @param from the start date of the report
	 * @param to the end date of the report
	 * @return a List of Lab Reports
	 */
	public VistaLabReportList getElectronMicroscopyReports(String dfn, Date from, Date to);
	
	/**
	 * Retrieve radiology reports for the given patient for the given date range
	 * @param dfn the patient identifier
	 * @param from the start date of the report
	 * @param to the end date of the report
	 * @return a List of Radiology Reports
	 */
	public VistaRadiologyReportList getRadiologyReports(String dfn, Date from, Date to);
	
	/**
	 * Retrieve Clinical Warnings for a patient
	 * @param dfn the patient identifier
	 * @param from the start date of the report
	 * @param to the end date of the report
	 * @return a List of Clinical Warnings
	 */
	public VistaClinicalWarningList getClinicalWarnings(String dfn, Date from, Date to);
	
	/**
	 * Retrieve all Immunizations for a patient
	 * @param dfn the patient identifier
	 * @param from the start date of the report
	 * @param to the end date of the report
	 * @return a list of all Immunizations
	 */
	public VistaImmunizationList getImmunizations(String dfn, Date from, Date to);

	/**
	 * Get a patient by patient ID
	 * @param id
	 * @return
	 */
	public VistaPatient get(String id);

	/**
	 * Retrieve a FileMan file's fields in a raw format. Each record in the file has the requested fields delimited by '^', and the first
	 * field always returned is the DFN, or unique identifier of the record.
	 * 
	 * @param fileNum is the file number to which the file is referred 
	 * @param fields the are the field numbers, concatenated, delimited by ;.  For example 0.1;1;2;5.5;5.6
	 * @param filter M Code that looks for specific values to filter by
	 * @param numRecs the number of records to return.  May be left null to return all
	 * @param start the number of the first relative record to return
	 * @param part is a string filter to use.  Does not always work.
	 * @return A list of records in their raw format. The caller is responsible for parsing these out.
	 */
	public List<String> getVistaFile(String fileNum, String[] fields, String filter, Integer numRecs, Integer start, String part);
	
	/**
	 * Expose client factory to service layer
	 * @return
	 */
	public MdwsClientFactory getMdwsClientFactory();
}
