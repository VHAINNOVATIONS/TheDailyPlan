
package gov.va.medora.mdws.querysvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for UserArray complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="UserArray">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mdws.medora.va.gov/QuerySvc}AbstractArrayTO">
 *       &lt;sequence>
 *         &lt;element name="users" type="{http://mdws.medora.va.gov/QuerySvc}ArrayOfUserTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "UserArray", propOrder = {
    "users"
})
public class UserArray
    extends AbstractArrayTO
{

    protected ArrayOfUserTO users;

    /**
     * Gets the value of the users property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfUserTO }
     *     
     */
    public ArrayOfUserTO getUsers() {
        return users;
    }

    /**
     * Sets the value of the users property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfUserTO }
     *     
     */
    public void setUsers(ArrayOfUserTO value) {
        this.users = value;
    }

}
