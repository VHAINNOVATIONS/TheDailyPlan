
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
 *         &lt;element name="matchResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedPatientArrays" minOccurs="0"/>
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
    "matchResult"
})
@XmlRootElement(name = "matchResponse")
public class MatchResponse {

    protected TaggedPatientArrays matchResult;

    /**
     * Gets the value of the matchResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedPatientArrays }
     *     
     */
    public TaggedPatientArrays getMatchResult() {
        return matchResult;
    }

    /**
     * Sets the value of the matchResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedPatientArrays }
     *     
     */
    public void setMatchResult(TaggedPatientArrays value) {
        this.matchResult = value;
    }

}
