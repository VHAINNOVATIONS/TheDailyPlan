
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for SurgeryReportTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="SurgeryReportTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="title" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="timestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="author" type="{http://mdws.medora.va.gov/EmrSvc}AuthorTO" minOccurs="0"/>
 *         &lt;element name="text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="facility" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="status" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="specialty" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="preOpDx" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="postOpDx" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="labWork" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="dictationTimestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="transcriptionTimestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "SurgeryReportTO", propOrder = {
    "id",
    "title",
    "timestamp",
    "author",
    "text",
    "facility",
    "status",
    "specialty",
    "preOpDx",
    "postOpDx",
    "labWork",
    "dictationTimestamp",
    "transcriptionTimestamp"
})
public class SurgeryReportTO
    extends AbstractTO
{

    protected String id;
    protected String title;
    protected String timestamp;
    protected AuthorTO author;
    protected String text;
    protected TaggedText facility;
    protected String status;
    protected TaggedText specialty;
    protected String preOpDx;
    protected String postOpDx;
    protected String labWork;
    protected String dictationTimestamp;
    protected String transcriptionTimestamp;

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
     * Gets the value of the title property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets the value of the title property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTitle(String value) {
        this.title = value;
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
     * Gets the value of the author property.
     * 
     * @return
     *     possible object is
     *     {@link AuthorTO }
     *     
     */
    public AuthorTO getAuthor() {
        return author;
    }

    /**
     * Sets the value of the author property.
     * 
     * @param value
     *     allowed object is
     *     {@link AuthorTO }
     *     
     */
    public void setAuthor(AuthorTO value) {
        this.author = value;
    }

    /**
     * Gets the value of the text property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getText() {
        return text;
    }

    /**
     * Sets the value of the text property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setText(String value) {
        this.text = value;
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
     * Gets the value of the status property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStatus() {
        return status;
    }

    /**
     * Sets the value of the status property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStatus(String value) {
        this.status = value;
    }

    /**
     * Gets the value of the specialty property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedText }
     *     
     */
    public TaggedText getSpecialty() {
        return specialty;
    }

    /**
     * Sets the value of the specialty property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedText }
     *     
     */
    public void setSpecialty(TaggedText value) {
        this.specialty = value;
    }

    /**
     * Gets the value of the preOpDx property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPreOpDx() {
        return preOpDx;
    }

    /**
     * Sets the value of the preOpDx property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPreOpDx(String value) {
        this.preOpDx = value;
    }

    /**
     * Gets the value of the postOpDx property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPostOpDx() {
        return postOpDx;
    }

    /**
     * Sets the value of the postOpDx property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPostOpDx(String value) {
        this.postOpDx = value;
    }

    /**
     * Gets the value of the labWork property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLabWork() {
        return labWork;
    }

    /**
     * Sets the value of the labWork property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLabWork(String value) {
        this.labWork = value;
    }

    /**
     * Gets the value of the dictationTimestamp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDictationTimestamp() {
        return dictationTimestamp;
    }

    /**
     * Sets the value of the dictationTimestamp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDictationTimestamp(String value) {
        this.dictationTimestamp = value;
    }

    /**
     * Gets the value of the transcriptionTimestamp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTranscriptionTimestamp() {
        return transcriptionTimestamp;
    }

    /**
     * Sets the value of the transcriptionTimestamp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTranscriptionTimestamp(String value) {
        this.transcriptionTimestamp = value;
    }

}
