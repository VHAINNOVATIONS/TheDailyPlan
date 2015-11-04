
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
 *         &lt;element name="getOutpatientRxProfileResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedTextArray" minOccurs="0"/>
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
    "getOutpatientRxProfileResult"
})
@XmlRootElement(name = "getOutpatientRxProfileResponse")
public class GetOutpatientRxProfileResponse {

    protected TaggedTextArray getOutpatientRxProfileResult;

    /**
     * Gets the value of the getOutpatientRxProfileResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedTextArray }
     *     
     */
    public TaggedTextArray getGetOutpatientRxProfileResult() {
        return getOutpatientRxProfileResult;
    }

    /**
     * Sets the value of the getOutpatientRxProfileResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedTextArray }
     *     
     */
    public void setGetOutpatientRxProfileResult(TaggedTextArray value) {
        this.getOutpatientRxProfileResult = value;
    }

}
