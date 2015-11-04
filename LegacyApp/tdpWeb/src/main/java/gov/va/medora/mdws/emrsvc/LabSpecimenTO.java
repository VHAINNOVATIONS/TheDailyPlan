
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for LabSpecimenTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="LabSpecimenTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="collectionDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="accessionNum" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="site" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
@XmlType(name = "LabSpecimenTO", propOrder = {
    "id",
    "name",
    "collectionDate",
    "accessionNum",
    "site",
    "facility"
})
public class LabSpecimenTO
    extends AbstractTO
{

    protected String id;
    protected String name;
    protected String collectionDate;
    protected String accessionNum;
    protected String site;
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
     * Gets the value of the collectionDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCollectionDate() {
        return collectionDate;
    }

    /**
     * Sets the value of the collectionDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCollectionDate(String value) {
        this.collectionDate = value;
    }

    /**
     * Gets the value of the accessionNum property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccessionNum() {
        return accessionNum;
    }

    /**
     * Sets the value of the accessionNum property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccessionNum(String value) {
        this.accessionNum = value;
    }

    /**
     * Gets the value of the site property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSite() {
        return site;
    }

    /**
     * Sets the value of the site property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSite(String value) {
        this.site = value;
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
