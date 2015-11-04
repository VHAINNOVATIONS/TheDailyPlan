
package gov.va.medora.mdws.querysvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfSiteTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfSiteTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SiteTO" type="{http://mdws.medora.va.gov/QuerySvc}SiteTO" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfSiteTO", propOrder = {
    "siteTO"
})
public class ArrayOfSiteTO {

    @XmlElement(name = "SiteTO", nillable = true)
    protected List<SiteTO> siteTO;

    /**
     * Gets the value of the siteTO property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the siteTO property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSiteTO().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link SiteTO }
     * 
     * 
     */
    public List<SiteTO> getSiteTO() {
        if (siteTO == null) {
            siteTO = new ArrayList<SiteTO>();
        }
        return this.siteTO;
    }

}
