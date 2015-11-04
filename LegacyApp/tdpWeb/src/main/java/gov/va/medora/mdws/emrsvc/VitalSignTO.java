
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for VitalSignTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="VitalSignTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="type" type="{http://mdws.medora.va.gov/EmrSvc}ObservationTypeTO" minOccurs="0"/>
 *         &lt;element name="value1" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="value2" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="observer" type="{http://mdws.medora.va.gov/EmrSvc}AuthorTO" minOccurs="0"/>
 *         &lt;element name="recorder" type="{http://mdws.medora.va.gov/EmrSvc}AuthorTO" minOccurs="0"/>
 *         &lt;element name="timestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="facility" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="location" type="{http://mdws.medora.va.gov/EmrSvc}HospitalLocationTO" minOccurs="0"/>
 *         &lt;element name="comment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="units" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="qualifiers" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "VitalSignTO", propOrder = {
    "type",
    "value1",
    "value2",
    "observer",
    "recorder",
    "timestamp",
    "facility",
    "location",
    "comment",
    "units",
    "qualifiers"
})
public class VitalSignTO
    extends AbstractTO
{

    protected ObservationTypeTO type;
    protected String value1;
    protected String value2;
    protected AuthorTO observer;
    protected AuthorTO recorder;
    protected String timestamp;
    protected TaggedText facility;
    protected HospitalLocationTO location;
    protected String comment;
    protected String units;
    protected String qualifiers;

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
     * Gets the value of the value1 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getValue1() {
        return value1;
    }

    /**
     * Sets the value of the value1 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setValue1(String value) {
        this.value1 = value;
    }

    /**
     * Gets the value of the value2 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getValue2() {
        return value2;
    }

    /**
     * Sets the value of the value2 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setValue2(String value) {
        this.value2 = value;
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
     * Gets the value of the recorder property.
     * 
     * @return
     *     possible object is
     *     {@link AuthorTO }
     *     
     */
    public AuthorTO getRecorder() {
        return recorder;
    }

    /**
     * Sets the value of the recorder property.
     * 
     * @param value
     *     allowed object is
     *     {@link AuthorTO }
     *     
     */
    public void setRecorder(AuthorTO value) {
        this.recorder = value;
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

    /**
     * Gets the value of the location property.
     * 
     * @return
     *     possible object is
     *     {@link HospitalLocationTO }
     *     
     */
    public HospitalLocationTO getLocation() {
        return location;
    }

    /**
     * Sets the value of the location property.
     * 
     * @param value
     *     allowed object is
     *     {@link HospitalLocationTO }
     *     
     */
    public void setLocation(HospitalLocationTO value) {
        this.location = value;
    }

    /**
     * Gets the value of the comment property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getComment() {
        return comment;
    }

    /**
     * Sets the value of the comment property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setComment(String value) {
        this.comment = value;
    }

    /**
     * Gets the value of the units property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUnits() {
        return units;
    }

    /**
     * Sets the value of the units property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUnits(String value) {
        this.units = value;
    }

    /**
     * Gets the value of the qualifiers property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getQualifiers() {
        return qualifiers;
    }

    /**
     * Sets the value of the qualifiers property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setQualifiers(String value) {
        this.qualifiers = value;
    }

}
