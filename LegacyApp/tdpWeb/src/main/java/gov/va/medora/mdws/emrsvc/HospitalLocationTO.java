
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for HospitalLocationTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="HospitalLocationTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="department" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="service" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="specialty" type="{http://mdws.medora.va.gov/EmrSvc}TaggedText" minOccurs="0"/>
 *         &lt;element name="facility" type="{http://mdws.medora.va.gov/EmrSvc}SiteTO" minOccurs="0"/>
 *         &lt;element name="building" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="floor" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="room" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="bed" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="status" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="phone" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="appointmentTimestamp" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="type" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "HospitalLocationTO", propOrder = {
    "id",
    "name",
    "department",
    "service",
    "specialty",
    "facility",
    "building",
    "floor",
    "room",
    "bed",
    "status",
    "phone",
    "appointmentTimestamp",
    "type"
})
public class HospitalLocationTO
    extends AbstractTO
{

    protected String id;
    protected String name;
    protected TaggedText department;
    protected TaggedText service;
    protected TaggedText specialty;
    protected SiteTO facility;
    protected String building;
    protected String floor;
    protected String room;
    protected String bed;
    protected String status;
    protected String phone;
    protected String appointmentTimestamp;
    protected String type;

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
     * Gets the value of the department property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedText }
     *     
     */
    public TaggedText getDepartment() {
        return department;
    }

    /**
     * Sets the value of the department property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedText }
     *     
     */
    public void setDepartment(TaggedText value) {
        this.department = value;
    }

    /**
     * Gets the value of the service property.
     * 
     * @return
     *     possible object is
     *     {@link TaggedText }
     *     
     */
    public TaggedText getService() {
        return service;
    }

    /**
     * Sets the value of the service property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaggedText }
     *     
     */
    public void setService(TaggedText value) {
        this.service = value;
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
     * Gets the value of the facility property.
     * 
     * @return
     *     possible object is
     *     {@link SiteTO }
     *     
     */
    public SiteTO getFacility() {
        return facility;
    }

    /**
     * Sets the value of the facility property.
     * 
     * @param value
     *     allowed object is
     *     {@link SiteTO }
     *     
     */
    public void setFacility(SiteTO value) {
        this.facility = value;
    }

    /**
     * Gets the value of the building property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBuilding() {
        return building;
    }

    /**
     * Sets the value of the building property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBuilding(String value) {
        this.building = value;
    }

    /**
     * Gets the value of the floor property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFloor() {
        return floor;
    }

    /**
     * Sets the value of the floor property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFloor(String value) {
        this.floor = value;
    }

    /**
     * Gets the value of the room property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRoom() {
        return room;
    }

    /**
     * Sets the value of the room property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRoom(String value) {
        this.room = value;
    }

    /**
     * Gets the value of the bed property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBed() {
        return bed;
    }

    /**
     * Sets the value of the bed property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBed(String value) {
        this.bed = value;
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
     * Gets the value of the phone property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPhone() {
        return phone;
    }

    /**
     * Sets the value of the phone property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPhone(String value) {
        this.phone = value;
    }

    /**
     * Gets the value of the appointmentTimestamp property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAppointmentTimestamp() {
        return appointmentTimestamp;
    }

    /**
     * Sets the value of the appointmentTimestamp property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAppointmentTimestamp(String value) {
        this.appointmentTimestamp = value;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setType(String value) {
        this.type = value;
    }

}
