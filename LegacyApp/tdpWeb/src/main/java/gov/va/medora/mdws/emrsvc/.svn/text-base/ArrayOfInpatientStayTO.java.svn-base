
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfInpatientStayTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfInpatientStayTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="InpatientStayTO" type="{http://mdws.medora.va.gov/EmrSvc}InpatientStayTO" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfInpatientStayTO", propOrder = {
    "inpatientStayTO"
})
public class ArrayOfInpatientStayTO {

    @XmlElement(name = "InpatientStayTO", nillable = true)
    protected List<InpatientStayTO> inpatientStayTO;

    /**
     * Gets the value of the inpatientStayTO property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the inpatientStayTO property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getInpatientStayTO().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link InpatientStayTO }
     * 
     * 
     */
    public List<InpatientStayTO> getInpatientStayTO() {
        if (inpatientStayTO == null) {
            inpatientStayTO = new ArrayList<InpatientStayTO>();
        }
        return this.inpatientStayTO;
    }

}
