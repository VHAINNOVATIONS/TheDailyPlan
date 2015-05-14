
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
 *         &lt;element name="getVitalSignsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedVitalSignSetArrays" minOccurs="0"/>
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
    "getVitalSignsResult"
})
@XmlRootElement(name = "getVitalSignsResponse")
public class GetVitalSignsResponse {

    protected TaggedVitalSignSetArrays getVitalSignsResult;

    /**
     * Gets the value of the getVitalSignsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedVitalSignSetArrays }
     *     
     */
    public TaggedVitalSignSetArrays getGetVitalSignsResult() {
        return getVitalSignsResult;
    }

    /**
     * Sets the value of the getVitalSignsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedVitalSignSetArrays }
     *     
     */
    public void setGetVitalSignsResult(TaggedVitalSignSetArrays value) {
        this.getVitalSignsResult = value;
    }

}
