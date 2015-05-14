package gov.med.va.innovations.domain;


public class VistaFault extends Exception {
	private static final long serialVersionUID = 111038094162307248L;
	protected String type;
    protected String message;
    protected String stackTrace;
    protected String innerType;
    protected String innerMessage;
    protected String innerStackTrace;
    protected String suggestion;

    public VistaFault(gov.va.medora.mdws.emrsvc.FaultTO mdws) {
    	this.type = mdws.getType();
    	this.message = mdws.getMessage();
    	this.stackTrace = mdws.getStackTrace();
    	this.innerType = mdws.getInnerType();
    	this.innerMessage = mdws.getInnerMessage();
    	this.innerStackTrace = mdws.getInnerStackTrace();
    	this.suggestion = mdws.getSuggestion();
    }

    public VistaFault(gov.va.medora.mdws.querysvc.FaultTO mdws) {
    	this.type = mdws.getType();
    	this.message = mdws.getMessage();
    	this.stackTrace = mdws.getStackTrace();
    	this.innerType = mdws.getInnerType();
    	this.innerMessage = mdws.getInnerMessage();
    	this.innerStackTrace = mdws.getInnerStackTrace();
    	this.suggestion = mdws.getSuggestion();
    }

	public String getType() {
		return type;
	}

	public String getMessage() {
		return message;
	}

	public String getVistaStackTrace() {
		return stackTrace;
	}

	public String getInnerType() {
		return innerType;
	}

	public String getInnerMessage() {
		return innerMessage;
	}

	public String getInnerStackTrace() {
		return innerStackTrace;
	}

	public String getSuggestion() {
		return suggestion;
	}
}
