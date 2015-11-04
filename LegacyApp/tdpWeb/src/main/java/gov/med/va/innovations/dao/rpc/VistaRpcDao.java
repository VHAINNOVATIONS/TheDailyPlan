package gov.med.va.innovations.dao.rpc;

import gov.med.va.innovations.domain.VistaSignon;
import gov.va.med.lom.javaBroker.rpc.BrokerException;
import gov.va.med.lom.javaBroker.rpc.RpcBroker;
import gov.va.med.lom.javaBroker.rpc.lists.models.Location;
import gov.va.med.lom.javaBroker.rpc.patient.PatientSelectionRpc;
import gov.va.med.lom.javaBroker.rpc.patient.models.PatientList;
import gov.va.med.lom.javaBroker.rpc.patient.models.PatientListItem;
import gov.va.med.lom.javaBroker.rpc.user.VistaSignonRpc;
import gov.va.med.lom.javaBroker.rpc.user.VistaSignonSetupRpc;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * This is an incomplete start for the RPC bridge to VistA.  A caching implementation
 * will need to be written to store a separate RPC Broker for each session, similar to the 
 * MdwsClientFactory.  Then an adapter pattern will need to be applied at the service layer to 
 * determine which to use: RPC or MDWS.  Since a MDWS development environment has been made 
 * available, I don't know if this development path will continue.
 * 
 * @author insanmaster
 *
 */
public class VistaRpcDao {
	private static final Log LOG = LogFactory.getLog(VistaRpcDao.class);
	private String vistaServer;
	private int version;
	
	public void setVistaServer(String vistaServer) {
		this.vistaServer = vistaServer;
	}

	public void setVistaPort(int vistaPort) {
		this.vistaPort = vistaPort;
	}
	
	public void setRpcVersion(int version) {
		this.version = version;
	}

	private int vistaPort;
	
	public VistaSignon doVistaSignon(RpcBroker rpcBroker, String accessCode, String verifyCode) {
		
	    // Do the signon setup 
	    VistaSignonSetupRpc vistaSignonSetupRpc;
	    VistaSignonRpc vistaSignonRpc = null;
		try {
			vistaSignonSetupRpc = new VistaSignonSetupRpc(rpcBroker);
		    vistaSignonSetupRpc.doVistaSignonSetup();
		    // Do signon 
		    vistaSignonRpc = new VistaSignonRpc(rpcBroker);
		    vistaSignonRpc.setReturnRpcResult(true);
		    vistaSignonRpc.setReturnXml(true);
		    vistaSignonRpc.doVistaSignon(accessCode, verifyCode);
		} catch (BrokerException be) {
			LOG.error("Problem with RPC Broker", be);
		}
	    
	    return new VistaSignon(vistaSignonRpc);     
		
	}
	
	public Location[] getLocations(RpcBroker rpcBroker) {
//        LocationsRpc locationsRpc;
//		try {
//			locationsRpc = new LocationsRpc(rpcBroker);
//	        locationsRpc.setReturnRpcResult(true);
//	        locationsRpc.setReturnXml(true);
//	        LocationsList locationsList;
//	        locationsRpc.l

//	        return locationsList.getLocations();
//		} catch (BrokerException be) {
//			LOG.error("Problem with RPC Broker", be);
//		}
		return null;
	}

	public PatientListItem getPatientBySsn(RpcBroker rpcBroker, String ssn) {
	    // Create a patient selection rpc and list patients with the specified ssn 
		try {
	    PatientSelectionRpc patientSelectionRpc = new PatientSelectionRpc(rpcBroker);
	    PatientList patientList = patientSelectionRpc.listPtByFullSSN(ssn);
	    if (patientList.getPatientListItems().length > 0)
	    	return patientList.getPatientListItems()[0];
		}
		catch(BrokerException be) {
			LOG.error("Problem with RPC Broker", be);
		}
    	return null;
	} 
	  
	public RpcBroker getBroker() throws BrokerException {
		RpcBroker rpcBroker;
		
		// Try default with degrade...
		if (version > 0)
			rpcBroker = new RpcBroker(version);
		else
			rpcBroker = new RpcBroker();
		
	    try {
	    	rpcBroker.connect(vistaServer, vistaPort);
	    } catch (BrokerException rbe) {
	    	rpcBroker = new RpcBroker(1);
	    	rpcBroker.connect(vistaServer, vistaPort);
	    }
		
		return rpcBroker;
	}
		
}
