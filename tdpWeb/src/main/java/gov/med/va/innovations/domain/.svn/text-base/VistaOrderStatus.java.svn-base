package gov.med.va.innovations.domain;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public enum VistaOrderStatus {
	DISCONTINUED(1,"Discontinued","dc","dc",null),
	COMPLETE(2,"Complete","comp","c",null),
	HOLD(3,"Hold","hold","h",null),
	FLAGGED(4,"Flagged","flag","?",null),
	PENDING(5, "Pending","pend","p","those orders waiting to be signed by Dr."),
	ACTIVE(6,"Active","actv","a","those orders waiting to be carried out"),
	EXPIRED(7, "Expired","exp","e",null),
	SCHEDULED(8,"Scheduled","schd","s",null),
	PARTIAL_RESULTS(9,"Partial Results","part","pr",null),
	DELAYED(10,"Delayed","dlay","dly",null),
	UNRELEASED(11,"Unreleased","unr","u",null),
	DISCONTINUED_EDIT(12,"Discontinued/Edit","dc/e","dce",null),
	CANCELLED(13,"Cancelled","canc","x",null),
	LAPSED(14,"Lapsed","laps","l",null),
	RENEWED(15, "Renewed","rnew","rn",null),
	NO_STATUS(99,"No Status","none","'",null);

	private final static Log LOG = LogFactory.getLog(VistaSigStatus.class);

	private int ordinal;
	private String displayName;
	private String shortName;
	private String abbrev;
	private String title;

	private VistaOrderStatus(int ordinal, String displayName, String shortName, String abbrev, String title) {
		this.ordinal = ordinal;
		this.displayName = displayName;
		this.shortName = shortName;
		this.abbrev = abbrev;
		this.title = title;
	}
	
	public static VistaOrderStatus getVistaOrderStatus(String name) {
		try {
			if (name.startsWith("Invalid")) {
				String code = name.substring(name.indexOf(':')+2);
				for(VistaOrderStatus status : values()) {
					if (status.getAbbrev().equals(code))
						return status;
				}
			}

			return valueOf(name);
		}
		catch(IllegalArgumentException iae) {
			for (VistaOrderStatus status : values()) {
				if (status.displayName.equals(name))
					return status;
			}
			LOG.error("Unknown Status: "+name, iae);
			return null;
		}
	}
	
	public static VistaOrderStatus getVistaOrderStatus(int ordinal) {
		switch(ordinal) {
		case 1:
			return DISCONTINUED;
		case 2:
			return COMPLETE;
		case 3:
			return HOLD;
		case 4:
			return FLAGGED;
		case 5:
			return PENDING;
		case 6:
			return ACTIVE;
		case 7:
			return EXPIRED;
		case 8:
			return SCHEDULED;
		case 9:
			return PARTIAL_RESULTS;
		case 10:
			return DELAYED;
		case 11:
			return UNRELEASED;
		case 12:
			return DISCONTINUED_EDIT;
		case 13:
			return CANCELLED;
		case 14:
			return LAPSED;
		case 15:
			return RENEWED;
		case 99:
			return NO_STATUS;
		}
		return null;
	}

	public int getOrdinal() {
		return ordinal;
	}

	public void setOrdinal(int ordinal) {
		this.ordinal = ordinal;
	}

	public String getDisplayName() {
		if (null == title)
			return displayName;
		else
			return "<span class='expandable' title='" + title + "'>" +
				displayName + "</span>";
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public String getAbbrev() {
		return abbrev;
	}

	public void setAbbrev(String abbrev) {
		this.abbrev = abbrev;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
