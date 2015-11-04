package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.med.va.innovations.util.DateUtil;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class VistaClinicalWarning extends VistaTO implements Serializable {
	private static final long serialVersionUID = -3438278959116706206L;
	Date timestamp;
	String localTitle;
	String standardTitle;
	String text = "";
	String signedBy;
	

	@Override
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return null;
	}

	public Date getTimestamp() {
		return timestamp;
	}
	
	public String getDateStr() {
		return DateUtil.convertDateToString(timestamp);
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public String getLocalTitle() {
		return localTitle;
	}

	public void setLocalTitle(String localTitle) {
		this.localTitle = localTitle;
	}

	public String getStandardTitle() {
		return standardTitle;
	}

	public void setStandardTitle(String standardTitle) {
		this.standardTitle = standardTitle;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getSignedBy() {
		return signedBy;
	}

	public void setSignedBy(String signedBy) {
		this.signedBy = signedBy;
	}
	
	public static List<VistaClinicalWarning> parseTextBlob(String blob) {
		List<VistaClinicalWarning> warnings = new ArrayList<VistaClinicalWarning>();
		VistaClinicalWarning warning = null;
		boolean started = false;
		DateFormat df = new SimpleDateFormat("MM/dd/yyyy HH:mm");
		for(String line : blob.split("\n")) {
			if (!started) {
				if (line.indexOf("-- CW - Clinical Warnings --") > -1) {
					started = true;
				}
				continue;
			}
			if (line.length() >  15) {
				try {
					Date newRptDate = df.parse(line.substring(0,16));
					warning = new VistaClinicalWarning();
					warnings.add(warning);
					warning.timestamp = newRptDate;
					String localTitleTag = "Local Title: ";
					warning.localTitle = line.substring(line.indexOf(localTitleTag)+localTitleTag.length());
					continue;
				}
				catch(ParseException pe) {}
			}
			String standardTitleTag = "Standard Title: ";
			if (line.indexOf(standardTitleTag) > -1) {
				warning.standardTitle = line.substring(line.indexOf(standardTitleTag)+standardTitleTag.length());
				continue;
			}

			String signedByTag = "Signed by:  /es/  ";
			if (line.indexOf(signedByTag) > -1) {
				warning.signedBy = line.substring(line.indexOf(signedByTag)+signedByTag.length());
			}

			if (null != warning && null != warning.standardTitle && null == warning.signedBy) {
				warning.text += line;
			}
		}
		
		return warnings;
	}

}
