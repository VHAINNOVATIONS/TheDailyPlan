
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for NoteTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="NoteTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="timestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="admitTimestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="dischargeTimestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="serviceCategory" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="localTitle" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="standardTitle" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="author" type="{http://mdws.medora.va.gov/EmrSvc}AuthorTO" minOccurs="0"/>
 *         &lt;element name="location" type="{http://mdws.medora.va.gov/EmrSvc}HospitalLocationTO" minOccurs="0"/>
 *         &lt;element name="text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="hasAddendum" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="isAddendum" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="originalNoteID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="hasImages" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="itemId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="approvedBy" type="{http://mdws.medora.va.gov/EmrSvc}AuthorTO" minOccurs="0"/>
 *         &lt;element name="status" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "NoteTO", propOrder = {
    "id",
    "timestamp",
    "admitTimestamp",
    "dischargeTimestamp",
    "serviceCategory",
    "localTitle",
    "standardTitle",
    "author",
    "location",
    "text",
    "hasAddendum",
    "isAddendum",
    "originalNoteID",
    "hasImages",
    "itemId",
    "approvedBy",
    "status"
})
public class NoteTO
    extends AbstractTO
{

    protected String id;
    protected String timestamp;
    protected String admitTimestamp;
    protected String dischargeTimestamp;
    protected String serviceCategory;
    protected String localTitle;
    protected String standardTitle;
    protected AuthorTO author;
    protected HospitalLocationTO location;
    protected String text;
    protected boolean hasAddendum;
    protected boolean isAddendum;
    protected String originalNoteID;
    protected boolean hasImages;
    protected String itemId;
    protected AuthorTO approvedBy;
    protected String status;

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
     * Gets the value of the admitTimestamp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAdmitTimestamp() {
        return admitTimestamp;
    }

    /**
     * Sets the value of the admitTimestamp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAdmitTimestamp(String value) {
        this.admitTimestamp = value;
    }

    /**
     * Gets the value of the dischargeTimestamp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDischargeTimestamp() {
        return dischargeTimestamp;
    }

    /**
     * Sets the value of the dischargeTimestamp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDischargeTimestamp(String value) {
        this.dischargeTimestamp = value;
    }

    /**
     * Gets the value of the serviceCategory property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getServiceCategory() {
        return serviceCategory;
    }

    /**
     * Sets the value of the serviceCategory property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setServiceCategory(String value) {
        this.serviceCategory = value;
    }

    /**
     * Gets the value of the localTitle property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLocalTitle() {
        return localTitle;
    }

    /**
     * Sets the value of the localTitle property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLocalTitle(String value) {
        this.localTitle = value;
    }

    /**
     * Gets the value of the standardTitle property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStandardTitle() {
        return standardTitle;
    }

    /**
     * Sets the value of the standardTitle property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStandardTitle(String value) {
        this.standardTitle = value;
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
     * Gets the value of the hasAddendum property.
     * 
     */
    public boolean isHasAddendum() {
        return hasAddendum;
    }

    /**
     * Sets the value of the hasAddendum property.
     * 
     */
    public void setHasAddendum(boolean value) {
        this.hasAddendum = value;
    }

    /**
     * Gets the value of the isAddendum property.
     * 
     */
    public boolean isIsAddendum() {
        return isAddendum;
    }

    /**
     * Sets the value of the isAddendum property.
     * 
     */
    public void setIsAddendum(boolean value) {
        this.isAddendum = value;
    }

    /**
     * Gets the value of the originalNoteID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOriginalNoteID() {
        return originalNoteID;
    }

    /**
     * Sets the value of the originalNoteID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOriginalNoteID(String value) {
        this.originalNoteID = value;
    }

    /**
     * Gets the value of the hasImages property.
     * 
     */
    public boolean isHasImages() {
        return hasImages;
    }

    /**
     * Sets the value of the hasImages property.
     * 
     */
    public void setHasImages(boolean value) {
        this.hasImages = value;
    }

    /**
     * Gets the value of the itemId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getItemId() {
        return itemId;
    }

    /**
     * Sets the value of the itemId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setItemId(String value) {
        this.itemId = value;
    }

    /**
     * Gets the value of the approvedBy property.
     * 
     * @return
     *     possible object is
     *     {@link AuthorTO }
     *     
     */
    public AuthorTO getApprovedBy() {
        return approvedBy;
    }

    /**
     * Sets the value of the approvedBy property.
     * 
     * @param value
     *     allowed object is
     *     {@link AuthorTO }
     *     
     */
    public void setApprovedBy(AuthorTO value) {
        this.approvedBy = value;
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

}
