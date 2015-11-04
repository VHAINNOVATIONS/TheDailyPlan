
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for PersonsTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PersonsTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="user" type="{http://mdws.medora.va.gov/EmrSvc}UserTO" minOccurs="0"/>
 *         &lt;element name="patient" type="{http://mdws.medora.va.gov/EmrSvc}PatientTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PersonsTO", propOrder = {
    "user",
    "patient"
})
public class PersonsTO
    extends AbstractTO
{

    protected UserTO user;
    protected PatientTO patient;

    /**
     * Gets the value of the user property.
     * 
     * @return
     *     possible object is
     *     {@link UserTO }
     *     
     */
    public UserTO getUser() {
        return user;
    }

    /**
     * Sets the value of the user property.
     * 
     * @param value
     *     allowed object is
     *     {@link UserTO }
     *     
     */
    public void setUser(UserTO value) {
        this.user = value;
    }

    /**
     * Gets the value of the patient property.
     * 
     * @return
     *     possible object is
     *     {@link PatientTO }
     *     
     */
    public PatientTO getPatient() {
        return patient;
    }

    /**
     * Sets the value of the patient property.
     * 
     * @param value
     *     allowed object is
     *     {@link PatientTO }
     *     
     */
    public void setPatient(PatientTO value) {
        this.patient = value;
    }

}
