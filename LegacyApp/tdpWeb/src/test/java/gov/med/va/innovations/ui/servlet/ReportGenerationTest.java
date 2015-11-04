package gov.med.va.innovations.ui.servlet;

import edu.emory.mathcs.backport.java.util.Arrays;
import gov.med.va.innovations.domain.DailyPlanReport;
import gov.med.va.innovations.domain.FontSizes;
import gov.med.va.innovations.domain.VistaPatient;
import gov.med.va.innovations.domain.VistaPatientList;
import gov.med.va.innovations.domain.VistaSignon;
import gov.med.va.innovations.service.BaseManagerTestCase;
import gov.med.va.innovations.service.ReportManager;
import gov.med.va.innovations.service.VistaManager;
import gov.med.va.innovations.util.DateUtil;
import gov.med.va.innovations.util.SessionSecurityContextHolder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.List;

public class ReportGenerationTest extends BaseManagerTestCase{
	private static final String ACCESS_CODE = "vhaino321";
	private static final String VERIFY_CODE = "verify123.";
	private static final String LOC = "src/test/resources/";
	private VistaManager manager;
	private ReportManager reportManager;
	
	public void setVistaManager(VistaManager manager) {
		this.manager = manager;
	}

	public void setReportManager(ReportManager manager) {
		this.reportManager = manager;
	}

	protected void onSetUp() {
		SessionSecurityContextHolder.setSessionID("ReportGenerationTest");
		DateUtil.setBypassTodayCheck(true);
	}
	
	public void testSignOn() throws Exception {
		VistaSignon user = manager.doVistaSignon(ACCESS_CODE, VERIFY_CODE);
		assertNotNull(user);
		assertNotNull(user.getDuz());
		assertTrue(user.isSignonSucceeded());
	}
	
	public void testGenerateDefaults() throws Exception {
		VistaPatientList patients = manager.getPatientsMatching("ONE,PATIENT", 0, 8);
		assertTrue(patients.getPatients().size() > 0);

		List<DailyPlanReport> reports = reportManager.getPatientReport(patients.getPatients());
		assertTrue(reports.size() == patients.getPatients().size());
	}
	
	@SuppressWarnings("unchecked")
	public void testGenerateReport() throws Exception {
		VistaPatientList patients = manager.getPatientsMatching("ONE,PATIENT", 0, 8);
		assertTrue(patients.getPatients().size() > 0);
		
        // Generate the PDF
        String outputFile = LOC + "test.pdf";
        
        OutputStream os = new FileOutputStream(outputFile);
        List<VistaPatient> myPatients = patients.getPatients().subList(0, 2);
        List<FontSizes> myFonts = Arrays.asList(new FontSizes[]{FontSizes.SMALL, FontSizes.MEDIUM});
		os.write(reportManager.genPdfReport(reportManager.getPatientReport(myPatients, myFonts), null));
		os.close();

        File pdf = new File(outputFile);
        assertTrue(pdf.exists());
	}

}
