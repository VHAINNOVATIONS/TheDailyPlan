
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfCytologyRpt complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfCytologyRpt">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="CytologyRpt" type="{http://mdws.medora.va.gov/EmrSvc}CytologyRpt" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfCytologyRpt", propOrder = {
    "cytologyRpt"
})
public class ArrayOfCytologyRpt {

    @XmlElement(name = "CytologyRpt", nillable = true)
    protected List<CytologyRpt> cytologyRpt;

    /**
     * Gets the value of the cytologyRpt property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the cytologyRpt property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCytologyRpt().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CytologyRpt }
     * 
     * 
     */
    public List<CytologyRpt> getCytologyRpt() {
        if (cytologyRpt == null) {
            cytologyRpt = new ArrayList<CytologyRpt>();
        }
        return this.cytologyRpt;
    }

}
