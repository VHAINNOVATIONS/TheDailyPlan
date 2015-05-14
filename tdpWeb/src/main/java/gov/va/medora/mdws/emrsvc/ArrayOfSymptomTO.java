
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfSymptomTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfSymptomTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SymptomTO" type="{http://mdws.medora.va.gov/EmrSvc}SymptomTO" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfSymptomTO", propOrder = {
    "symptomTO"
})
public class ArrayOfSymptomTO {

    @XmlElement(name = "SymptomTO", nillable = true)
    protected List<SymptomTO> symptomTO;

    /**
     * Gets the value of the symptomTO property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the symptomTO property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSymptomTO().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link SymptomTO }
     * 
     * 
     */
    public List<SymptomTO> getSymptomTO() {
        if (symptomTO == null) {
            symptomTO = new ArrayList<SymptomTO>();
        }
        return this.symptomTO;
    }

}
