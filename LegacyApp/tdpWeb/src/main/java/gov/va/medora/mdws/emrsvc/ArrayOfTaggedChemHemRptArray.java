
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfTaggedChemHemRptArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfTaggedChemHemRptArray">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TaggedChemHemRptArray" type="{http://mdws.medora.va.gov/EmrSvc}TaggedChemHemRptArray" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfTaggedChemHemRptArray", propOrder = {
    "taggedChemHemRptArray"
})
public class ArrayOfTaggedChemHemRptArray {

    @XmlElement(name = "TaggedChemHemRptArray", nillable = true)
    protected List<TaggedChemHemRptArray> taggedChemHemRptArray;

    /**
     * Gets the value of the taggedChemHemRptArray property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the taggedChemHemRptArray property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getTaggedChemHemRptArray().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TaggedChemHemRptArray }
     * 
     * 
     */
    public List<TaggedChemHemRptArray> getTaggedChemHemRptArray() {
        if (taggedChemHemRptArray == null) {
            taggedChemHemRptArray = new ArrayList<TaggedChemHemRptArray>();
        }
        return this.taggedChemHemRptArray;
    }

}
