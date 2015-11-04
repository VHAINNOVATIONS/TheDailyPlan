
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
 *         &lt;element name="visit200Result" type="{http://mdws.medora.va.gov/EmrSvc}TaggedTextArray" minOccurs="0"/>
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
    "visit200Result"
})
@XmlRootElement(name = "visit200Response")
public class Visit200Response {

    protected TaggedTextArray visit200Result;

    /**
     * Gets the value of the visit200Result property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedTextArray }
     *     
     */
    public TaggedTextArray getVisit200Result() {
        return visit200Result;
    }

    /**
     * Sets the value of the visit200Result property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedTextArray }
     *     
     */
    public void setVisit200Result(TaggedTextArray value) {
        this.visit200Result = value;
    }

}
