
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TaggedVitalSignArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TaggedVitalSignArray">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTaggedArrayTO">
 *       &lt;sequence>
 *         &lt;element name="vitals" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfVitalSignTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TaggedVitalSignArray", propOrder = {
    "vitals"
})
public class TaggedVitalSignArray
    extends AbstractTaggedArrayTO
{

    protected ArrayOfVitalSignTO vitals;

    /**
     * Gets the value of the vitals property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfVitalSignTO }
     *     
     */
    public ArrayOfVitalSignTO getVitals() {
        return vitals;
    }

    /**
     * Sets the value of the vitals property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfVitalSignTO }
     *     
     */
    public void setVitals(ArrayOfVitalSignTO value) {
        this.vitals = value;
    }

}
