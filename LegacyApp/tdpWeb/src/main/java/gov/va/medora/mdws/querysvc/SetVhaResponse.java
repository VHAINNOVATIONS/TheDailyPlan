
package gov.va.medora.mdws.querysvc;

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
 *         &lt;element name="setVhaResult" type="{http://mdws.medora.va.gov/QuerySvc}SiteArray" minOccurs="0"/>
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
    "setVhaResult"
})
@XmlRootElement(name = "setVhaResponse")
public class SetVhaResponse {

    protected SiteArray setVhaResult;

    /**
     * Gets the value of the setVhaResult property.
     * 
     * @return
     *     possible object is
     *     {@link SiteArray }
     *     
     */
    public SiteArray getSetVhaResult() {
        return setVhaResult;
    }

    /**
     * Sets the value of the setVhaResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link SiteArray }
     *     
     */
    public void setSetVhaResult(SiteArray value) {
        this.setVhaResult = value;
    }

}
