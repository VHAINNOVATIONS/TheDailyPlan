
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
 *         &lt;element name="noteIEN" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="consultIEN" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "noteIEN",
    "consultIEN"
})
@XmlRootElement(name = "closeNote")
public class CloseNote {

    protected String noteIEN;
    protected String consultIEN;

    /**
     * Gets the value of the noteIEN property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNoteIEN() {
        return noteIEN;
    }

    /**
     * Sets the value of the noteIEN property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNoteIEN(String value) {
        this.noteIEN = value;
    }

    /**
     * Gets the value of the consultIEN property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getConsultIEN() {
        return consultIEN;
    }

    /**
     * Sets the value of the consultIEN property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setConsultIEN(String value) {
        this.consultIEN = value;
    }

}
