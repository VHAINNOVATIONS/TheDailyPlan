
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TaggedAppointmentArrays complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TaggedAppointmentArrays">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractArrayTO">
 *       &lt;sequence>
 *         &lt;element name="arrays" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfTaggedAppointmentArray" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TaggedAppointmentArrays", propOrder = {
    "arrays"
})
public class TaggedAppointmentArrays
    extends AbstractArrayTO
{

    protected ArrayOfTaggedAppointmentArray arrays;

    /**
     * Gets the value of the arrays property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfTaggedAppointmentArray }
     *     
     */
    public ArrayOfTaggedAppointmentArray getArrays() {
        return arrays;
    }

    /**
     * Sets the value of the arrays property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfTaggedAppointmentArray }
     *     
     */
    public void setArrays(ArrayOfTaggedAppointmentArray value) {
        this.arrays = value;
    }

}
