
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="pwd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sitecode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DUZ" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DFN" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "pwd",
    "sitecode",
    "duz",
    "dfn"
})
@XmlRootElement(name = "cprsLaunch")
public class CprsLaunch {

    protected String pwd;
    protected String sitecode;
    @XmlElement(name = "DUZ")
    protected String duz;
    @XmlElement(name = "DFN")
    protected String dfn;

    /**
     * Gets the value of the pwd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPwd() {
        return pwd;
    }

    /**
     * Sets the value of the pwd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPwd(String value) {
        this.pwd = value;
    }

    /**
     * Gets the value of the sitecode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSitecode() {
        return sitecode;
    }

    /**
     * Sets the value of the sitecode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSitecode(String value) {
        this.sitecode = value;
    }

    /**
     * Gets the value of the duz property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDUZ() {
        return duz;
    }

    /**
     * Sets the value of the duz property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDUZ(String value) {
        this.duz = value;
    }

    /**
     * Gets the value of the dfn property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDFN() {
        return dfn;
    }

    /**
     * Sets the value of the dfn property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDFN(String value) {
        this.dfn = value;
    }

}
