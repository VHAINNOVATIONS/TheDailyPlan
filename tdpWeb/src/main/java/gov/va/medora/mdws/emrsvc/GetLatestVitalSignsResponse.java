
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
 *         &lt;element name="getLatestVitalSignsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedVitalSignArrays" minOccurs="0"/>
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
    "getLatestVitalSignsResult"
})
@XmlRootElement(name = "getLatestVitalSignsResponse")
public class GetLatestVitalSignsResponse {

    protected TaggedVitalSignArrays getLatestVitalSignsResult;

    /**
     * Gets the value of the getLatestVitalSignsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedVitalSignArrays }
     *     
     */
    public TaggedVitalSignArrays getGetLatestVitalSignsResult() {
        return getLatestVitalSignsResult;
    }

    /**
     * Sets the value of the getLatestVitalSignsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedVitalSignArrays }
     *     
     */
    public void setGetLatestVitalSignsResult(TaggedVitalSignArrays value) {
        this.getLatestVitalSignsResult = value;
    }

}
