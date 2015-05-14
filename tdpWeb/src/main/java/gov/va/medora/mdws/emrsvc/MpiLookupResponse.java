
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
 *         &lt;element name="mpiLookupResult" type="{http://mdws.medora.va.gov/EmrSvc}PatientArray" minOccurs="0"/>
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
    "mpiLookupResult"
})
@XmlRootElement(name = "mpiLookupResponse")
public class MpiLookupResponse {

    protected PatientArray mpiLookupResult;

    /**
     * Gets the value of the mpiLookupResult property.
     * 
     * @return
     *     possible object is
     *     {@link PatientArray }
     *     
     */
    public PatientArray getMpiLookupResult() {
        return mpiLookupResult;
    }

    /**
     * Sets the value of the mpiLookupResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link PatientArray }
     *     
     */
    public void setMpiLookupResult(PatientArray value) {
        this.mpiLookupResult = value;
    }

}
