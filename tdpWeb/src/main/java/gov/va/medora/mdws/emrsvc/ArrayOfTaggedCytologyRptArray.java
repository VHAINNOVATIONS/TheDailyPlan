
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfTaggedCytologyRptArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfTaggedCytologyRptArray">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TaggedCytologyRptArray" type="{http://mdws.medora.va.gov/EmrSvc}TaggedCytologyRptArray" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfTaggedCytologyRptArray", propOrder = {
    "taggedCytologyRptArray"
})
public class ArrayOfTaggedCytologyRptArray {

    @XmlElement(name = "TaggedCytologyRptArray", nillable = true)
    protected List<TaggedCytologyRptArray> taggedCytologyRptArray;

    /**
     * Gets the value of the taggedCytologyRptArray property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the taggedCytologyRptArray property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getTaggedCytologyRptArray().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TaggedCytologyRptArray }
     * 
     * 
     */
    public List<TaggedCytologyRptArray> getTaggedCytologyRptArray() {
        if (taggedCytologyRptArray == null) {
            taggedCytologyRptArray = new ArrayList<TaggedCytologyRptArray>();
        }
        return this.taggedCytologyRptArray;
    }

}
