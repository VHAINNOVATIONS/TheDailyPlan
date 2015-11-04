
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TaggedSurgeryReportArrays complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TaggedSurgeryReportArrays">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractArrayTO">
 *       &lt;sequence>
 *         &lt;element name="arrays" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfTaggedSurgeryReportArray" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TaggedSurgeryReportArrays", propOrder = {
    "arrays"
})
public class TaggedSurgeryReportArrays
    extends AbstractArrayTO
{

    protected ArrayOfTaggedSurgeryReportArray arrays;

    /**
     * Gets the value of the arrays property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfTaggedSurgeryReportArray }
     *     
     */
    public ArrayOfTaggedSurgeryReportArray getArrays() {
        return arrays;
    }

    /**
     * Sets the value of the arrays property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfTaggedSurgeryReportArray }
     *     
     */
    public void setArrays(ArrayOfTaggedSurgeryReportArray value) {
        this.arrays = value;
    }

}
