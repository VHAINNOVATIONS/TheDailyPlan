package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.med.va.innovations.util.DateConverter;
import gov.va.medora.mdws.emrsvc.HospitalLocationTO;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class VistaLocation extends VistaTO {
 	private static final long serialVersionUID = -7886219810185551876L;
 	private static final DateConverter CU = new DateConverter();
	protected String id;
    protected String name;
    protected String department;
    protected String service;
    protected String specialty;
    protected VistaFacility facility;
    protected String building;
    protected String floor;
    protected String room;
    protected String bed;
    protected String status;
    protected String phone;
    protected Date appointmentTimestamp;
    protected String type;
    
    public VistaLocation(HospitalLocationTO mdws) {
    	this.id = mdws.getId();
    	this.name = mdws.getName();
    	this.department = (null == mdws.getDepartment()) ? "" : mdws.getDepartment().getText();
   		this.service = (null == mdws.getService()) ? "" : mdws.getService().getText();
    	this.specialty = (null == mdws.getSpecialty()) ? "" : mdws.getSpecialty().getText();
    	this.facility = (null == mdws.getFacility()) ? null : new VistaFacility(mdws.getFacility());
    	this.building = mdws.getBuilding();
    	this.floor = mdws.getFloor();
    	this.room = mdws.getRoom();
    	this.bed = mdws.getBed();
    	this.status = mdws.getStatus();
    	this.phone = mdws.getPhone();
    	this.appointmentTimestamp = CU.convertVistaDate(mdws.getAppointmentTimestamp());
    	this.type = mdws.getType();
    }
    
//    public VistaLocation(Location rpc) {
//    	this.name = rpc.getName();
//    }
    
    /**
     * {@inheritDoc}
     */
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VistaLocation)) {
            return false;
        }

        final VistaLocation loc = (VistaLocation) o;

        return !(name != null ? !name.equals(loc.getName()) : loc.getName() != null);

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
                .append("name", this.name);
        return sb.toString();
    }
    
    public String getDisplay() {
        if ("".equals(name) && "".equals(room) && "".equals(bed) ) 
        	return "";
        
        if (null == name)
        	return new StringBuffer(room).append(bed).toString();
        else
        	return new StringBuffer(name).append(getRoomBed()).toString();

    }
    
    private String getRoomBed() {
    	String roomBed = new StringBuffer().append(room == null ? "" : room).append(bed == null ? "" : bed).toString();
    	if ("".equals(roomBed))
    		return roomBed;
    	else 
    	return new StringBuffer().append(" - ").append(roomBed).toString();
    }
   
	public String getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getDepartment() {
		return department;
	}
	public String getService() {
		return service;
	}
	public String getSpecialty() {
		return specialty;
	}
	public VistaFacility getFacility() {
		return facility;
	}
	public String getBuilding() {
		return building;
	}
	public String getFloor() {
		return floor;
	}
	public String getRoom() {
		return room;
	}
	public String getBed() {
		return bed;
	}
	public String getStatus() {
		return status;
	}
	public String getPhone() {
		return phone;
	}
	public Date getAppointmentTimestamp() {
		return appointmentTimestamp;
	}
	public String getType() {
		return type;
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
