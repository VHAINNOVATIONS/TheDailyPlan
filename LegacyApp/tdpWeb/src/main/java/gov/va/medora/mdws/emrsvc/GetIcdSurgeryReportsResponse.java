
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
 *         &lt;element name="getIcdSurgeryReportsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedIcdRptArrays" minOccurs="0"/>
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
    "getIcdSurgeryReportsResult"
})
@XmlRootElement(name = "getIcdSurgeryReportsResponse")
public class GetIcdSurgeryReportsResponse {

    protected TaggedIcdRptArrays getIcdSurgeryReportsResult;

    /**
     * Gets the value of the getIcdSurgeryReportsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedIcdRptArrays }
     *     
     */
    public TaggedIcdRptArrays getGetIcdSurgeryReportsResult() {
        return getIcdSurgeryReportsResult;
    }

    /**
     * Sets the value of the getIcdSurgeryReportsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedIcdRptArrays }
     *     
     */
    public void setGetIcdSurgeryReportsResult(TaggedIcdRptArrays value) {
        this.getIcdSurgeryReportsResult = value;
    }

}
