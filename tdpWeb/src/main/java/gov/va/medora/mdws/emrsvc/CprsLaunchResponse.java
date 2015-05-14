
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
 *         &lt;element name="cprsLaunchResult" type="{http://mdws.medora.va.gov/EmrSvc}PersonsTO" minOccurs="0"/>
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
    "cprsLaunchResult"
})
@XmlRootElement(name = "cprsLaunchResponse")
public class CprsLaunchResponse {

    protected PersonsTO cprsLaunchResult;

    /**
     * Gets the value of the cprsLaunchResult property.
     * 
     * @return
     *     possible object is
     *     {@link PersonsTO }
     *     
     */
    public PersonsTO getCprsLaunchResult() {
        return cprsLaunchResult;
    }

    /**
     * Sets the value of the cprsLaunchResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link PersonsTO }
     *     
     */
    public void setCprsLaunchResult(PersonsTO value) {
        this.cprsLaunchResult = value;
    }

}
