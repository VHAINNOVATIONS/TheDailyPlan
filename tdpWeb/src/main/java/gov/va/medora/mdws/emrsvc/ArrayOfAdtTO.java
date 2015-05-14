
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfAdtTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfAdtTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="AdtTO" type="{http://mdws.medora.va.gov/EmrSvc}AdtTO" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfAdtTO", propOrder = {
    "adtTO"
})
public class ArrayOfAdtTO {

    @XmlElement(name = "AdtTO", nillable = true)
    protected List<AdtTO> adtTO;

    /**
     * Gets the value of the adtTO property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the adtTO property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAdtTO().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link AdtTO }
     * 
     * 
     */
    public List<AdtTO> getAdtTO() {
        if (adtTO == null) {
            adtTO = new ArrayList<AdtTO>();
        }
        return this.adtTO;
    }

}
