package gov.med.va.innovations.domain;

public enum FontSizes {
	SMALL("SMALL","Small"),
	MEDIUM("MEDIUM","Medium"),
	LARGE("LARGE","Large");
	
	private String value;
	private String display;
	
	private FontSizes(String value, String displayName) {
		this.display = displayName;
		this.value= value;
	}
	
	public static FontSizes getSearchTabs(String name) {
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
