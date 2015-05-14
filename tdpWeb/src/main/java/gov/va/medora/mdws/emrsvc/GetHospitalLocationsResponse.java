
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
 *         &lt;element name="getHospitalLocationsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedHospitalLocationArray" minOccurs="0"/>
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
    "getHospitalLocationsResult"
})
@XmlRootElement(name = "getHospitalLocationsResponse")
public class GetHospitalLocationsResponse {

    protected TaggedHospitalLocationArray getHospitalLocationsResult;

    /**
     * Gets the value of the getHospitalLocationsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedHospitalLocationArray }
     *     
     */
    public TaggedHospitalLocationArray getGetHospitalLocationsResult() {
        return getHospitalLocationsResult;
    }

    /**
     * Sets the value of the getHospitalLocationsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedHospitalLocationArray }
     *     
     */
    public void setGetHospitalLocationsResult(TaggedHospitalLocationArray value) {
        this.getHospitalLocationsResult = value;
    }

}
