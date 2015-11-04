
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
 *         &lt;element name="getAppointmentsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedAppointmentArrays" minOccurs="0"/>
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
    "getAppointmentsResult"
})
@XmlRootElement(name = "getAppointmentsResponse")
public class GetAppointmentsResponse {

    protected TaggedAppointmentArrays getAppointmentsResult;

    /**
     * Gets the value of the getAppointmentsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedAppointmentArrays }
     *     
     */
    public TaggedAppointmentArrays getGetAppointmentsResult() {
        return getAppointmentsResult;
    }

    /**
     * Sets the value of the getAppointmentsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedAppointmentArrays }
     *     
     */
    public void setGetAppointmentsResult(TaggedAppointmentArrays value) {
        this.getAppointmentsResult = value;
    }

}
