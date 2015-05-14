
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
 *         &lt;element name="writeSimpleOrderByPolicyResult" type="{http://mdws.medora.va.gov/EmrSvc}OrderTO" minOccurs="0"/>
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
    "writeSimpleOrderByPolicyResult"
})
@XmlRootElement(name = "writeSimpleOrderByPolicyResponse")
public class WriteSimpleOrderByPolicyResponse {

    protected OrderTO writeSimpleOrderByPolicyResult;

    /**
     * Gets the value of the writeSimpleOrderByPolicyResult property.
     * 
     * @return
     *     possible object is
     *     {@link OrderTO }
     *     
     */
    public OrderTO getWriteSimpleOrderByPolicyResult() {
        return writeSimpleOrderByPolicyResult;
    }

    /**
     * Sets the value of the writeSimpleOrderByPolicyResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link OrderTO }
     *     
     */
    public void setWriteSimpleOrderByPolicyResult(OrderTO value) {
        this.writeSimpleOrderByPolicyResult = value;
    }

}
