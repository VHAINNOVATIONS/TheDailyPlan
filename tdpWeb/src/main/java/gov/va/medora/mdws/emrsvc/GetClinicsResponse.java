
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
 *         &lt;element name="getClinicsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedHospitalLocationArray" minOccurs="0"/>
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
    "getClinicsResult"
})
@XmlRootElement(name = "getClinicsResponse")
public class GetClinicsResponse {

    protected TaggedHospitalLocationArray getClinicsResult;

    /**
     * Gets the value of the getClinicsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedHospitalLocationArray }
     *     
     */
    public TaggedHospitalLocationArray getGetClinicsResult() {
        return getClinicsResult;
    }

    /**
     * Sets the value of the getClinicsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedHospitalLocationArray }
     *     
     */
    public void setGetClinicsResult(TaggedHospitalLocationArray value) {
        this.getClinicsResult = value;
    }

}
