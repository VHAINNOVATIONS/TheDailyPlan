
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
 *         &lt;element name="setupMultiSiteQueryResult" type="{http://mdws.medora.va.gov/EmrSvc}SiteArray" minOccurs="0"/>
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
    "setupMultiSiteQueryResult"
})
@XmlRootElement(name = "setupMultiSiteQueryResponse")
public class SetupMultiSiteQueryResponse {

    protected SiteArray setupMultiSiteQueryResult;

    /**
     * Gets the value of the setupMultiSiteQueryResult property.
     * 
     * @return
     *     possible object is
     *     {@link SiteArray }
     *     
     */
    public SiteArray getSetupMultiSiteQueryResult() {
        return setupMultiSiteQueryResult;
    }

    /**
     * Sets the value of the setupMultiSiteQueryResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link SiteArray }
     *     
     */
    public void setSetupMultiSiteQueryResult(SiteArray value) {
        this.setupMultiSiteQueryResult = value;
    }

}
