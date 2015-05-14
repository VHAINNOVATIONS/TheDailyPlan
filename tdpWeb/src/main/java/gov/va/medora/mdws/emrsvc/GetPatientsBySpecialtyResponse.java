
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
 *         &lt;element name="getPatientsBySpecialtyResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedPatientArray" minOccurs="0"/>
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
    "getPatientsBySpecialtyResult"
})
@XmlRootElement(name = "getPatientsBySpecialtyResponse")
public class GetPatientsBySpecialtyResponse {

    protected TaggedPatientArray getPatientsBySpecialtyResult;

    /**
     * Gets the value of the getPatientsBySpecialtyResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedPatientArray }
     *     
     */
    public TaggedPatientArray getGetPatientsBySpecialtyResult() {
        return getPatientsBySpecialtyResult;
    }

    /**
     * Sets the value of the getPatientsBySpecialtyResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedPatientArray }
     *     
     */
    public void setGetPatientsBySpecialtyResult(TaggedPatientArray value) {
        this.getPatientsBySpecialtyResult = value;
    }

}
