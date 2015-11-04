
package gov.va.medora.mdws.querysvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for DemographicSetTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DemographicSetTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="tag" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="addresses" type="{http://mdws.medora.va.gov/QuerySvc}ArrayOfAddressTO" minOccurs="0"/>
 *         &lt;element name="phones" type="{http://mdws.medora.va.gov/QuerySvc}ArrayOfPhoneNumTO" minOccurs="0"/>
 *         &lt;element name="emailAddresses" type="{http://mdws.medora.va.gov/QuerySvc}ArrayOfString" minOccurs="0"/>
 *         &lt;element name="names" type="{http://mdws.medora.va.gov/QuerySvc}ArrayOfString" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DemographicSetTO", propOrder = {
    "tag",
    "addresses",
    "phones",
    "emailAddresses",
    "names"
})
public class DemographicSetTO {

    protected String tag;
    protected ArrayOfAddressTO addresses;
    protected ArrayOfPhoneNumTO phones;
    protected ArrayOfString emailAddresses;
    protected ArrayOfString names;

    /**
     * Gets the value of the tag property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTag() {
        return tag;
    }

    /**
     * Sets the value of the tag property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTag(String value) {
        this.tag = value;
    }

    /**
     * Gets the value of the addresses property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfAddressTO }
     *     
     */
    public ArrayOfAddressTO getAddresses() {
        return addresses;
    }

    /**
     * Sets the value of the addresses property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfAddressTO }
     *     
     */
    public void setAddresses(ArrayOfAddressTO value) {
        this.addresses = value;
    }

    /**
     * Gets the value of the phones property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfPhoneNumTO }
     *     
     */
    public ArrayOfPhoneNumTO getPhones() {
        return phones;
    }

    /**
     * Sets the value of the phones property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfPhoneNumTO }
     *     
     */
    public void setPhones(ArrayOfPhoneNumTO value) {
        this.phones = value;
    }

    /**
     * Gets the value of the emailAddresses property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getEmailAddresses() {
        return emailAddresses;
    }

    /**
     * Sets the value of the emailAddresses property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setEmailAddresses(ArrayOfString value) {
        this.emailAddresses = value;
    }

    /**
     * Gets the value of the names property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfString }
     *     
     */
    public ArrayOfString getNames() {
        return names;
    }

    /**
     * Sets the value of the names property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfString }
     *     
     */
    public void setNames(ArrayOfString value) {
        this.names = value;
    }

}
