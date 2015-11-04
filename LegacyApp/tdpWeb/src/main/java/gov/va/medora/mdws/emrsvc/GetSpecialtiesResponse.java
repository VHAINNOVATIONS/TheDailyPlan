
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
 *         &lt;element name="getSpecialtiesResult" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
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
    "getSpecialtiesResult"
})
@XmlRootElement(name = "getSpecialtiesResponse")
public class GetSpecialtiesResponse {

    protected TaggedText getSpecialtiesResult;

    /**
     * Gets the value of the getSpecialtiesResult property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedText }
     *     
     */
    public TaggedText getGetSpecialtiesResult() {
        return getSpecialtiesResult;
    }

    /**
     * Sets the value of the getSpecialtiesResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedText }
     *     
     */
    public void setGetSpecialtiesResult(TaggedText value) {
        this.getSpecialtiesResult = value;
    }

}
