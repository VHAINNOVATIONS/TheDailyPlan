
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
 *         &lt;element name="getChemHemReportsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedChemHemRptArrays" minOccurs="0"/>
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
    "getChemHemReportsResult"
})
@XmlRootElement(name = "getChemHemReportsResponse")
public class GetChemHemReportsResponse {

    protected TaggedChemHemRptArrays getChemHemReportsResult;

    /**
     * Gets the value of the getChemHemReportsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedChemHemRptArrays }
     *     
     */
    public TaggedChemHemRptArrays getGetChemHemReportsResult() {
        return getChemHemReportsResult;
    }

    /**
     * Sets the value of the getChemHemReportsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedChemHemRptArrays }
     *     
     */
    public void setGetChemHemReportsResult(TaggedChemHemRptArrays value) {
        this.getChemHemReportsResult = value;
    }

}
