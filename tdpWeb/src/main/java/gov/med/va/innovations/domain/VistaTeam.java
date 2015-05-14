package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.TaggedText;
import gov.va.medora.mdws.emrsvc.TeamTO;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class VistaTeam extends VistaTO {
	private static final long serialVersionUID = -5118279504897351234L;
	protected String id;
    protected String name;
    protected String pcpName;
    protected String attendingName;
    
    public VistaTeam(TeamTO mdws) {
    	this.id = mdws.getId();
    	this.name = mdws.getName();
    	this.pcpName = mdws.getPcpName();
    	this.attendingName = mdws.getAttendingName();
    }
    
    public VistaTeam(TaggedText mdws) {
    	this.id = mdws.getTag();
    	this.name = mdws.getText();
    }
    
    /**
     * {@inheritDoc}
     */
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VistaTeam)) {
            return false;
        }

        final VistaTeam team = (VistaTeam) o;

        return !(name != null ? !name.equals(team.getName()) : team.getName() != null);

    }
    
    /**
     * {@inheritDoc}
     */
    public int hashCode() {
        return (name != null ? name.hashCode() : 0);
    }

    /**
     * {@inheritDoc}
     */
    public String toString() {
        ToStringBuilder sb = new ToStringBuilder(this, ToStringStyle.DEFAULT_STYLE)
                .append("id", this.id)
                .append("name", this.name)
                .append("pcpName", this.pcpName)
                .append("attendingName", this.attendingName);
        return sb.toString();
    }
   
//    public VistaTeam(SpecialtyTeam rpc) {
//    	this.name = rpc.getName();
//    }
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPcpName() {
		return pcpName;
	}
	public void setPcpName(String pcpName) {
		this.pcpName = pcpName;
	}
	public String getAttendingName() {
		return attendingName;
	}
	public void setAttendingName(String attendingName) {
		this.attendingName = attendingName;
	}

	@Override
	public Integer getListLength() {
		return null;
	}

	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventManager.EventCode getEventCode() {
		return null;
	}

}
