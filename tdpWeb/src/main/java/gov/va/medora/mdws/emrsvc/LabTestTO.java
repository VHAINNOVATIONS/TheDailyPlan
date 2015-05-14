
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for LabTestTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="LabTestTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="category" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="units" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lowRef" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="hiRef" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="refRange" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="loinc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "LabTestTO", propOrder = {
    "id",
    "name",
    "category",
    "units",
    "lowRef",
    "hiRef",
    "refRange",
    "loinc"
})
public class LabTestTO
    extends AbstractTO
{

    protected String id;
    protected String name;
    protected String category;
    protected String units;
    protected String lowRef;
    protected String hiRef;
    protected String refRange;
    protected String loinc;

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
     * Gets the value of the category property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCategory() {
        return category;
    }

    /**
     * Sets the value of the category property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCategory(String value) {
        this.category = value;
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
     * Gets the value of the lowRef property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLowRef() {
        return lowRef;
    }

    /**
     * Sets the value of the lowRef property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLowRef(String value) {
        this.lowRef = value;
    }

    /**
     * Gets the value of the hiRef property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHiRef() {
        return hiRef;
    }

    /**
     * Sets the value of the hiRef property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHiRef(String value) {
        this.hiRef = value;
    }

    /**
     * Gets the value of the refRange property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRefRange() {
        return refRange;
    }

    /**
     * Sets the value of the refRange property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRefRange(String value) {
        this.refRange = value;
    }

    /**
     * Gets the value of the loinc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLoinc() {
        return loinc;
    }

    /**
     * Sets the value of the loinc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLoinc(String value) {
        this.loinc = value;
    }

}
