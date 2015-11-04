package gov.med.va.innovations.ui.action;

import gov.med.va.innovations.ui.util.DateUtilHolder;
import gov.med.va.innovations.util.DateUtil;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class DateOverrideAction extends BaseAction {

	private static final long serialVersionUID = 110706864090515863L;
    private DateUtilHolder date;
    private DateFormat df = new SimpleDateFormat("MMMMM dd, yyyy");

	public String edit() {
		if (null == date) {
			date = new DateUtilHolder();
		}
		if (null != DateUtil.getCurrentOverride())
			date.setCurrentOverride(df.format(DateUtil.getCurrentOverride()));
		
		date.setBypassTodayCheck(DateUtil.isBypassTodayCheck());
	    return SUCCESS;
	}

	public String save() throws Exception {
	    if (cancel != null) {
	        return CANCEL;
	    }
	    if (LOG.isDebugEnabled()) LOG.debug("Starting Save...");
	    
	    DateUtil.setBypassTodayCheck(date.isBypassTodayCheck());
	    if (null == date.getCurrentOverride() || "".equals(date.getCurrentOverride())) {
	    	DateUtil.setCurrentOverride(null);
	    }
	    else {
	    	DateUtil.setCurrentOverride(df.parse(date.getCurrentOverride()));
	    }

	    String key = "dateOverride.updated";
	    saveMessage(getText(key));

        return SUCCESS;
	}

    @Override
    public void validate() {
        if (getRequest().getMethod().equalsIgnoreCase("post")) {
            getFieldErrors().clear();
    	    try {
    	    	if (null != date.getCurrentOverride() && !"".equals(date.getCurrentOverride()))
    	    		df.parse(date.getCurrentOverride());
    	    }
    	    catch(ParseException pe) {
    	    	addActionError(getText("dateOverride.dateFormatError"));
    	    }
        }
    }

	public DateUtilHolder getDateHolder() {
		return date;
	}

	public void setDateHolder(DateUtilHolder date) {
		this.date = date;
	}
}
