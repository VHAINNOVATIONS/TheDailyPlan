
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="getAllergiesResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedAllergyArrays" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "getAllergiesResult"
})
@XmlRootElement(name = "getAllergiesResponse")
public class GetAllergiesResponse {

    protected TaggedAllergyArrays getAllergiesResult;

    /**
     * Gets the value of the getAllergiesResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedAllergyArrays }
     *     
     */
    public TaggedAllergyArrays getGetAllergiesResult() {
        return getAllergiesResult;
    }

    /**
     * Sets the value of the getAllergiesResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedAllergyArrays }
     *     
     */
    public void setGetAllergiesResult(TaggedAllergyArrays value) {
        this.getAllergiesResult = value;
    }

}
