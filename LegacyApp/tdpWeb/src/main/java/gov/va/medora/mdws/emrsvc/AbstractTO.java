
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AbstractTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AbstractTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="fault" type="{http://mdws.medora.va.gov/EmrSvc}FaultTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AbstractTO", propOrder = {
    "fault"
})
@XmlSeeAlso({
    TextTO.class,
    SiteTO.class,
    TaggedText.class,
    RegionTO.class,
    UserTO.class,
    NoteResultTO.class,
    PersonsTO.class,
    RadiologyReportTO.class,
    ObservationTypeTO.class,
    DischargeDiagnosesTO.class,
    PersonTO.class,
    ProblemTO.class,
    DataSourceTO.class,
    NoteTO.class,
    InpatientStayTO.class,
    AddressTO.class,
    AllergyTO.class,
    VisitTO.class,
    OrderTypeTO.class,
    SurgeryReportTO.class,
    HospitalLocationTO.class,
    CytologyRpt.class,
    AppointmentTO.class,
    LabTestTO.class,
    LabResultTO.class,
    AdtTO.class,
    MicrobiologyRpt.class,
    ChemHemRpt.class,
    SymptomTO.class,
    PhoneNumTO.class,
    MedicationTO.class,
    VitalSignTO.class,
    PatientRecordFlagTO.class,
    AuthorTO.class,
    IcdRpt.class,
    VitalSignSetTO.class,
    SurgicalPathologyRpt.class,
    AbstractArrayTO.class,
    LabSpecimenTO.class,
    TeamTO.class,
    OrderTO.class
})
public abstract class AbstractTO {

    protected FaultTO fault;

    /**
     * Gets the value of the fault property.
     * 
     * @return
     *     possible object is
     *     {@link FaultTO }
     *     
     */
    public FaultTO getFault() {
        return fault;
    }

    /**
     * Sets the value of the fault property.
     * 
     * @param value
     *     allowed object is
     *     {@link FaultTO }
     *     
     */
    public void setFault(FaultTO value) {
        this.fault = value;
    }

}
