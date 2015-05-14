
package gov.va.medora.mdws.querysvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TaggedPatientArrays complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TaggedPatientArrays">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/QuerySvc}AbstractArrayTO">
 *       &lt;sequence>
 *         &lt;element name="arrays" type="{http://mdws.medora.va.gov/QuerySvc}ArrayOfTaggedPatientArray" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TaggedPatientArrays", propOrder = {
    "arrays"
})
public class TaggedPatientArrays
    extends AbstractArrayTO
{

    protected ArrayOfTaggedPatientArray arrays;

    /**
     * Gets the value of the arrays property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfTaggedPatientArray }
     *     
     */
    public ArrayOfTaggedPatientArray getArrays() {
        return arrays;
    }

    /**
     * Sets the value of the arrays property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfTaggedPatientArray }
     *     
     */
    public void setArrays(ArrayOfTaggedPatientArray value) {
        this.arrays = value;
    }

}
