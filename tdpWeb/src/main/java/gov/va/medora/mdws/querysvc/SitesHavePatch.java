
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
 *         &lt;element name="sitelist" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="patchId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "sitelist",
    "patchId"
})
@XmlRootElement(name = "sitesHavePatch")
public class SitesHavePatch {

    protected String sitelist;
    protected String patchId;

    /**
     * Gets the value of the sitelist property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSitelist() {
        return sitelist;
    }

    /**
     * Sets the value of the sitelist property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSitelist(String value) {
        this.sitelist = value;
    }

    /**
     * Gets the value of the patchId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPatchId() {
        return patchId;
    }

    /**
     * Sets the value of the patchId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPatchId(String value) {
        this.patchId = value;
    }

}
