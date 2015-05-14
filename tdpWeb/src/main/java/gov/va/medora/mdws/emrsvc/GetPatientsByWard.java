
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
 *         &lt;element name="wardId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "wardId"
})
@XmlRootElement(name = "getPatientsByWard")
public class GetPatientsByWard {

    protected String wardId;

    /**
     * Gets the value of the wardId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWardId() {
        return wardId;
    }

    /**
     * Sets the value of the wardId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWardId(String value) {
        this.wardId = value;
    }

}
