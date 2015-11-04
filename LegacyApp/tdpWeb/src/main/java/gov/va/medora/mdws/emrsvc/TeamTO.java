
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TeamTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TeamTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="pcpName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="attendingName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TeamTO", propOrder = {
    "id",
    "name",
    "pcpName",
    "attendingName"
})
public class TeamTO
    extends AbstractTO
{

    protected String id;
    protected String name;
    protected String pcpName;
    protected String attendingName;

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
     * Gets the value of the pcpName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPcpName() {
        return pcpName;
    }

    /**
     * Sets the value of the pcpName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPcpName(String value) {
        this.pcpName = value;
    }

    /**
     * Gets the value of the attendingName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAttendingName() {
        return attendingName;
    }

    /**
     * Sets the value of the attendingName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAttendingName(String value) {
        this.attendingName = value;
    }

}
