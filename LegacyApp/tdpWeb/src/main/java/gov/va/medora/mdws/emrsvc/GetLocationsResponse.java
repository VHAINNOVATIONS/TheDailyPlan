
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
 *         &lt;element name="getLocationsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedHospitalLocationArray" minOccurs="0"/>
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
    "getLocationsResult"
})
@XmlRootElement(name = "getLocationsResponse")
public class GetLocationsResponse {

    protected TaggedHospitalLocationArray getLocationsResult;

    /**
     * Gets the value of the getLocationsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedHospitalLocationArray }
     *     
     */
    public TaggedHospitalLocationArray getGetLocationsResult() {
        return getLocationsResult;
    }

    /**
     * Sets the value of the getLocationsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedHospitalLocationArray }
     *     
     */
    public void setGetLocationsResult(TaggedHospitalLocationArray value) {
        this.getLocationsResult = value;
    }

}
