
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
 *         &lt;element name="getPatientsByProviderResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedPatientArray" minOccurs="0"/>
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
    "getPatientsByProviderResult"
})
@XmlRootElement(name = "getPatientsByProviderResponse")
public class GetPatientsByProviderResponse {

    protected TaggedPatientArray getPatientsByProviderResult;

    /**
     * Gets the value of the getPatientsByProviderResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedPatientArray }
     *     
     */
    public TaggedPatientArray getGetPatientsByProviderResult() {
        return getPatientsByProviderResult;
    }

    /**
     * Sets the value of the getPatientsByProviderResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedPatientArray }
     *     
     */
    public void setGetPatientsByProviderResult(TaggedPatientArray value) {
        this.getPatientsByProviderResult = value;
    }

}
