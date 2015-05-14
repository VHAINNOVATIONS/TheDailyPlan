
package gov.va.medora.mdws.querysvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TaggedPatientArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TaggedPatientArray">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/QuerySvc}AbstractTaggedArrayTO">
 *       &lt;sequence>
 *         &lt;element name="patients" type="{http://mdws.medora.va.gov/QuerySvc}ArrayOfPatientTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TaggedPatientArray", propOrder = {
    "patients"
})
public class TaggedPatientArray
    extends AbstractTaggedArrayTO
{

    protected ArrayOfPatientTO patients;

    /**
     * Gets the value of the patients property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfPatientTO }
     *     
     */
    public ArrayOfPatientTO getPatients() {
        return patients;
    }

    /**
     * Sets the value of the patients property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfPatientTO }
     *     
     */
    public void setPatients(ArrayOfPatientTO value) {
        this.patients = value;
    }

}
