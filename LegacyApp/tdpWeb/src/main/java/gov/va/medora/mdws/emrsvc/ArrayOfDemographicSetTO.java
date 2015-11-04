
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfDemographicSetTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfDemographicSetTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="DemographicSetTO" type="{http://mdws.medora.va.gov/EmrSvc}DemographicSetTO" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfDemographicSetTO", propOrder = {
    "demographicSetTO"
})
public class ArrayOfDemographicSetTO {

    @XmlElement(name = "DemographicSetTO", nillable = true)
    protected List<DemographicSetTO> demographicSetTO;

    /**
     * Gets the value of the demographicSetTO property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the demographicSetTO property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDemographicSetTO().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link DemographicSetTO }
     * 
     * 
     */
    public List<DemographicSetTO> getDemographicSetTO() {
        if (demographicSetTO == null) {
            demographicSetTO = new ArrayList<DemographicSetTO>();
        }
        return this.demographicSetTO;
    }

}
