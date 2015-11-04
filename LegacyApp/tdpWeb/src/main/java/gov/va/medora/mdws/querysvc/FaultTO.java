
package gov.va.medora.mdws.querysvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for FaultTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="FaultTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="type" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="message" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="stackTrace" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="innerType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="innerMessage" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="innerStackTrace" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="suggestion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "FaultTO", propOrder = {
    "type",
    "message",
    "stackTrace",
    "innerType",
    "innerMessage",
    "innerStackTrace",
    "suggestion"
})
public class FaultTO {

    protected String type;
    protected String message;
    protected String stackTrace;
    protected String innerType;
    protected String innerMessage;
    protected String innerStackTrace;
    protected String suggestion;

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setType(String value) {
        this.type = value;
    }

    /**
     * Gets the value of the message property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the value of the message property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMessage(String value) {
        this.message = value;
    }

    /**
     * Gets the value of the stackTrace property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStackTrace() {
        return stackTrace;
    }

    /**
     * Sets the value of the stackTrace property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStackTrace(String value) {
        this.stackTrace = value;
    }

    /**
     * Gets the value of the innerType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInnerType() {
        return innerType;
    }

    /**
     * Sets the value of the innerType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInnerType(String value) {
        this.innerType = value;
    }

    /**
     * Gets the value of the innerMessage property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInnerMessage() {
        return innerMessage;
    }

    /**
     * Sets the value of the innerMessage property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInnerMessage(String value) {
        this.innerMessage = value;
    }

    /**
     * Gets the value of the innerStackTrace property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInnerStackTrace() {
        return innerStackTrace;
    }

    /**
     * Sets the value of the innerStackTrace property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInnerStackTrace(String value) {
        this.innerStackTrace = value;
    }

    /**
     * Gets the value of the suggestion property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSuggestion() {
        return suggestion;
    }

    /**
     * Sets the value of the suggestion property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSuggestion(String value) {
        this.suggestion = value;
    }

}
