package gov.med.va.innovations.ui.util;

import java.io.Serializable;

public class DateUtilHolder implements Serializable {
	private static final long serialVersionUID = -2765028434821685752L;
	private String currentOverride;
    private boolean bypassTodayCheck;
    
	public String getCurrentOverride() {
		return currentOverride;
	}
	public void setCurrentOverride(String currentOverride) {
		this.currentOverride = currentOverride;
	}
	public boolean isBypassTodayCheck() {
		return bypassTodayCheck;
	}
	public void setBypassTodayCheck(boolean bypassTodayCheck) {
		this.bypassTodayCheck = bypassTodayCheck;
	}

}
