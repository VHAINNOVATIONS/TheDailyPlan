
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TaggedSurgicalPathologyRptArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TaggedSurgicalPathologyRptArray">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTaggedArrayTO">
 *       &lt;sequence>
 *         &lt;element name="rpts" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfSurgicalPathologyRpt" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TaggedSurgicalPathologyRptArray", propOrder = {
    "rpts"
})
public class TaggedSurgicalPathologyRptArray
    extends AbstractTaggedArrayTO
{

    protected ArrayOfSurgicalPathologyRpt rpts;

    /**
     * Gets the value of the rpts property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfSurgicalPathologyRpt }
     *     
     */
    public ArrayOfSurgicalPathologyRpt getRpts() {
        return rpts;
    }

    /**
     * Sets the value of the rpts property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfSurgicalPathologyRpt }
     *     
     */
    public void setRpts(ArrayOfSurgicalPathologyRpt value) {
        this.rpts = value;
    }

}
