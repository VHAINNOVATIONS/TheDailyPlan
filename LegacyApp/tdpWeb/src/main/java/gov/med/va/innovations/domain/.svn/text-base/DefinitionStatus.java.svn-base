package gov.med.va.innovations.domain;

public enum DefinitionStatus {
	MISSING("MISSING",1,"Definition is mising from Medline Plus Dictionary, and will replace this when it becomes available"),
	OVERRIDE("OVERRIDE",2,"Medline Plus definition is not appropriate for The Daily Plan, so this will be used in place of the Medline Plus Definition"),
	COMMON("COMMON",3,"Definition is from the Medline Plus Common Definition list, Appendix B"),
	MEDLINEPLUS("MEDLINEPLUS",4,"Medline Plus selected definition");
	
	private String displayName;
	private int ordinal;
	private String description;
	
	private DefinitionStatus(String displayName,int ordinal,String description) {
		this.displayName = displayName;
		this.ordinal = ordinal;
		this.description = description;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public int getOrdinal() {
		return ordinal;
	}

	public void setOrdinal(int ordinal) {
		this.ordinal = ordinal;
	}
	
	public String getValue() {
		return displayName;
	}
	
	public static DefinitionStatus getDefinitionStatus(String name) {
		return valueOf(name);
	}
	
	public static DefinitionStatus getDefinitionStatus(int ordinal) {
		switch(ordinal) {
		case 1:
			return MISSING;
		case 2:
			return OVERRIDE;
		case 3:
			return COMMON;
		case 4:
			return MEDLINEPLUS;
		}
		return null;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}
}
