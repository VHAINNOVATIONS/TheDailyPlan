
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
 *         &lt;element name="getTransfersReportsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedTextArray" minOccurs="0"/>
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
    "getTransfersReportsResult"
})
@XmlRootElement(name = "getTransfersReportsResponse")
public class GetTransfersReportsResponse {

    protected TaggedTextArray getTransfersReportsResult;

    /**
     * Gets the value of the getTransfersReportsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedTextArray }
     *     
     */
    public TaggedTextArray getGetTransfersReportsResult() {
        return getTransfersReportsResult;
    }

    /**
     * Sets the value of the getTransfersReportsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedTextArray }
     *     
     */
    public void setGetTransfersReportsResult(TaggedTextArray value) {
        this.getTransfersReportsResult = value;
    }

}
