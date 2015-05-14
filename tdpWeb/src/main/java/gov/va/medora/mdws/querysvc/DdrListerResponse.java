
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
 *         &lt;element name="ddrListerResult" type="{http://mdws.medora.va.gov/QuerySvc}TextArray" minOccurs="0"/>
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
    "ddrListerResult"
})
@XmlRootElement(name = "ddrListerResponse")
public class DdrListerResponse {

    protected TextArray ddrListerResult;

    /**
     * Gets the value of the ddrListerResult property.
     * 
     * @return
     *     possible object is
     *     {@link TextArray }
     *     
     */
    public TextArray getDdrListerResult() {
        return ddrListerResult;
    }

    /**
     * Sets the value of the ddrListerResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link TextArray }
     *     
     */
    public void setDdrListerResult(TextArray value) {
        this.ddrListerResult = value;
    }

}
