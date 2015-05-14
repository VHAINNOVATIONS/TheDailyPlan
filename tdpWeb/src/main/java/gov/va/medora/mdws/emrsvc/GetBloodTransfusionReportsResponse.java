
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
 *         &lt;element name="getBloodTransfusionReportsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedTextArray" minOccurs="0"/>
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
    "getBloodTransfusionReportsResult"
})
@XmlRootElement(name = "getBloodTransfusionReportsResponse")
public class GetBloodTransfusionReportsResponse {

    protected TaggedTextArray getBloodTransfusionReportsResult;

    /**
     * Gets the value of the getBloodTransfusionReportsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedTextArray }
     *     
     */
    public TaggedTextArray getGetBloodTransfusionReportsResult() {
        return getBloodTransfusionReportsResult;
    }

    /**
     * Sets the value of the getBloodTransfusionReportsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedTextArray }
     *     
     */
    public void setGetBloodTransfusionReportsResult(TaggedTextArray value) {
        this.getBloodTransfusionReportsResult = value;
    }

}
