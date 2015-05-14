
package gov.va.medora.mdws.querysvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for RegionArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="RegionArray">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/QuerySvc}AbstractArrayTO">
 *       &lt;sequence>
 *         &lt;element name="regions" type="{http://mdws.medora.va.gov/QuerySvc}ArrayOfRegionTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "RegionArray", propOrder = {
    "regions"
})
public class RegionArray
    extends AbstractArrayTO
{

    protected ArrayOfRegionTO regions;

    /**
     * Gets the value of the regions property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfRegionTO }
     *     
     */
    public ArrayOfRegionTO getRegions() {
        return regions;
    }

    /**
     * Sets the value of the regions property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfRegionTO }
     *     
     */
    public void setRegions(ArrayOfRegionTO value) {
        this.regions = value;
    }

}
