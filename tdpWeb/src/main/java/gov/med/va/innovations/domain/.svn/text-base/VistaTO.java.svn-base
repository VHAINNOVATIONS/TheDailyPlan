package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;

import java.io.Serializable;

public abstract class VistaTO implements Serializable {

	private static final long serialVersionUID = -7656569560070101993L;
	private String errorMessage;
	private boolean htmlApplied;
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	
	public abstract Integer getListLength();
	
	public abstract EventManager.EventCode getEventCode();
	
	public void setHtmlApplied(boolean htmlApplied) {
		this.htmlApplied = htmlApplied;
	}
	public boolean isHtmlApplied() {
		return htmlApplied;
	}
}
