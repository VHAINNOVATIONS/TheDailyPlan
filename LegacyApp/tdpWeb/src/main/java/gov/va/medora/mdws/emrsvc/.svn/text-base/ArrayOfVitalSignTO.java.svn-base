
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfVitalSignTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfVitalSignTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="VitalSignTO" type="{http://mdws.medora.va.gov/EmrSvc}VitalSignTO" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfVitalSignTO", propOrder = {
    "vitalSignTO"
})
public class ArrayOfVitalSignTO {

    @XmlElement(name = "VitalSignTO", nillable = true)
    protected List<VitalSignTO> vitalSignTO;

    /**
     * Gets the value of the vitalSignTO property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the vitalSignTO property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getVitalSignTO().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link VitalSignTO }
     * 
     * 
     */
    public List<VitalSignTO> getVitalSignTO() {
        if (vitalSignTO == null) {
            vitalSignTO = new ArrayList<VitalSignTO>();
        }
        return this.vitalSignTO;
    }

}
