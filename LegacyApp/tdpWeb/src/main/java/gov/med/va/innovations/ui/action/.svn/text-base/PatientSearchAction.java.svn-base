package gov.med.va.innovations.ui.action;

import gov.med.va.innovations.Constants;
import gov.med.va.innovations.domain.FontSizes;
import gov.med.va.innovations.domain.User;
import gov.med.va.innovations.domain.VistaLocation;
import gov.med.va.innovations.domain.VistaTeam;
import gov.med.va.innovations.service.ReportManager;

import java.io.IOException;
import java.util.List;

import org.springframework.security.providers.UsernamePasswordAuthenticationToken;

public class PatientSearchAction extends BaseAction {
	private static final long serialVersionUID = -7754892930892645268L;
	
	private String[] selected;
	private ReportManager reportManager;

	public String execute() throws IOException {
    	return SUCCESS;
    }

	@SuppressWarnings("unchecked")
	public List<VistaLocation> getUnits() {
		if (null == getSession().getAttribute(Constants.LOCATION_LIST)) {
			getSession().setAttribute(Constants.LOCATION_LIST, vistaManager.getLocations());
		}
		
		return (List<VistaLocation>) getSession().getAttribute(Constants.LOCATION_LIST);
	}

	@SuppressWarnings("unchecked")
	public List<VistaLocation> getWards() {
		if (null == getSession().getAttribute(Constants.WARD_LIST)) {
			getSession().setAttribute(Constants.WARD_LIST, vistaManager.getWards());
		}
		
		return (List<VistaLocation>) getSession().getAttribute(Constants.WARD_LIST);
	}
	
	@SuppressWarnings("unchecked")
	public VistaTeam getTeam() {
		User user = (User) ((UsernamePasswordAuthenticationToken) getRequest().getUserPrincipal()).getPrincipal();
		
		if (null == user.getPrefTeam()) 
			return null;
		
		if (null == getSession().getAttribute(Constants.TEAM_KEY)) {
			if (null == getSession().getAttribute(Constants.TEAM_LIST_KEY)) {
				getSession().setAttribute(Constants.TEAM_LIST_KEY, vistaManager.getTeams());
			}
			for (VistaTeam team : (List<VistaTeam>)getSession().getAttribute(Constants.TEAM_LIST_KEY)) {
				if (user.getPrefTeam().equals(team.getId())) {
					getSession().setAttribute(Constants.TEAM_KEY, team);
				}
			}
		}
		
		return (VistaTeam) getSession().getAttribute(Constants.TEAM_KEY);
	}
	
	public String getTabParam() {
		return getRequest().getParameter("tab");
	}
    
    public FontSizes[] getFontList() {
    	return FontSizes.values();
    }

    public String getDefaultFont() {
    	String value = ((User)((UsernamePasswordAuthenticationToken)getRequest().getUserPrincipal()).getPrincipal()).getPrefFontSize().getValue();
    	return value;
    }
    
    public String getDefaultTemplate() {
    	return "" + reportManager.getDefaultTemplate().getId();
    }

	public String[] getSelected() {
		return selected;
	}

	public void setSelected(String[] selected) {
		this.selected = selected;
	}

	public void setReportManager(ReportManager reportManager) {
		this.reportManager = reportManager;
	}
}
