
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
 *         &lt;element name="getOutpatientMedsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedMedicationArrays" minOccurs="0"/>
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
    "getOutpatientMedsResult"
})
@XmlRootElement(name = "getOutpatientMedsResponse")
public class GetOutpatientMedsResponse {

    protected TaggedMedicationArrays getOutpatientMedsResult;

    /**
     * Gets the value of the getOutpatientMedsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedMedicationArrays }
     *     
     */
    public TaggedMedicationArrays getGetOutpatientMedsResult() {
        return getOutpatientMedsResult;
    }

    /**
     * Sets the value of the getOutpatientMedsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedMedicationArrays }
     *     
     */
    public void setGetOutpatientMedsResult(TaggedMedicationArrays value) {
        this.getOutpatientMedsResult = value;
    }

}
