
package gov.va.medora.mdws.emrsvc;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="writeNoteResult" type="{http://mdws.medora.va.gov/EmrSvc}NoteResultTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "writeNoteResult"
})
@XmlRootElement(name = "writeNoteResponse")
public class WriteNoteResponse {

    protected NoteResultTO writeNoteResult;

    /**
     * Gets the value of the writeNoteResult property.
     * 
     * @return
     *     possible object is
     *     {@link NoteResultTO }
     *     
     */
    public NoteResultTO getWriteNoteResult() {
        return writeNoteResult;
    }

    /**
     * Sets the value of the writeNoteResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link NoteResultTO }
     *     
     */
    public void setWriteNoteResult(NoteResultTO value) {
        this.writeNoteResult = value;
    }

}
