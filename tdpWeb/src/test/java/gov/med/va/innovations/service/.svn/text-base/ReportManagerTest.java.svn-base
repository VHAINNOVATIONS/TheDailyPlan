package gov.med.va.innovations.service;

import java.util.ArrayList;
import java.util.List;

import gov.med.va.innovations.domain.DailyPlanReport;
import gov.med.va.innovations.domain.FontSizes;
import gov.med.va.innovations.domain.Template;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.util.DateUtil;
import gov.med.va.innovations.util.SessionSecurityContextHolder;

public class ReportManagerTest extends BaseManagerTestCase {
	private static final String ACCESS_CODE = "vhaino321";
	private static final String VERIFY_CODE = "verify123.";
	private ReportManager manager;
	private VistaManager vistaManager;
	private TemplateManager templateManager;
	
	public void setReportManager(ReportManager manager) {
		this.manager = manager;
	}
	
	public void setVistaManager(VistaManager manager) {
		this.vistaManager = manager;
	}
	
	public void setTemplateManager(TemplateManager manager) {
		this.templateManager = manager;
	}

	protected void onSetUp() {
		SessionSecurityContextHolder.setSessionID("VistaManagerTest");
		DateUtil.setBypassTodayCheck(true);
	}
	
	public void testSignOn() throws Exception {
		VistaSignon user = vistaManager.doVistaSignon(ACCESS_CODE, VERIFY_CODE);
		assertNotNull(user);
		assertNotNull(user.getDuz());
		assertTrue(user.isSignonSucceeded());
	}

	public void testReportCOmponents() throws Exception {
		List<VistaPatient> patients = new ArrayList<VistaPatient>();
		patients.add(vistaManager.getPatientForId("237"));
		List<FontSizes> fonts = new ArrayList<FontSizes>();
		fonts.add(FontSizes.MEDIUM);
		List<Template> templates = new ArrayList<Template>();
		templates.add(templateManager.getTemplateByname("ICU/CCU Components"));
		assertTrue(templates.get(0).getComponents().size() > 0);
		List<DailyPlanReport> report = manager.getPatientReport(patients, fonts, templates, false);
		assertTrue(report.size() > 0);
	}

}
