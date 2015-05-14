
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
 *         &lt;element name="getUnitDoseMedsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedMedicationArrays" minOccurs="0"/>
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
    "getUnitDoseMedsResult"
})
@XmlRootElement(name = "getUnitDoseMedsResponse")
public class GetUnitDoseMedsResponse {

    protected TaggedMedicationArrays getUnitDoseMedsResult;

    /**
     * Gets the value of the getUnitDoseMedsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedMedicationArrays }
     *     
     */
    public TaggedMedicationArrays getGetUnitDoseMedsResult() {
        return getUnitDoseMedsResult;
    }

    /**
     * Sets the value of the getUnitDoseMedsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedMedicationArrays }
     *     
     */
    public void setGetUnitDoseMedsResult(TaggedMedicationArrays value) {
        this.getUnitDoseMedsResult = value;
    }

}
