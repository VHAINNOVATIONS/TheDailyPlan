
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ChemHemRpt complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ChemHemRpt">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="title" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="timestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="author" type="{http://mdws.medora.va.gov/EmrSvc}AuthorTO" minOccurs="0"/>
 *         &lt;element name="facility" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="specimen" type="{http://mdws.medora.va.gov/EmrSvc}LabSpecimenTO" minOccurs="0"/>
 *         &lt;element name="comment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="results" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfLabResultTO" minOccurs="0"/>
 *         &lt;element name="labSites" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfSiteTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ChemHemRpt", propOrder = {
    "id",
    "title",
    "timestamp",
    "author",
    "facility",
    "specimen",
    "comment",
    "results",
    "labSites"
})
public class ChemHemRpt
    extends AbstractTO
{

    protected String id;
    protected String title;
    protected String timestamp;
    protected AuthorTO author;
    protected TaggedText facility;
    protected LabSpecimenTO specimen;
    protected String comment;
    protected ArrayOfLabResultTO results;
    protected ArrayOfSiteTO labSites;

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
     * Gets the value of the specimen property.
     * 
     * @return
     *     possible object is
     *     {@link LabSpecimenTO }
     *     
     */
    public LabSpecimenTO getSpecimen() {
        return specimen;
    }

    /**
     * Sets the value of the specimen property.
     * 
     * @param value
     *     allowed object is
     *     {@link LabSpecimenTO }
     *     
     */
    public void setSpecimen(LabSpecimenTO value) {
        this.specimen = value;
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
     * Gets the value of the results property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfLabResultTO }
     *     
     */
    public ArrayOfLabResultTO getResults() {
        return results;
    }

    /**
     * Sets the value of the results property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfLabResultTO }
     *     
     */
    public void setResults(ArrayOfLabResultTO value) {
        this.results = value;
    }

    /**
     * Gets the value of the labSites property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfSiteTO }
     *     
     */
    public ArrayOfSiteTO getLabSites() {
        return labSites;
    }

    /**
     * Sets the value of the labSites property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfSiteTO }
     *     
     */
    public void setLabSites(ArrayOfSiteTO value) {
        this.labSites = value;
    }

}
