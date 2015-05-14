
package gov.va.medora.mdws.querysvc;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfUserTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfUserTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="UserTO" type="{http://mdws.medora.va.gov/QuerySvc}UserTO" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfUserTO", propOrder = {
    "userTO"
})
public class ArrayOfUserTO {

    @XmlElement(name = "UserTO", nillable = true)
    protected List<UserTO> userTO;

    /**
     * Gets the value of the userTO property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the userTO property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getUserTO().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link UserTO }
     * 
     * 
     */
    public List<UserTO> getUserTO() {
        if (userTO == null) {
            userTO = new ArrayList<UserTO>();
        }
        return this.userTO;
    }

}
