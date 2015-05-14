
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TaggedConsultArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TaggedConsultArray">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTaggedArrayTO">
 *       &lt;sequence>
 *         &lt;element name="consults" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfConsultTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TaggedConsultArray", propOrder = {
    "consults"
})
public class TaggedConsultArray
    extends AbstractTaggedArrayTO
{

    protected ArrayOfConsultTO consults;

    /**
     * Gets the value of the consults property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfConsultTO }
     *     
     */
    public ArrayOfConsultTO getConsults() {
        return consults;
    }

    /**
     * Sets the value of the consults property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfConsultTO }
     *     
     */
    public void setConsults(ArrayOfConsultTO value) {
        this.consults = value;
    }

}
