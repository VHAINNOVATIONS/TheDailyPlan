
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfRadiologyReportTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfRadiologyReportTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="RadiologyReportTO" type="{http://mdws.medora.va.gov/EmrSvc}RadiologyReportTO" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfRadiologyReportTO", propOrder = {
    "radiologyReportTO"
})
public class ArrayOfRadiologyReportTO {

    @XmlElement(name = "RadiologyReportTO", nillable = true)
    protected List<RadiologyReportTO> radiologyReportTO;

    /**
     * Gets the value of the radiologyReportTO property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the radiologyReportTO property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRadiologyReportTO().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RadiologyReportTO }
     * 
     * 
     */
    public List<RadiologyReportTO> getRadiologyReportTO() {
        if (radiologyReportTO == null) {
            radiologyReportTO = new ArrayList<RadiologyReportTO>();
        }
        return this.radiologyReportTO;
    }

}
