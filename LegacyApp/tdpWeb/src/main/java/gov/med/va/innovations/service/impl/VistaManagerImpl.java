package gov.med.va.innovations.service.impl;

import gov.med.va.innovations.dao.DefinitionDao;
import gov.med.va.innovations.dao.VistaDao;
import gov.med.va.innovations.domain.Definition;
import gov.med.va.innovations.domain.DocumentEvent;
import gov.med.va.innovations.domain.VistaAllergyList;
import gov.med.va.innovations.domain.VistaAppointment;
import gov.med.va.innovations.domain.VistaAppointmentList;
import gov.med.va.innovations.domain.VistaClinicalWarningList;
import gov.med.va.innovations.domain.VistaConsult;
import gov.med.va.innovations.domain.VistaConsultList;
import gov.med.va.innovations.domain.VistaDirective;
import gov.med.va.innovations.domain.VistaDirectiveList;
import gov.med.va.innovations.domain.VistaFault;
import gov.med.va.innovations.domain.VistaGenericList;
import gov.med.va.innovations.domain.VistaImmunizationList;
import gov.med.va.innovations.domain.VistaLabReportList;
import gov.med.va.innovations.domain.VistaLocation;
import gov.med.va.innovations.domain.VistaMedication;
import gov.med.va.innovations.domain.VistaMedicationList;
import gov.med.va.innovations.domain.VistaOrder;
import gov.med.va.innovations.domain.VistaOrderList;
import gov.med.va.innovations.domain.VistaOrderStatus;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaPatientList;
import gov.med.va.innovations.domain.VistaProblemList;
import gov.med.va.innovations.domain.VistaRadiologyReportList;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.domain.VistaTO;
import gov.med.va.innovations.domain.VistaTeam;
import gov.med.va.innovations.domain.VistaVitalSign;
import gov.med.va.innovations.domain.VistaVitalSignList;
import gov.med.va.innovations.service.EventManager;
import gov.med.va.innovations.service.VistaManager;
import gov.med.va.innovations.service.EventManager.EventCode;
import gov.med.va.innovations.ui.util.MarkupUtil;
import gov.med.va.innovations.util.ConvertUtil;
import gov.med.va.innovations.util.DateUtil;
import gov.med.va.innovations.util.annotation.EscapeForXhtml;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@Path("/vista")
public class VistaManagerImpl implements VistaManager {
	private static Log LOG = LogFactory.getLog(VistaManagerImpl.class);
	private VistaDao dao;
	private DefinitionDao definitionDao;
	private EventManager eventManager;
	

	public void setEventManager(EventManager eventManager) {
		this.eventManager = eventManager;
	}

	public void setDao(VistaDao dao) {
		this.dao = dao;
	}

	public void setDefinitionDao(DefinitionDao dao) {
		this.definitionDao = dao;
	}

	@Override
	public VistaSignon doVistaSignon(String accessCode, String verifyCode) {
		return dao.doVistaSignon(accessCode, verifyCode);
	}

	@Override
	public List<VistaLocation> getLocations() {
		return dao.getLocations();
	}

	@Override
	public List<VistaTeam> getTeams() {
		return dao.getTeams();
	}

	@Override
	@Produces("application/json")
	@GET
	@Path("/match/{filter}/from/{first}/count/{count}")
	public VistaPatientList getPatientsMatching(@PathParam("filter") String filter, @PathParam("first") int first,
			@PathParam("count") int length) {
		List<VistaPatient> patients;
		VistaPatientList list = new VistaPatientList();
		try {
			patients = dao.matchPatients(filter);
		} catch (VistaFault e) {
			list.setErrorMessage(e.getMessage());
			return list;
		}
		list.setTotal(patients.size());
		list.setPatients(dao.detailPatients(patients.subList(first, patients.size() > first + length ? first + length : patients.size())));
		list.setFirst(first);
		list.setLast(first + list.getPatients().size()-1);
		
		return list;
	}

	@Override
	@Produces("application/json")
	@GET
	@Path("/wardPatients/ward/{wardId}")
	public VistaPatientList getWardPatients(@PathParam("wardId") String wardId) throws VistaFault {
		List<VistaPatient> patients;
		VistaPatientList list = new VistaPatientList();
		try {
			patients = dao.getPatientsForWard(wardId);
		} catch (VistaFault e) {
			list.setErrorMessage(e.getMessage());
			return list;
		}
		
		patients = dao.detailPatients(patients);

		list.setTotal(patients.size());
		list.setPatients(patients);
		list.setFirst(0);
		list.setLast(list.getFirst() + list.getPatients().size()-1);
		
		return list;
	}

	@Override
	@Produces("application/json")
	@GET
	@Path("/unitPatients/unit/{unitId}")
	public VistaPatientList getUnitPatients(@PathParam("unitId") String unitId) throws VistaFault {
		List<VistaPatient> patients;
		VistaPatientList list = new VistaPatientList();
		try {
			patients = dao.getPatientsForLocation(unitId);
		} catch (VistaFault e) {
			list.setErrorMessage(e.getMessage());
			return list;
		}
		
		patients = dao.detailPatients(patients);

		list.setTotal(patients.size());
		list.setPatients(patients);
		list.setFirst(0);
		list.setLast(list.getFirst() + list.getPatients().size()-1);
		
		return list;
	}

	@Override
	@Produces("application/json")
	@GET
	@Path("/teamPatients/team/{teamId}")
	public VistaPatientList getTeamPatients(@PathParam("teamId") String teamId) throws VistaFault {
		List<VistaPatient> patients;
		VistaPatientList list = new VistaPatientList();
		try {
			patients = dao.getPatientsForTeam(teamId);
		} catch (VistaFault e) {
			list.setErrorMessage(e.getMessage());
			return list;
		}
		
		patients = dao.detailPatients(patients);

		list.setTotal(patients.size());
		list.setPatients(patients);
		list.setFirst(0);
		list.setLast(list.getFirst() + list.getPatients().size()-1);
		
		return list;
	}

	@Override
	public VistaOrderList getAllOrders(String dfn) {
		return dao.getPatientOrders(dfn);
	}

	@Override
	public VistaMedicationList getInpatientMeds(String dfn) {
		VistaMedicationList meds = dao.getInpatientMeds(dfn);
		List<VistaMedication> validMeds = new ArrayList<VistaMedication>();
		Map<String,VistaMedication> medLookup = new HashMap<String,VistaMedication>();
		
		for(VistaMedication med : meds.getMeds()) {
			if ((med.getStatus().equalsIgnoreCase(VistaMedication.STATUS_ACTIVE)
				|| med.getStatus().equalsIgnoreCase(VistaMedication.STATUS_HOLD))
					&& DateUtil.isBetween(DateUtil.getToday().getTime(), med.getStartDate(), med.getStopDate())) {
				applyExpansion(med, "name");
				applyExpansion(med, "dose");
				applyExpansion(med, "route");
				applyExpansion(med, "schedule");
				med.setNew(true);
				validMeds.add(med);
				medLookup.put(med.getId(), med);
			}
		}
		meds.setMeds(validMeds);
		
		for (DocumentEvent event : eventManager.getRecentEvents(EventCode.MED,dfn)) {
			VistaMedication med = medLookup.get(event.getEventTargetId());
			if (null != med)
				med.setNew(false);
		}
		
		return meds;
	}

	@Override
	public VistaMedicationList getIvMeds(String dfn) {
		VistaMedicationList meds = dao.getIvMeds(dfn);
		List<VistaMedication> validMeds = new ArrayList<VistaMedication>();
		
		for(VistaMedication med : meds.getMeds()) {
			if ((med.getStatus().equalsIgnoreCase(VistaMedication.STATUS_ACTIVE)
				|| med.getStatus().equalsIgnoreCase(VistaMedication.STATUS_HOLD))
					&& DateUtil.isBetween(DateUtil.getToday().getTime(), med.getStartDate(), med.getStopDate())) {
				validMeds.add(med);
			}
		}
		meds.setMeds(validMeds);
		
		return meds;
	}

	@Override
	public VistaPatient getPatientForId(String id) {
		return dao.get(id);
	}

	@Override
	public void destroyClient() {
		dao.getMdwsClientFactory().destroy();
	}

	@Override
	public VistaMedicationList getActiveMeds(String dfn) {
		VistaMedicationList inpatient = getInpatientMeds(dfn);
		VistaMedicationList iv = getIvMeds(dfn);
		inpatient.getMeds().addAll(iv.getMeds());
		
		return inpatient;
	}

	@Override
	public VistaAllergyList getAllergies(String dfn) {
		return dao.getAllergies(dfn);
	}

	@Override
	public VistaOrderList getLabOrders(String dfn) {
		VistaOrderList orders = dao.getPatientOrders(dfn);
		List<VistaOrder> labOrders = new ArrayList<VistaOrder>();
		// Pull out lab orders
		for (VistaOrder order : orders.getOrders()) {
			if (order.getType().getName1().equals("Lab")
				&& (VistaOrderStatus.ACTIVE == order.getStatus() || VistaOrderStatus.PENDING == order.getStatus())
				&& DateUtil.isBetween(DateUtil.getToday().getTime(), order.getStartDate(), order.getStopDate())) {
				applyExpansion(order, "text");
				if (VistaOrderStatus.ACTIVE == order.getStatus()) {
					order.getStatus().setTitle("results are pending");
				}
				else if (VistaOrderStatus.PENDING == order.getStatus()) {
					order.getStatus().setTitle("specimen not obtained yet");
				}
				labOrders.add(order);
			}
		}
		orders.setOrders(labOrders);
		return orders;
	}

	@Override
	public VistaOrderList getDietOrders(String dfn) {
		VistaOrderList orders = dao.getPatientOrders(dfn);
		List<VistaOrder> dietOrders = new ArrayList<VistaOrder>();
		// Pull out lab orders
		for (VistaOrder order : orders.getOrders()) {
			if (order.getType().getName1().equals("Diet")
				&& order.getStatus() == VistaOrderStatus.ACTIVE
				&& DateUtil.isBetween(DateUtil.getToday().getTime(), order.getStartDate(), order.getStopDate())) {
				applyExpansion(order, "text");
				dietOrders.add(order);
			}
		}
		orders.setOrders(dietOrders);
		return orders;
	}

	private void applyExpansion(VistaTO obj, String method) {
		StringBuffer getset = new StringBuffer("get"+method.substring(0, 1).toUpperCase()+method.substring(1));
		try {
			Method getter = obj.getClass().getMethod(getset.toString(), new Class[]{});
			getset.replace(0, 1, "s");
			Method setter = obj.getClass().getMethod(getset.toString(), new Class[]{String.class});
			String text = (String) getter.invoke(obj, new Object[]{});
			
			// If method flagged as EscapeForXhtml, process it now to prevent inserted html from being escaped
			if (getter.isAnnotationPresent(EscapeForXhtml.class) || setter.isAnnotationPresent(EscapeForXhtml.class)) {
				text = MarkupUtil.stringToHTMLString(text);
				obj.setHtmlApplied(true);
			}
			
			StringBuffer buf = new StringBuffer();
			for(String word : text.split("[ ,]",0)) {
				if (word.length() == 0)
					continue;
				
				buf.append(getTag(word));
				String appChar = " ";
				if (text.indexOf(word)+word.length()+1 <= text.length()) {
					appChar = text.substring(text.indexOf(word)+word.length(),text.indexOf(word)+word.length()+1);
				}
				buf.append(appChar);
			}
			
			setter.invoke(obj, new Object[]{buf.toString()});
		}
		catch (Exception e) {
			LOG.error("method, " + method + " is not valid", e);
		}
	}
	
	private String getTag(String word) {
		String stripped = word;
		if (word.indexOf('(') == 0 && word.indexOf(')') == word.length() -1)
			stripped = word.substring(1,word.length()-1);
			
		List<Definition> defs = definitionDao.findByAbbreviation(stripped);
		if (defs.size() > 0)
			return MarkupUtil.genTag("span", word, new String[]{"class","title"}, new String[]{"expandable",defs.get(0).getDefinition()});
		else
			return word;
	}

	@Override
	public VistaOrderList getRadiologyOrders(String dfn) {
		VistaOrderList orders = dao.getPatientOrders(dfn);
		List<VistaOrder> radiologyOrders = new ArrayList<VistaOrder>();
		// Pull out radiology orders
		for (VistaOrder order : orders.getOrders()) {
			if (order.getType().getName1().equals("Imaging")
				&& DateUtil.isBetween(DateUtil.getToday().getTime(), order.getStartDate(), order.getStopDate())) {

				if (VistaOrderStatus.ACTIVE == order.getStatus()) {
					order.getStatus().setTitle("those orders awaiting Radiology reading");
				}
				else if (VistaOrderStatus.PENDING == order.getStatus()) {
					order.getStatus().setTitle("X-ray not obtained yet");
				}
				applyExpansion(order, "text");
				radiologyOrders.add(order);
			}
		}
		orders.setOrders(radiologyOrders);
		return orders;
	}

	@Override
	public VistaOrderList getNursingOrders(String dfn) {
		VistaOrderList orders = dao.getPatientOrders(dfn);
		List<VistaOrder> otherOrders = new ArrayList<VistaOrder>();
		// Pull out radiology orders
		for (VistaOrder order : orders.getOrders()) {
			if ((order.getType().getName1().equals("Activity") || order.getType().getName1().equals("Nursing"))
				&& order.getStatus() == VistaOrderStatus.ACTIVE
				&& DateUtil.isBetween(DateUtil.getToday().getTime(), order.getStartDate(), order.getStopDate())) {

				applyExpansion(order, "text");
				otherOrders.add(order);
			}
		}
		orders.setOrders(otherOrders);
		return orders;
	}

	@Override
	public VistaOrderList getProcedureOrders(String dfn) {
		VistaOrderList orders = dao.getPatientOrders(dfn);
		List<VistaOrder> otherOrders = new ArrayList<VistaOrder>();
		// Pull out radiology orders
		for (VistaOrder order : orders.getOrders()) {
			if (order.getType().getName1().equals("Procedures")
				&& (order.getStatus() == VistaOrderStatus.ACTIVE || order.getStatus() == VistaOrderStatus.SCHEDULED)
				&& DateUtil.isBetween(DateUtil.getToday().getTime(), order.getStartDate(), order.getStopDate())) {

				applyExpansion(order, "text");
				otherOrders.add(order);
			}
		}
		orders.setOrders(otherOrders);
		return orders;
	}
	
	public VistaOrderList getAdvancedDirectivesOrders(String dfn) {
		VistaOrderList orders = dao.getPatientOrders(dfn);
		List<VistaOrder> otherOrders = new ArrayList<VistaOrder>();
		// Pull out radiology orders
		for (VistaOrder order : orders.getOrders()) {
			if (order.getType().getName1().equals("A/D/T") && order.getType().getName2().equals("Condition") && order.getText().contains("DO NOT RESUSITATE")
				&& (order.getStatus() == VistaOrderStatus.ACTIVE || order.getStatus() == VistaOrderStatus.SCHEDULED)
				&& DateUtil.isBetween(DateUtil.getToday().getTime(), order.getStartDate(), order.getStopDate())) {

				applyExpansion(order, "text");
				otherOrders.add(order);
			}
		}
		
		if (otherOrders.size() == 0) {
			Calendar cal = DateUtil.getToday();
			cal.add(Calendar.YEAR, -20);
			VistaDirectiveList ad = dao.getAdvancedDirectives(dfn, cal.getTime(), DateUtil.getToday().getTime());
			for (VistaDirective dir : ad.getDirectives()) {
				if (dir.getNote().contains("resuscitate")) {
					VistaOrder order = new VistaOrder(ConvertUtil.stripRepeating(dir.getNote(), ' '));
					otherOrders.add(order);
				}
			}
		}
		orders.setOrders(otherOrders);
		return orders;
	}

	@Override
	public VistaGenericList getAppointments(String dfn) {
		VistaGenericList appointments = new VistaGenericList();
		List<Map<String,Object>> apptList = new ArrayList<Map<String,Object>>();
		VistaAppointmentList appts = dao.getAppointments(dfn);
		for (VistaAppointment appt : appts.getAppointments()) {
			if (DateUtil.isToday(appt.getTimestamp())) {
				Map<String,Object> entry = new HashMap<String,Object>();
				entry.put("timestamp", appt.getTimestampString());
				entry.put("name", appt.getPurpose());
				entry.put("schedule", appt.getLabDateTimeString());
				entry.put("status", appt.getStatus());
				entry.put("location", appt.getClinic().getName());
				apptList.add(entry);
			}
		}
		VistaConsultList consults = dao.getConsults(dfn);
		for (VistaConsult appt : consults.getConsults()) {
			if ((appt.getConsultStatus().equalsIgnoreCase("s") || appt.getConsultStatus().equalsIgnoreCase("p")) && 
				(DateUtil.isBetween(DateUtil.getToday().getTime(), DateUtil.dateAdd(appt.getTimestamp(),-30), appt.getTimestamp()))) {
				Map<String,Object> entry = new HashMap<String,Object>();
				entry.put("timestamp", appt.getTimestampString());
				entry.put("name", appt.getTitle());
				entry.put("schedule", appt.getServiceItem(VistaConsult.URGENCY));
				entry.put("status", appt.getServiceItem(VistaConsult.STATUS));
				entry.put("location", appt.getServiceItem(VistaConsult.PLACE));
				apptList.add(entry);
			}
		}
		
		appointments.setMapList(apptList);
		return appointments;
	}

	@Override
	public List<VistaLocation> getWards() {
		return dao.getWards();
	}

	@Override
	public VistaVitalSignList getVitals(String dfn) {
		VistaVitalSignList vitals = dao.getVitals(dfn);
		List<VistaVitalSign> newVitals = new ArrayList<VistaVitalSign>();
		for (VistaVitalSign vital : vitals.getVitals()) {
			if (newVitals.size() == 3)
				break;
			if (DateUtil.isBetween(vital.getDateStamp(),  DateUtil.dateAdd(DateUtil.getToday().getTime(), -1), DateUtil.getToday().getTime())) {
				newVitals.add(vital);
			}
		}
		vitals.setVitals(newVitals);
		return vitals;
	}

	@Override
	public VistaProblemList getProblems(String dfn) {
		return dao.getProblems(dfn);
	}

	@Override
	public VistaLabReportList getLabResults(String dfn, Date from, Date to,
			ArrayList<String> reports) throws InvocationTargetException {
		VistaLabReportList list = null;
		for(String rpt : reports) {
			String methName = "get" + rpt.substring(0, 1).toUpperCase() + rpt.substring(1);
			try {
				Method rptMtd = dao.getClass().getMethod(methName, String.class, Date.class, Date.class);
				Object ret = rptMtd.invoke(dao, dfn, from, to);
				if (null == list) {
					list = (VistaLabReportList) ret;
				}
				else {
					list.getLabReports().addAll(((VistaLabReportList)ret).getLabReports());
				}
			} catch (SecurityException e) {
				throw new InvocationTargetException(e, "Can not access " + methName);
			} catch (NoSuchMethodException e) {
				throw new InvocationTargetException(e, methName + " is not found in "+ dao.getClass().getName());
			} catch (IllegalArgumentException e) {
				throw new InvocationTargetException(e, "Bad args provided to " + methName + ": " + from + ", " + to);
			} catch (IllegalAccessException e) {
				throw new InvocationTargetException(e, "Can not access " +methName);
			}
		}
		
		return list;
	}

	@Override
	public VistaRadiologyReportList getRadiologyReports(String dfn, Date from,
			Date to) {
		return dao.getRadiologyReports(dfn, from, to);
	}

	@Override
	public VistaClinicalWarningList getClinicalWarnings(String dfn, Date from,
			Date to) {
		return dao.getClinicalWarnings(dfn, from, to);
	}

	@Override
	public VistaImmunizationList getImunizations(String dfn, Date from, Date to) {
		return dao.getImmunizations(dfn, from, to);
	}

}
