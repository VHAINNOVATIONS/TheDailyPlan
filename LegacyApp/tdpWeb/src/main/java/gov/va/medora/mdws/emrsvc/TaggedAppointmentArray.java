
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TaggedAppointmentArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TaggedAppointmentArray">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTaggedArrayTO">
 *       &lt;sequence>
 *         &lt;element name="appts" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfAppointmentTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TaggedAppointmentArray", propOrder = {
    "appts"
})
public class TaggedAppointmentArray
    extends AbstractTaggedArrayTO
{

    protected ArrayOfAppointmentTO appts;

    /**
     * Gets the value of the appts property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfAppointmentTO }
     *     
     */
    public ArrayOfAppointmentTO getAppts() {
        return appts;
    }

    /**
     * Sets the value of the appts property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfAppointmentTO }
     *     
     */
    public void setAppts(ArrayOfAppointmentTO value) {
        this.appts = value;
    }

}
