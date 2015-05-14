
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for LabResultTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="LabResultTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/EmrSvc}AbstractTO">
 *       &lt;sequence>
 *         &lt;element name="test" type="{http://mdws.medora.va.gov/EmrSvc}LabTestTO" minOccurs="0"/>
 *         &lt;element name="specimenType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="comment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="boundaryStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="labSiteId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "LabResultTO", propOrder = {
    "test",
    "specimenType",
    "comment",
    "value",
    "boundaryStatus",
    "labSiteId"
})
public class LabResultTO
    extends AbstractTO
{

    protected LabTestTO test;
    protected String specimenType;
    protected String comment;
    protected String value;
    protected String boundaryStatus;
    protected String labSiteId;

    /**
     * Gets the value of the test property.
     * 
     * @return
     *     possible object is
     *     {@link LabTestTO }
     *     
     */
    public LabTestTO getTest() {
        return test;
    }

    /**
     * Sets the value of the test property.
     * 
     * @param value
     *     allowed object is
     *     {@link LabTestTO }
     *     
     */
    public void setTest(LabTestTO value) {
        this.test = value;
    }

    /**
     * Gets the value of the specimenType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSpecimenType() {
        return specimenType;
    }

    /**
     * Sets the value of the specimenType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSpecimenType(String value) {
        this.specimenType = value;
    }

    /**
     * Gets the value of the comment property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getComment() {
        return comment;
    }

    /**
     * Sets the value of the comment property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setComment(String value) {
        this.comment = value;
    }

    /**
     * Gets the value of the value property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getValue() {
        return value;
    }

    /**
     * Sets the value of the value property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setValue(String value) {
        this.value = value;
    }

    /**
     * Gets the value of the boundaryStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBoundaryStatus() {
        return boundaryStatus;
    }

    /**
     * Sets the value of the boundaryStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBoundaryStatus(String value) {
        this.boundaryStatus = value;
    }

    /**
     * Gets the value of the labSiteId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLabSiteId() {
        return labSiteId;
    }

    /**
     * Sets the value of the labSiteId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLabSiteId(String value) {
        this.labSiteId = value;
    }

}
