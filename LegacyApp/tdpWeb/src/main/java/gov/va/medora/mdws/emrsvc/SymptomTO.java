
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for SymptomTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="SymptomTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="isNational" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="vuid" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="type" type="{http://mdws.medora.va.gov/EmrSvc}ObservationTypeTO" minOccurs="0"/>
 *         &lt;element name="observer" type="{http://mdws.medora.va.gov/EmrSvc}AuthorTO" minOccurs="0"/>
 *         &lt;element name="timestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="facility" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "SymptomTO", propOrder = {
    "id",
    "name",
    "isNational",
    "vuid",
    "type",
    "observer",
    "timestamp",
    "facility"
})
public class SymptomTO
    extends AbstractTO
{

    protected String id;
    protected String name;
    protected boolean isNational;
    protected String vuid;
    protected ObservationTypeTO type;
    protected AuthorTO observer;
    protected String timestamp;
    protected TaggedText facility;

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
    }

    /**
     * Gets the value of the name property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the value of the name property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setName(String value) {
        this.name = value;
    }

    /**
     * Gets the value of the isNational property.
     * 
     */
    public boolean isIsNational() {
        return isNational;
    }

    /**
     * Sets the value of the isNational property.
     * 
     */
    public void setIsNational(boolean value) {
        this.isNational = value;
    }

    /**
     * Gets the value of the vuid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVuid() {
        return vuid;
    }

    /**
     * Sets the value of the vuid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVuid(String value) {
        this.vuid = value;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link ObservationTypeTO }
     *     
     */
    public ObservationTypeTO getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link ObservationTypeTO }
     *     
     */
    public void setType(ObservationTypeTO value) {
        this.type = value;
    }

    /**
     * Gets the value of the observer property.
     * 
     * @return
     *     possible object is
     *     {@link AuthorTO }
     *     
     */
    public AuthorTO getObserver() {
        return observer;
    }

    /**
     * Sets the value of the observer property.
     * 
     * @param value
     *     allowed object is
     *     {@link AuthorTO }
     *     
     */
    public void setObserver(AuthorTO value) {
        this.observer = value;
    }

    /**
     * Gets the value of the timestamp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTimestamp() {
        return timestamp;
    }

    /**
     * Sets the value of the timestamp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTimestamp(String value) {
        this.timestamp = value;
    }

    /**
     * Gets the value of the facility property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedText }
     *     
     */
    public TaggedText getFacility() {
        return facility;
    }

    /**
     * Sets the value of the facility property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedText }
     *     
     */
    public void setFacility(TaggedText value) {
        this.facility = value;
    }

}
