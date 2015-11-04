
package gov.va.medora.mdws.querysvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AbstractArrayTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AbstractArrayTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/QuerySvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="count" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AbstractArrayTO", propOrder = {
    "count"
})
@XmlSeeAlso({
    TaggedPatientArrays.class,
    TaggedTextArray.class,
    SiteArray.class,
    RegionArray.class,
    UserArray.class,
    DataSourceArray.class,
    TextArray.class,
    AbstractTaggedArrayTO.class
})
public class AbstractArrayTO
    extends AbstractTO
{

    protected int count;

    /**
     * Gets the value of the count property.
     * 
     */
    public int getCount() {
        return count;
    }

    /**
     * Sets the value of the count property.
     * 
     */
    public void setCount(int value) {
        this.count = value;
    }

}
