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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class VistaImmunization extends VistaTO implements Serializable {
	private static final long serialVersionUID = -3438278959116706206L;
	Date timestamp;
	String immunization;
	String facility;
	String reaction;
	String comments;
	

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
	
	public static List<VistaImmunization> parseTextBlob(String blob) {
		Pattern p = Pattern.compile("(\\d{2}/\\d{2}/\\d{4}){1}(\\D)+");
		List<VistaImmunization> immunizations = new ArrayList<VistaImmunization>();
		VistaImmunization immunization = null;
		String commentTag = "Comments: ";
		String currentImmunization = "";
		int[] cols = null;
		boolean started = false;
		DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
		for(String line : blob.split("\n")) {
			if (!started) {
				if (line.indexOf("Immunization") > -1 && line.indexOf("Reaction") > -1) {
					started = true;
				}
				continue;
			}
			if (line.indexOf("**  CONFIDENTIAL  SUMMARY") > -1) {
				break;
			}
			if (line.contains(commentTag)) {
				immunization.comments = line.substring(line.indexOf(commentTag)+commentTag.length());
			}
			else {
				String[] fields = line.split("[ ]+");
				if (line.length() == 0 || fields.length < 2)
					continue;
				
				// Determine report layout
				if (null == cols) {
					Matcher m = p.matcher(line);
					if(m.find()) {
						cols = new int[4];
						for (cols[0] = 0; line.charAt(cols[0]) == ' ' ;cols[0]++) {}
						cols[1] = line.indexOf(m.group(1));
						for (cols[2] = cols[1]+ m.group(1).length(); line.charAt(cols[2]) != ' '; cols[2]++) {}
						for (cols[3] = line.lastIndexOf(m.group(2)); line.charAt(cols[3]) != ' '; cols[3]--) {}
					}
				}
				
				immunization = new VistaImmunization();
				immunizations.add(immunization);
				
				if (line.charAt(0) == ' ')
					immunization.immunization = currentImmunization;
				else {
					immunization.immunization = line.substring(cols[0],cols[1]).trim();
					currentImmunization = immunization.immunization;
				}
				
				try {
					immunization.timestamp = df.parse(line.substring(cols[1],cols[2]).trim());
				} catch (ParseException e) {}
				immunization.facility = line.substring(cols[2],cols[3]).trim();
				immunization.reaction = line.substring(cols[3]).trim();
			}
		}
		
		return immunizations;
	}

	public String getImmunization() {
		return immunization;
	}

	public void setImmunization(String immunization) {
		this.immunization = immunization;
	}

	public String getFacility() {
		return facility;
	}

	public void setFacility(String facility) {
		this.facility = facility;
	}

	public String getReaction() {
		return reaction;
	}

	public void setReaction(String reaction) {
		this.reaction = reaction;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

}
