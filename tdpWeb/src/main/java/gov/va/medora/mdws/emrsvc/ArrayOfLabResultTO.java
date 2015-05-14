
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfLabResultTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfLabResultTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="LabResultTO" type="{http://mdws.medora.va.gov/EmrSvc}LabResultTO" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfLabResultTO", propOrder = {
    "labResultTO"
})
public class ArrayOfLabResultTO {

    @XmlElement(name = "LabResultTO", nillable = true)
    protected List<LabResultTO> labResultTO;

    /**
     * Gets the value of the labResultTO property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the labResultTO property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getLabResultTO().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link LabResultTO }
     * 
     * 
     */
    public List<LabResultTO> getLabResultTO() {
        if (labResultTO == null) {
            labResultTO = new ArrayList<LabResultTO>();
        }
        return this.labResultTO;
    }

}
