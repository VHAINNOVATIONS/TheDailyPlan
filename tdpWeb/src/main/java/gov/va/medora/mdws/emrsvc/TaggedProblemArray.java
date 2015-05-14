
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TaggedProblemArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TaggedProblemArray">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTaggedArrayTO">
 *       &lt;sequence>
 *         &lt;element name="problems" type="{http://mdws.medora.va.gov/EmrSvc}ArrayOfProblemTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TaggedProblemArray", propOrder = {
    "problems"
})
public class TaggedProblemArray
    extends AbstractTaggedArrayTO
{

    protected ArrayOfProblemTO problems;

    /**
     * Gets the value of the problems property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfProblemTO }
     *     
     */
    public ArrayOfProblemTO getProblems() {
        return problems;
    }

    /**
     * Sets the value of the problems property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfProblemTO }
     *     
     */
    public void setProblems(ArrayOfProblemTO value) {
        this.problems = value;
    }

}
