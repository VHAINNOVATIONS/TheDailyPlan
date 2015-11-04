
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
 *         &lt;element name="loginResult" type="{http://mdws.medora.va.gov/EmrSvc}UserTO" minOccurs="0"/>
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
    "loginResult"
})
@XmlRootElement(name = "loginResponse")
public class LoginResponse {

    protected UserTO loginResult;

    /**
     * Gets the value of the loginResult property.
     * 
     * @return
     *     possible object is
     *     {@link UserTO }
     *     
     */
    public UserTO getLoginResult() {
        return loginResult;
    }

    /**
     * Sets the value of the loginResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link UserTO }
     *     
     */
    public void setLoginResult(UserTO value) {
        this.loginResult = value;
    }

}
