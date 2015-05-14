
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
 *         &lt;element name="getProblemListResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedProblemArrays" minOccurs="0"/>
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
    "getProblemListResult"
})
@XmlRootElement(name = "getProblemListResponse")
public class GetProblemListResponse {

    protected TaggedProblemArrays getProblemListResult;

    /**
     * Gets the value of the getProblemListResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedProblemArrays }
     *     
     */
    public TaggedProblemArrays getGetProblemListResult() {
        return getProblemListResult;
    }

    /**
     * Sets the value of the getProblemListResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedProblemArrays }
     *     
     */
    public void setGetProblemListResult(TaggedProblemArrays value) {
        this.getProblemListResult = value;
    }

}
