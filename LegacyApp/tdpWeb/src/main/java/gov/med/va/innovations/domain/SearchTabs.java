package gov.med.va.innovations.domain;

public enum SearchTabs {
	//UNIT("UNIT","Unit"),
	WARD("WARD","Ward"),
	TEAM("TEAM","Team"),
	ALL("ALL","All");
	
	private String value;
	private String display;
	
	private SearchTabs(String value, String displayName) {
		this.display = displayName;
		this.value= value;
	}
	
	public static SearchTabs getSearchTabs(String name) {
		return valueOf(name);
	}

	public String getDisplay() {
		return display;
	}

	public void setDisplay(String display) {
		this.display = display;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
