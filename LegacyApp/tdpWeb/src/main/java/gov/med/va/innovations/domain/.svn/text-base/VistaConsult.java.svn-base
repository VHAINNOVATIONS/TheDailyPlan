package gov.med.va.innovations.domain;

import gov.va.medora.mdws.emrsvc.ConsultTO;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class VistaConsult extends VistaOrder {
	private static final long serialVersionUID = 4926816062654515132L;
	private static final Log LOG = LogFactory.getLog(VistaConsult.class);
	
	public static final String CURRENT_PAT_STATUS = "Current Pat. Status: ";
	private static final String ORDER_INFORMATION = "Order Information\n";
	public static final String TO_SERVICE = "To Service: ";
	public static final String FROM_SERVICE = "From Service: ";
	public static final String REQUESTING_PROVIDER = "Requesting Provider: ";
	public static final String PLACE = "Place: ";
	public static final String URGENCY = "Urgency: ";
	public static final String ITEM = "Item: ";
	public static final String CONSULT = "Consult: ";
	public static final String PROVISIONAL_DIAGNOSIS = "Provisional Diagnosis: ";
	public static final String REASON_FOR_REQUEST = "Reason For Request:\n";
	public static final String STATUS = "\nStatus: ";
	public static final String LAST_ACTION = "Last Action: ";
	private static final String DELIMITER = "---------------";
	private static final String[] statusDelimiters = new String[]{
		CURRENT_PAT_STATUS,
		ORDER_INFORMATION, 
		TO_SERVICE,
		FROM_SERVICE,
		REQUESTING_PROVIDER,
		PLACE,
		URGENCY,
		ITEM,
		CONSULT,
		PROVISIONAL_DIAGNOSIS,
		REASON_FOR_REQUEST,
		STATUS,
		LAST_ACTION,
		DELIMITER};
    protected String toService;
    protected String title;
    protected String status;
    private Map<String,String> serviceItems;

	public VistaConsult(ConsultTO mdws) {
		super(mdws);
		this.toService = null == mdws.getToService() ? null : mdws.getToService().getText();
		this.title = mdws.getTitle();
		this.status = mdws.getStatus();
		initServiceItems();
	}

	public String getToService() {
		return toService;
	}

	public String getTitle() {
		return title;
	}

	public String getConsultStatus() {
		return status;
	}
	
	public String getServiceItem(String key) {
		return serviceItems.get(key);
	}
	
	private void initServiceItems() {
		serviceItems = new HashMap<String,String>();
		Map<String,Integer> serviceIndices = new HashMap<String,Integer>();
		for(String delim : statusDelimiters) {
			int idx = text.indexOf(delim);
			serviceIndices.put(delim, idx);
		}
		
		for(int i=0; i<statusDelimiters.length-1; i++) {
			LOG.debug("Loading "+statusDelimiters[i]);
			int from = serviceIndices.get(statusDelimiters[i]);
			if (from == -1)
				continue;
			int to = -1, incr = 1;;
			while (to == -1) {
				to = serviceIndices.get(statusDelimiters[i + incr++]);
				if (to == -1)
					LOG.debug(statusDelimiters[i + incr-1] + " is no good!");
			}
			
			if (from > to) {
				LOG.error("From, " + from + " is more than to: " + to);
				continue;
			}
			serviceItems.put(statusDelimiters[i], text.substring(from+statusDelimiters[i].length(), to));
		}
	}

}
