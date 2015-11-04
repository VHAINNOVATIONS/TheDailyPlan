
package gov.va.medora.mdws.querysvc;

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
 *         &lt;element name="ddrGetsEntryResult" type="{http://mdws.medora.va.gov/QuerySvc}TextArray" minOccurs="0"/>
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
    "ddrGetsEntryResult"
})
@XmlRootElement(name = "ddrGetsEntryResponse")
public class DdrGetsEntryResponse {

    protected TextArray ddrGetsEntryResult;

    /**
     * Gets the value of the ddrGetsEntryResult property.
     * 
     * @return
     *     possible object is
     *     {@link TextArray }
     *     
     */
    public TextArray getDdrGetsEntryResult() {
        return ddrGetsEntryResult;
    }

    /**
     * Sets the value of the ddrGetsEntryResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TextArray }
     *     
     */
    public void setDdrGetsEntryResult(TextArray value) {
        this.ddrGetsEntryResult = value;
    }

}
