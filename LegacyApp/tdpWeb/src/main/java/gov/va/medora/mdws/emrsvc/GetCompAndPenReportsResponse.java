
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
 *         &lt;element name="getCompAndPenReportsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedTextArray" minOccurs="0"/>
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
    "getCompAndPenReportsResult"
})
@XmlRootElement(name = "getCompAndPenReportsResponse")
public class GetCompAndPenReportsResponse {

    protected TaggedTextArray getCompAndPenReportsResult;

    /**
     * Gets the value of the getCompAndPenReportsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedTextArray }
     *     
     */
    public TaggedTextArray getGetCompAndPenReportsResult() {
        return getCompAndPenReportsResult;
    }

    /**
     * Sets the value of the getCompAndPenReportsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedTextArray }
     *     
     */
    public void setGetCompAndPenReportsResult(TaggedTextArray value) {
        this.getCompAndPenReportsResult = value;
    }

}
