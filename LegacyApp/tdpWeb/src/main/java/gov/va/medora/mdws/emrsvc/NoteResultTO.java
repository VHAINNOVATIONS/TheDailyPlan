
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for NoteResultTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="NoteResultTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="totalPages" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="lastPageRecd" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="explanation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "NoteResultTO", propOrder = {
    "id",
    "totalPages",
    "lastPageRecd",
    "explanation"
})
public class NoteResultTO
    extends AbstractTO
{

    protected String id;
    protected int totalPages;
    protected int lastPageRecd;
    protected String explanation;

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
     * Gets the value of the totalPages property.
     * 
     */
    public int getTotalPages() {
        return totalPages;
    }

    /**
     * Sets the value of the totalPages property.
     * 
     */
    public void setTotalPages(int value) {
        this.totalPages = value;
    }

    /**
     * Gets the value of the lastPageRecd property.
     * 
     */
    public int getLastPageRecd() {
        return lastPageRecd;
    }

    /**
     * Sets the value of the lastPageRecd property.
     * 
     */
    public void setLastPageRecd(int value) {
        this.lastPageRecd = value;
    }

    /**
     * Gets the value of the explanation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExplanation() {
        return explanation;
    }

    /**
     * Sets the value of the explanation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExplanation(String value) {
        this.explanation = value;
    }

}
