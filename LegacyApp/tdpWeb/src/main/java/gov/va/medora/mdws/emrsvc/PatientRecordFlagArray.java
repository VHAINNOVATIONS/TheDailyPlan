
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for PatientRecordFlagArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PatientRecordFlagArray">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractArrayTO">
 *       &lt;sequence>
 *         &lt;element name="flags" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfPatientRecordFlagTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PatientRecordFlagArray", propOrder = {
    "flags"
})
public class PatientRecordFlagArray
    extends AbstractArrayTO
{

    protected ArrayOfPatientRecordFlagTO flags;

    /**
     * Gets the value of the flags property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfPatientRecordFlagTO }
     *     
     */
    public ArrayOfPatientRecordFlagTO getFlags() {
        return flags;
    }

    /**
     * Sets the value of the flags property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfPatientRecordFlagTO }
     *     
     */
    public void setFlags(ArrayOfPatientRecordFlagTO value) {
        this.flags = value;
    }

}
