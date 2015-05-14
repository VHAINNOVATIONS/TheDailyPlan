
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
 *         &lt;element name="getImoMedsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedMedicationArrays" minOccurs="0"/>
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
    "getImoMedsResult"
})
@XmlRootElement(name = "getImoMedsResponse")
public class GetImoMedsResponse {

    protected TaggedMedicationArrays getImoMedsResult;

    /**
     * Gets the value of the getImoMedsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedMedicationArrays }
     *     
     */
    public TaggedMedicationArrays getGetImoMedsResult() {
        return getImoMedsResult;
    }

    /**
     * Sets the value of the getImoMedsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedMedicationArrays }
     *     
     */
    public void setGetImoMedsResult(TaggedMedicationArrays value) {
        this.getImoMedsResult = value;
    }

}
