package gov.med.va.innovations.domain;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public enum VistaSigStatus {
	
	ON_CHART_WRITTEN(0,"ON CHART w/written orders"),
	ELECTRONIC(1,"ELECTRONIC"),
	NOT_SIGNED(2,"NOT SIGNED"),
	NOT_REQUIRED(3,"NOT REQUIRED"),
	ON_CHART_PRINTED(4,"ON CHART w/printed orders"),
	NOT_REQUIRED_CANCEL_LAPSE(5,"NOT REQUIRED due to cancel/lapse"),
	SERVICE_CORRECTION(6,"SERVICE CORRECTION to signed order"),
	DIGITALLY_SIGNED(7,"DIGITALLY SIGNED"),
	ON_PARENT_ORDER(8,"ON PARENT order");

	@SuppressWarnings("unused")
	private final static Log LOG = LogFactory.getLog(VistaSigStatus.class);

	private int ordinal;
	private String description;

	private VistaSigStatus(int ordinal,String description) {
		this.ordinal = ordinal;
		this.description = description;
	}
	
	public static VistaSigStatus getVistaSigStatus(String name) {
		for (VistaSigStatus status : values()) {
			if (status.getDescription().equals(name))
				return status;
		}
		
		return null;
	}
	
	public static VistaSigStatus getVistaSigStatus(int ordinal) {
		switch(ordinal) {
		case 0:
			return ON_CHART_WRITTEN;
		case 1:
			return ELECTRONIC;
		case 2:
			return NOT_SIGNED;
		case 3:
			return NOT_REQUIRED;
		case 4:
			return ON_CHART_PRINTED;
		case 5:
			return NOT_REQUIRED_CANCEL_LAPSE;
		case 6:
			return SERVICE_CORRECTION;
		case 7:
			return DIGITALLY_SIGNED;
		case 8:
			return ON_PARENT_ORDER;
		}
		return null;
	}

	public int getOrdinal() {
		return ordinal;
	}

	public void setOrdinal(int ordinal) {
		this.ordinal = ordinal;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
