package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager.EventCode;
import gov.va.medora.mdws.emrsvc.TaggedText;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class VistaDirectiveList extends VistaTO implements Serializable {

	private static final long serialVersionUID = 409188885707745866L;
	private List<VistaDirective> directives = new ArrayList<VistaDirective>();
	
	public VistaDirectiveList(List<TaggedText> mdwsBlob) {
		boolean inDir = false;
		boolean newDir = false;
		boolean firstDir = true;
		for (TaggedText tt : mdwsBlob) {
			String[] blobs = tt.getText().split("\n");
			List<String> dirText = new ArrayList<String>();
			for (String blob : blobs) {
				if (!inDir)
					inDir = blob.indexOf("Local Title:") > -1;
					
				if (inDir) {
					newDir = blob.indexOf("Local Title:") > -1;
					if (newDir && !firstDir) {
						directives.add(new VistaDirective(dirText));
						dirText = new ArrayList<String>();
					}
					firstDir = false;
					dirText.add(blob);
				}
				
			}
			if (inDir)
				directives.add(new VistaDirective(dirText));
		}
	}
 
	@Override
	public EventCode getEventCode() {
		return null;
	}

	@Override
	public Integer getListLength() {
		return directives.size();
	}

	public List<VistaDirective> getDirectives() {
		return directives;
	}

}
