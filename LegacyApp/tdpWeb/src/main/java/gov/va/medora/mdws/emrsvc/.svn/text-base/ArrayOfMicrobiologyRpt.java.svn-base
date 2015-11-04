
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfMicrobiologyRpt complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfMicrobiologyRpt">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="MicrobiologyRpt" type="{http://mdws.medora.va.gov/EmrSvc}MicrobiologyRpt" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfMicrobiologyRpt", propOrder = {
    "microbiologyRpt"
})
public class ArrayOfMicrobiologyRpt {

    @XmlElement(name = "MicrobiologyRpt", nillable = true)
    protected List<MicrobiologyRpt> microbiologyRpt;

    /**
     * Gets the value of the microbiologyRpt property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the microbiologyRpt property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getMicrobiologyRpt().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link MicrobiologyRpt }
     * 
     * 
     */
    public List<MicrobiologyRpt> getMicrobiologyRpt() {
        if (microbiologyRpt == null) {
            microbiologyRpt = new ArrayList<MicrobiologyRpt>();
        }
        return this.microbiologyRpt;
    }

}
