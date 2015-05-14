
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AllergyTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AllergyTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="allergenId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="allergenName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="allergenType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="reaction" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="severity" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="comment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="timestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="facility" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="location" type="{http://mdws.medora.va.gov/EmrSvc}HospitalLocationTO" minOccurs="0"/>
 *         &lt;element name="type" type="{http://mdws.medora.va.gov/EmrSvc}ObservationTypeTO" minOccurs="0"/>
 *         &lt;element name="observer" type="{http://mdws.medora.va.gov/EmrSvc}AuthorTO" minOccurs="0"/>
 *         &lt;element name="recorder" type="{http://mdws.medora.va.gov/EmrSvc}AuthorTO" minOccurs="0"/>
 *         &lt;element name="reactions" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfSymptomTO" minOccurs="0"/>
 *         &lt;element name="drugIngredients" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfTaggedText" minOccurs="0"/>
 *         &lt;element name="drugClasses" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfTaggedText" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AllergyTO", propOrder = {
    "allergenId",
    "allergenName",
    "allergenType",
    "reaction",
    "severity",
    "comment",
    "timestamp",
    "facility",
    "location",
    "type",
    "observer",
    "recorder",
    "reactions",
    "drugIngredients",
    "drugClasses"
})
public class AllergyTO
    extends AbstractTO
{

    protected String allergenId;
    protected String allergenName;
    protected String allergenType;
    protected String reaction;
    protected String severity;
    protected String comment;
    protected String timestamp;
    protected TaggedText facility;
    protected HospitalLocationTO location;
    protected ObservationTypeTO type;
    protected AuthorTO observer;
    protected AuthorTO recorder;
    protected ArrayOfSymptomTO reactions;
    protected ArrayOfTaggedText drugIngredients;
    protected ArrayOfTaggedText drugClasses;

    /**
     * Gets the value of the allergenId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAllergenId() {
        return allergenId;
    }

    /**
     * Sets the value of the allergenId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAllergenId(String value) {
        this.allergenId = value;
    }

    /**
     * Gets the value of the allergenName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAllergenName() {
        return allergenName;
    }

    /**
     * Sets the value of the allergenName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAllergenName(String value) {
        this.allergenName = value;
    }

    /**
     * Gets the value of the allergenType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAllergenType() {
        return allergenType;
    }

    /**
     * Sets the value of the allergenType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAllergenType(String value) {
        this.allergenType = value;
    }

    /**
     * Gets the value of the reaction property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getReaction() {
        return reaction;
    }

    /**
     * Sets the value of the reaction property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setReaction(String value) {
        this.reaction = value;
    }

    /**
     * Gets the value of the severity property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSeverity() {
        return severity;
    }

    /**
     * Sets the value of the severity property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSeverity(String value) {
        this.severity = value;
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
     * Gets the value of the reactions property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfSymptomTO }
     *     
     */
    public ArrayOfSymptomTO getReactions() {
        return reactions;
    }

    /**
     * Sets the value of the reactions property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfSymptomTO }
     *     
     */
    public void setReactions(ArrayOfSymptomTO value) {
        this.reactions = value;
    }

    /**
     * Gets the value of the drugIngredients property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfTaggedText }
     *     
     */
    public ArrayOfTaggedText getDrugIngredients() {
        return drugIngredients;
    }

    /**
     * Sets the value of the drugIngredients property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfTaggedText }
     *     
     */
    public void setDrugIngredients(ArrayOfTaggedText value) {
        this.drugIngredients = value;
    }

    /**
     * Gets the value of the drugClasses property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfTaggedText }
     *     
     */
    public ArrayOfTaggedText getDrugClasses() {
        return drugClasses;
    }

    /**
     * Sets the value of the drugClasses property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfTaggedText }
     *     
     */
    public void setDrugClasses(ArrayOfTaggedText value) {
        this.drugClasses = value;
    }

}
