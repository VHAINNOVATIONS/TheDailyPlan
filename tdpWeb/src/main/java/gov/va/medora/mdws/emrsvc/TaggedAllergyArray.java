
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TaggedAllergyArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TaggedAllergyArray">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTaggedArrayTO">
 *       &lt;sequence>
 *         &lt;element name="allergies" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfAllergyTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TaggedAllergyArray", propOrder = {
    "allergies"
})
public class TaggedAllergyArray
    extends AbstractTaggedArrayTO
{

    protected ArrayOfAllergyTO allergies;

    /**
     * Gets the value of the allergies property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfAllergyTO }
     *     
     */
    public ArrayOfAllergyTO getAllergies() {
        return allergies;
    }

    /**
     * Sets the value of the allergies property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfAllergyTO }
     *     
     */
    public void setAllergies(ArrayOfAllergyTO value) {
        this.allergies = value;
    }

}
