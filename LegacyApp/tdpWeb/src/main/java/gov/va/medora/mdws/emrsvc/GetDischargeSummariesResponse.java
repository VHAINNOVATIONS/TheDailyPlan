
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
 *         &lt;element name="getDischargeSummariesResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedNoteArrays" minOccurs="0"/>
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
    "getDischargeSummariesResult"
})
@XmlRootElement(name = "getDischargeSummariesResponse")
public class GetDischargeSummariesResponse {

    protected TaggedNoteArrays getDischargeSummariesResult;

    /**
     * Gets the value of the getDischargeSummariesResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedNoteArrays }
     *     
     */
    public TaggedNoteArrays getGetDischargeSummariesResult() {
        return getDischargeSummariesResult;
    }

    /**
     * Sets the value of the getDischargeSummariesResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedNoteArrays }
     *     
     */
    public void setGetDischargeSummariesResult(TaggedNoteArrays value) {
        this.getDischargeSummariesResult = value;
    }

}
