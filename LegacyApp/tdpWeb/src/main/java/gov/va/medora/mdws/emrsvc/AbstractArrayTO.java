
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AbstractArrayTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AbstractArrayTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="count" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AbstractArrayTO", propOrder = {
    "count"
})
@XmlSeeAlso({
    TaggedTextArray.class,
    TaggedNoteArrays.class,
    PatientArray.class,
    TaggedConsultArrays.class,
    TaggedMedicationArrays.class,
    TaggedSurgeryReportArrays.class,
    TaggedIcdRptArrays.class,
    TaggedChemHemRptArrays.class,
    SiteArray.class,
    TaggedVitalSignSetArrays.class,
    TaggedPatientArrays.class,
    TaggedCytologyRptArrays.class,
    TaggedAppointmentArrays.class,
    TaggedOrderArrays.class,
    PatientRecordFlagArray.class,
    TaggedRadiologyReportArrays.class,
    TaggedSurgicalPathologyRptArrays.class,
    TaggedAllergyArrays.class,
    TaggedProblemArrays.class,
    UserArray.class,
    DataSourceArray.class,
    RegionArray.class,
    TaggedVitalSignArrays.class,
    TaggedMicrobiologyRptArrays.class,
    AbstractTaggedArrayTO.class
})
public class AbstractArrayTO
    extends AbstractTO
{

    protected int count;

    /**
     * Gets the value of the count property.
     * 
     */
    public int getCount() {
        return count;
    }

    /**
     * Sets the value of the count property.
     * 
     */
    public void setCount(int value) {
        this.count = value;
    }

}
