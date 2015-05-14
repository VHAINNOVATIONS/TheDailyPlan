package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.med.va.innovations.util.DateUtil;

import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class VistaDirective extends VistaTO implements Serializable {

	private static final long serialVersionUID = -1047954996810848855L;
	private static final Log LOG = LogFactory.getLog(VistaDirective.class);
	private static final String TITLE_IDENT = "Local Title: ";
	private static final String AUTHOR_IDENT = "AUTHOR:  ";
	private static final String SIGNED_IDENT = "Signed by:  ";
	
	private String title;
	private Date date;
	private String author;
	private String urgency;
	private String status;
	private String note = "";
	
	public VistaDirective(List<String> mdwsBlob) {
		boolean captureMsg = false;
		for(String line:mdwsBlob) {
			if (line.indexOf(TITLE_IDENT) > -1) {
				title = line.substring(line.indexOf(TITLE_IDENT)+TITLE_IDENT.length());
				try {
					date = DateUtil.convertStringToDate(line.substring(0, line.indexOf(TITLE_IDENT)));
				} catch (ParseException e) {
					LOG.error("Bad Date to parse: "+line.substring(0, line.indexOf(TITLE_IDENT))+".", e);
				}
			}
			else if (line.indexOf(AUTHOR_IDENT) > -1) {
				author = line.substring(line.indexOf(AUTHOR_IDENT)+AUTHOR_IDENT.length());
				captureMsg = true;
			}
			else if (line.indexOf(SIGNED_IDENT) > -1) {
				captureMsg = false;
			}
			else if (captureMsg) {
				if (line.length() > 0)
					note += line.startsWith(" ")?"":" " + line;
			}
		}
	}

	@Override
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return null;
	}

	public String getTitle() {
		return title;
	}

	public Date getDate() {
		return date;
	}

	public String getAuthor() {
		return author;
	}

	public String getUrgency() {
		return urgency;
	}

	public String getStatus() {
		return status;
	}

	public String getNote() {
		return note;
	}

}
