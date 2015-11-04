
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
 *         &lt;element name="getSurgicalPathologyReportsResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedSurgicalPathologyRptArrays" minOccurs="0"/>
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
    "getSurgicalPathologyReportsResult"
})
@XmlRootElement(name = "getSurgicalPathologyReportsResponse")
public class GetSurgicalPathologyReportsResponse {

    protected TaggedSurgicalPathologyRptArrays getSurgicalPathologyReportsResult;

    /**
     * Gets the value of the getSurgicalPathologyReportsResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedSurgicalPathologyRptArrays }
     *     
     */
    public TaggedSurgicalPathologyRptArrays getGetSurgicalPathologyReportsResult() {
        return getSurgicalPathologyReportsResult;
    }

    /**
     * Sets the value of the getSurgicalPathologyReportsResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedSurgicalPathologyRptArrays }
     *     
     */
    public void setGetSurgicalPathologyReportsResult(TaggedSurgicalPathologyRptArrays value) {
        this.getSurgicalPathologyReportsResult = value;
    }

}
