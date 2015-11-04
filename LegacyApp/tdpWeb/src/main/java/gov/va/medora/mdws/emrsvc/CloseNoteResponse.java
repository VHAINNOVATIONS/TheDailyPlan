
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
 *         &lt;element name="closeNoteResult" type="{http://mdws.medora.va.gov/EmrSvc}TextTO" minOccurs="0"/>
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
    "closeNoteResult"
})
@XmlRootElement(name = "closeNoteResponse")
public class CloseNoteResponse {

    protected TextTO closeNoteResult;

    /**
     * Gets the value of the closeNoteResult property.
     * 
     * @return
     *     possible object is
     *     {@link TextTO }
     *     
     */
    public TextTO getCloseNoteResult() {
        return closeNoteResult;
    }

    /**
     * Sets the value of the closeNoteResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TextTO }
     *     
     */
    public void setCloseNoteResult(TextTO value) {
        this.closeNoteResult = value;
    }

}
