
package gov.va.medora.mdws.emrsvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfTaggedConsultArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfTaggedConsultArray">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TaggedConsultArray" type="{http://mdws.medora.va.gov/EmrSvc}TaggedConsultArray" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfTaggedConsultArray", propOrder = {
    "taggedConsultArray"
})
public class ArrayOfTaggedConsultArray {

    @XmlElement(name = "TaggedConsultArray", nillable = true)
    protected List<TaggedConsultArray> taggedConsultArray;

    /**
     * Gets the value of the taggedConsultArray property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the taggedConsultArray property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getTaggedConsultArray().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TaggedConsultArray }
     * 
     * 
     */
    public List<TaggedConsultArray> getTaggedConsultArray() {
        if (taggedConsultArray == null) {
            taggedConsultArray = new ArrayList<TaggedConsultArray>();
        }
        return this.taggedConsultArray;
    }

}
