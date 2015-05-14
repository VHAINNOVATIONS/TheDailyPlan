
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
 *         &lt;element name="noteDefinitionIEN" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="noteTitle" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="visitString" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "noteDefinitionIEN",
    "noteTitle",
    "visitString"
})
@XmlRootElement(name = "isOneVisitNote")
public class IsOneVisitNote {

    protected String noteDefinitionIEN;
    protected String noteTitle;
    protected String visitString;

    /**
     * Gets the value of the noteDefinitionIEN property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNoteDefinitionIEN() {
        return noteDefinitionIEN;
    }

    /**
     * Sets the value of the noteDefinitionIEN property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNoteDefinitionIEN(String value) {
        this.noteDefinitionIEN = value;
    }

    /**
     * Gets the value of the noteTitle property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNoteTitle() {
        return noteTitle;
    }

    /**
     * Sets the value of the noteTitle property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNoteTitle(String value) {
        this.noteTitle = value;
    }

    /**
     * Gets the value of the visitString property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVisitString() {
        return visitString;
    }

    /**
     * Sets the value of the visitString property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVisitString(String value) {
        this.visitString = value;
    }

}
