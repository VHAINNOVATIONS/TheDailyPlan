
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AdtTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AdtTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="patient" type="{http://mdws.medora.va.gov/EmrSvc}PatientTO" minOccurs="0"/>
 *         &lt;element name="checkInId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="checkOutId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="relatedPhysicalMovementId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="transaction" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="movementType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="timestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="diagnosis" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="assignedLocation" type="{http://mdws.medora.va.gov/EmrSvc}HospitalLocationTO" minOccurs="0"/>
 *         &lt;element name="provider" type="{http://mdws.medora.va.gov/EmrSvc}UserTO" minOccurs="0"/>
 *         &lt;element name="attending" type="{http://mdws.medora.va.gov/EmrSvc}UserTO" minOccurs="0"/>
 *         &lt;element name="transferFacility" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="specialty" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="patientTxId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="visitId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="patientMovementNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nextPatientMovement" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="enteredBy" type="{http://mdws.medora.va.gov/EmrSvc}UserTO" minOccurs="0"/>
 *         &lt;element name="lengthOfStay" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="passDays" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="daysAbsent" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="asihAdmission" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="asihTransfer" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="asihSequence" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="asihDays" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="absenceReturnDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="admittedForScCondition" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="scheduledAdmission" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="admissionSource" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="admittingCategory" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="admittingRegulation" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="admittingEligibility" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="masMovementType" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="lodgingReason" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lodgingComments" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="disposition" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="eligibility" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="preAdmitId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="referring" type="{http://mdws.medora.va.gov/EmrSvc}UserTO" minOccurs="0"/>
 *         &lt;element name="consulting" type="{http://mdws.medora.va.gov/EmrSvc}UserTO" minOccurs="0"/>
 *         &lt;element name="admitting" type="{http://mdws.medora.va.gov/EmrSvc}UserTO" minOccurs="0"/>
 *         &lt;element name="service" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="priorLocation" type="{http://mdws.medora.va.gov/EmrSvc}HospitalLocationTO" minOccurs="0"/>
 *         &lt;element name="temporaryLocation" type="{http://mdws.medora.va.gov/EmrSvc}HospitalLocationTO" minOccurs="0"/>
 *         &lt;element name="pendingLocation" type="{http://mdws.medora.va.gov/EmrSvc}HospitalLocationTO" minOccurs="0"/>
 *         &lt;element name="patientType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="admitTimestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="dischargeTimestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="admitReason" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="transferReason" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AdtTO", propOrder = {
    "id",
    "patient",
    "checkInId",
    "checkOutId",
    "relatedPhysicalMovementId",
    "transaction",
    "movementType",
    "timestamp",
    "diagnosis",
    "assignedLocation",
    "provider",
    "attending",
    "transferFacility",
    "specialty",
    "patientTxId",
    "visitId",
    "patientMovementNumber",
    "nextPatientMovement",
    "enteredBy",
    "lengthOfStay",
    "passDays",
    "daysAbsent",
    "asihAdmission",
    "asihTransfer",
    "asihSequence",
    "asihDays",
    "absenceReturnDate",
    "admittedForScCondition",
    "scheduledAdmission",
    "admissionSource",
    "admittingCategory",
    "admittingRegulation",
    "admittingEligibility",
    "masMovementType",
    "lodgingReason",
    "lodgingComments",
    "disposition",
    "eligibility",
    "preAdmitId",
    "referring",
    "consulting",
    "admitting",
    "service",
    "priorLocation",
    "temporaryLocation",
    "pendingLocation",
    "patientType",
    "admitTimestamp",
    "dischargeTimestamp",
    "admitReason",
    "transferReason"
})
public class AdtTO
    extends AbstractTO
{

    protected String id;
    protected PatientTO patient;
    protected String checkInId;
    protected String checkOutId;
    protected String relatedPhysicalMovementId;
    protected String transaction;
    protected String movementType;
    protected String timestamp;
    protected String diagnosis;
    protected HospitalLocationTO assignedLocation;
    protected UserTO provider;
    protected UserTO attending;
    protected String transferFacility;
    protected TaggedText specialty;
    protected String patientTxId;
    protected String visitId;
    protected String patientMovementNumber;
    protected String nextPatientMovement;
    protected UserTO enteredBy;
    protected String lengthOfStay;
    protected String passDays;
    protected String daysAbsent;
    protected TaggedText asihAdmission;
    protected String asihTransfer;
    protected String asihSequence;
    protected String asihDays;
    protected String absenceReturnDate;
    protected boolean admittedForScCondition;
    protected boolean scheduledAdmission;
    protected String admissionSource;
    protected String admittingCategory;
    protected TaggedText admittingRegulation;
    protected TaggedText admittingEligibility;
    protected TaggedText masMovementType;
    protected String lodgingReason;
    protected String lodgingComments;
    protected String disposition;
    protected String eligibility;
    protected String preAdmitId;
    protected UserTO referring;
    protected UserTO consulting;
    protected UserTO admitting;
    protected TaggedText service;
    protected HospitalLocationTO priorLocation;
    protected HospitalLocationTO temporaryLocation;
    protected HospitalLocationTO pendingLocation;
    protected String patientType;
    protected String admitTimestamp;
    protected String dischargeTimestamp;
    protected String admitReason;
    protected String transferReason;

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
    }

    /**
     * Gets the value of the patient property.
     * 
     * @return
     *     possible object is
     *     {@link PatientTO }
     *     
     */
    public PatientTO getPatient() {
        return patient;
    }

    /**
     * Sets the value of the patient property.
     * 
     * @param value
     *     allowed object is
     *     {@link PatientTO }
     *     
     */
    public void setPatient(PatientTO value) {
        this.patient = value;
    }

    /**
     * Gets the value of the checkInId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCheckInId() {
        return checkInId;
    }

    /**
     * Sets the value of the checkInId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCheckInId(String value) {
        this.checkInId = value;
    }

    /**
     * Gets the value of the checkOutId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCheckOutId() {
        return checkOutId;
    }

    /**
     * Sets the value of the checkOutId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCheckOutId(String value) {
        this.checkOutId = value;
    }

    /**
     * Gets the value of the relatedPhysicalMovementId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRelatedPhysicalMovementId() {
        return relatedPhysicalMovementId;
    }

    /**
     * Sets the value of the relatedPhysicalMovementId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRelatedPhysicalMovementId(String value) {
        this.relatedPhysicalMovementId = value;
    }

    /**
     * Gets the value of the transaction property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTransaction() {
        return transaction;
    }

    /**
     * Sets the value of the transaction property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTransaction(String value) {
        this.transaction = value;
    }

    /**
     * Gets the value of the movementType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMovementType() {
        return movementType;
    }

    /**
     * Sets the value of the movementType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMovementType(String value) {
        this.movementType = value;
    }

    /**
     * Gets the value of the timestamp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTimestamp() {
        return timestamp;
    }

    /**
     * Sets the value of the timestamp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTimestamp(String value) {
        this.timestamp = value;
    }

    /**
     * Gets the value of the diagnosis property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDiagnosis() {
        return diagnosis;
    }

    /**
     * Sets the value of the diagnosis property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDiagnosis(String value) {
        this.diagnosis = value;
    }

    /**
     * Gets the value of the assignedLocation property.
     * 
     * @return
     *     possible object is
     *     {@link HospitalLocationTO }
     *     
     */
    public HospitalLocationTO getAssignedLocation() {
        return assignedLocation;
    }

    /**
     * Sets the value of the assignedLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link HospitalLocationTO }
     *     
     */
    public void setAssignedLocation(HospitalLocationTO value) {
        this.assignedLocation = value;
    }

    /**
     * Gets the value of the provider property.
     * 
     * @return
     *     possible object is
     *     {@link UserTO }
     *     
     */
    public UserTO getProvider() {
        return provider;
    }

    /**
     * Sets the value of the provider property.
     * 
     * @param value
     *     allowed object is
     *     {@link UserTO }
     *     
     */
    public void setProvider(UserTO value) {
        this.provider = value;
    }

    /**
     * Gets the value of the attending property.
     * 
     * @return
     *     possible object is
     *     {@link UserTO }
     *     
     */
    public UserTO getAttending() {
        return attending;
    }

    /**
     * Sets the value of the attending property.
     * 
     * @param value
     *     allowed object is
     *     {@link UserTO }
     *     
     */
    public void setAttending(UserTO value) {
        this.attending = value;
    }

    /**
     * Gets the value of the transferFacility property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTransferFacility() {
        return transferFacility;
    }

    /**
     * Sets the value of the transferFacility property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTransferFacility(String value) {
        this.transferFacility = value;
    }

    /**
     * Gets the value of the specialty property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedText }
     *     
     */
    public TaggedText getSpecialty() {
        return specialty;
    }

    /**
     * Sets the value of the specialty property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedText }
     *     
     */
    public void setSpecialty(TaggedText value) {
        this.specialty = value;
    }

    /**
     * Gets the value of the patientTxId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPatientTxId() {
        return patientTxId;
    }

    /**
     * Sets the value of the patientTxId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPatientTxId(String value) {
        this.patientTxId = value;
    }

    /**
     * Gets the value of the visitId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVisitId() {
        return visitId;
    }

    /**
     * Sets the value of the visitId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVisitId(String value) {
        this.visitId = value;
    }

    /**
     * Gets the value of the patientMovementNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPatientMovementNumber() {
        return patientMovementNumber;
    }

    /**
     * Sets the value of the patientMovementNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPatientMovementNumber(String value) {
        this.patientMovementNumber = value;
    }

    /**
     * Gets the value of the nextPatientMovement property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNextPatientMovement() {
        return nextPatientMovement;
    }

    /**
     * Sets the value of the nextPatientMovement property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNextPatientMovement(String value) {
        this.nextPatientMovement = value;
    }

    /**
     * Gets the value of the enteredBy property.
     * 
     * @return
     *     possible object is
     *     {@link UserTO }
     *     
     */
    public UserTO getEnteredBy() {
        return enteredBy;
    }

    /**
     * Sets the value of the enteredBy property.
     * 
     * @param value
     *     allowed object is
     *     {@link UserTO }
     *     
     */
    public void setEnteredBy(UserTO value) {
        this.enteredBy = value;
    }

    /**
     * Gets the value of the lengthOfStay property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLengthOfStay() {
        return lengthOfStay;
    }

    /**
     * Sets the value of the lengthOfStay property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLengthOfStay(String value) {
        this.lengthOfStay = value;
    }

    /**
     * Gets the value of the passDays property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPassDays() {
        return passDays;
    }

    /**
     * Sets the value of the passDays property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPassDays(String value) {
        this.passDays = value;
    }

    /**
     * Gets the value of the daysAbsent property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDaysAbsent() {
        return daysAbsent;
    }

    /**
     * Sets the value of the daysAbsent property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDaysAbsent(String value) {
        this.daysAbsent = value;
    }

    /**
     * Gets the value of the asihAdmission property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedText }
     *     
     */
    public TaggedText getAsihAdmission() {
        return asihAdmission;
    }

    /**
     * Sets the value of the asihAdmission property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedText }
     *     
     */
    public void setAsihAdmission(TaggedText value) {
        this.asihAdmission = value;
    }

    /**
     * Gets the value of the asihTransfer property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAsihTransfer() {
        return asihTransfer;
    }

    /**
     * Sets the value of the asihTransfer property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAsihTransfer(String value) {
        this.asihTransfer = value;
    }

    /**
     * Gets the value of the asihSequence property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAsihSequence() {
        return asihSequence;
    }

    /**
     * Sets the value of the asihSequence property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAsihSequence(String value) {
        this.asihSequence = value;
    }

    /**
     * Gets the value of the asihDays property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAsihDays() {
        return asihDays;
    }

    /**
     * Sets the value of the asihDays property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAsihDays(String value) {
        this.asihDays = value;
    }

    /**
     * Gets the value of the absenceReturnDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAbsenceReturnDate() {
        return absenceReturnDate;
    }

    /**
     * Sets the value of the absenceReturnDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAbsenceReturnDate(String value) {
        this.absenceReturnDate = value;
    }

    /**
     * Gets the value of the admittedForScCondition property.
     * 
     */
    public boolean isAdmittedForScCondition() {
        return admittedForScCondition;
    }

    /**
     * Sets the value of the admittedForScCondition property.
     * 
     */
    public void setAdmittedForScCondition(boolean value) {
        this.admittedForScCondition = value;
    }

    /**
     * Gets the value of the scheduledAdmission property.
     * 
     */
    public boolean isScheduledAdmission() {
        return scheduledAdmission;
    }

    /**
     * Sets the value of the scheduledAdmission property.
     * 
     */
    public void setScheduledAdmission(boolean value) {
        this.scheduledAdmission = value;
    }

    /**
     * Gets the value of the admissionSource property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAdmissionSource() {
        return admissionSource;
    }

    /**
     * Sets the value of the admissionSource property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAdmissionSource(String value) {
        this.admissionSource = value;
    }

    /**
     * Gets the value of the admittingCategory property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAdmittingCategory() {
        return admittingCategory;
    }

    /**
     * Sets the value of the admittingCategory property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAdmittingCategory(String value) {
        this.admittingCategory = value;
    }

    /**
     * Gets the value of the admittingRegulation property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedText }
     *     
     */
    public TaggedText getAdmittingRegulation() {
        return admittingRegulation;
    }

    /**
     * Sets the value of the admittingRegulation property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedText }
     *     
     */
    public void setAdmittingRegulation(TaggedText value) {
        this.admittingRegulation = value;
    }

    /**
     * Gets the value of the admittingEligibility property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedText }
     *     
     */
    public TaggedText getAdmittingEligibility() {
        return admittingEligibility;
    }

    /**
     * Sets the value of the admittingEligibility property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedText }
     *     
     */
    public void setAdmittingEligibility(TaggedText value) {
        this.admittingEligibility = value;
    }

    /**
     * Gets the value of the masMovementType property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedText }
     *     
     */
    public TaggedText getMasMovementType() {
        return masMovementType;
    }

    /**
     * Sets the value of the masMovementType property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedText }
     *     
     */
    public void setMasMovementType(TaggedText value) {
        this.masMovementType = value;
    }

    /**
     * Gets the value of the lodgingReason property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLodgingReason() {
        return lodgingReason;
    }

    /**
     * Sets the value of the lodgingReason property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLodgingReason(String value) {
        this.lodgingReason = value;
    }

    /**
     * Gets the value of the lodgingComments property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLodgingComments() {
        return lodgingComments;
    }

    /**
     * Sets the value of the lodgingComments property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLodgingComments(String value) {
        this.lodgingComments = value;
    }

    /**
     * Gets the value of the disposition property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDisposition() {
        return disposition;
    }

    /**
     * Sets the value of the disposition property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDisposition(String value) {
        this.disposition = value;
    }

    /**
     * Gets the value of the eligibility property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEligibility() {
        return eligibility;
    }

    /**
     * Sets the value of the eligibility property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEligibility(String value) {
        this.eligibility = value;
    }

    /**
     * Gets the value of the preAdmitId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPreAdmitId() {
        return preAdmitId;
    }

    /**
     * Sets the value of the preAdmitId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPreAdmitId(String value) {
        this.preAdmitId = value;
    }

    /**
     * Gets the value of the referring property.
     * 
     * @return
     *     possible object is
     *     {@link UserTO }
     *     
     */
    public UserTO getReferring() {
        return referring;
    }

    /**
     * Sets the value of the referring property.
     * 
     * @param value
     *     allowed object is
     *     {@link UserTO }
     *     
     */
    public void setReferring(UserTO value) {
        this.referring = value;
    }

    /**
     * Gets the value of the consulting property.
     * 
     * @return
     *     possible object is
     *     {@link UserTO }
     *     
     */
    public UserTO getConsulting() {
        return consulting;
    }

    /**
     * Sets the value of the consulting property.
     * 
     * @param value
     *     allowed object is
     *     {@link UserTO }
     *     
     */
    public void setConsulting(UserTO value) {
        this.consulting = value;
    }

    /**
     * Gets the value of the admitting property.
     * 
     * @return
     *     possible object is
     *     {@link UserTO }
     *     
     */
    public UserTO getAdmitting() {
        return admitting;
    }

    /**
     * Sets the value of the admitting property.
     * 
     * @param value
     *     allowed object is
     *     {@link UserTO }
     *     
     */
    public void setAdmitting(UserTO value) {
        this.admitting = value;
    }

    /**
     * Gets the value of the service property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedText }
     *     
     */
    public TaggedText getService() {
        return service;
    }

    /**
     * Sets the value of the service property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedText }
     *     
     */
    public void setService(TaggedText value) {
        this.service = value;
    }

    /**
     * Gets the value of the priorLocation property.
     * 
     * @return
     *     possible object is
     *     {@link HospitalLocationTO }
     *     
     */
    public HospitalLocationTO getPriorLocation() {
        return priorLocation;
    }

    /**
     * Sets the value of the priorLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link HospitalLocationTO }
     *     
     */
    public void setPriorLocation(HospitalLocationTO value) {
        this.priorLocation = value;
    }

    /**
     * Gets the value of the temporaryLocation property.
     * 
     * @return
     *     possible object is
     *     {@link HospitalLocationTO }
     *     
     */
    public HospitalLocationTO getTemporaryLocation() {
        return temporaryLocation;
    }

    /**
     * Sets the value of the temporaryLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link HospitalLocationTO }
     *     
     */
    public void setTemporaryLocation(HospitalLocationTO value) {
        this.temporaryLocation = value;
    }

    /**
     * Gets the value of the pendingLocation property.
     * 
     * @return
     *     possible object is
     *     {@link HospitalLocationTO }
     *     
     */
    public HospitalLocationTO getPendingLocation() {
        return pendingLocation;
    }

    /**
     * Sets the value of the pendingLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link HospitalLocationTO }
     *     
     */
    public void setPendingLocation(HospitalLocationTO value) {
        this.pendingLocation = value;
    }

    /**
     * Gets the value of the patientType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPatientType() {
        return patientType;
    }

    /**
     * Sets the value of the patientType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPatientType(String value) {
        this.patientType = value;
    }

    /**
     * Gets the value of the admitTimestamp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAdmitTimestamp() {
        return admitTimestamp;
    }

    /**
     * Sets the value of the admitTimestamp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAdmitTimestamp(String value) {
        this.admitTimestamp = value;
    }

    /**
     * Gets the value of the dischargeTimestamp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDischargeTimestamp() {
        return dischargeTimestamp;
    }

    /**
     * Sets the value of the dischargeTimestamp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDischargeTimestamp(String value) {
        this.dischargeTimestamp = value;
    }

    /**
     * Gets the value of the admitReason property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAdmitReason() {
        return admitReason;
    }

    /**
     * Sets the value of the admitReason property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAdmitReason(String value) {
        this.admitReason = value;
    }

    /**
     * Gets the value of the transferReason property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTransferReason() {
        return transferReason;
    }

    /**
     * Sets the value of the transferReason property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTransferReason(String value) {
        this.transferReason = value;
    }

}
