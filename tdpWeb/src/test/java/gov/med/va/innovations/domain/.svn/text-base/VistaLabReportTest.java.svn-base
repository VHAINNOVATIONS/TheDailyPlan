package gov.med.va.innovations.domain;

import junit.framework.TestCase;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class VistaLabReportTest extends TestCase {
    //~ Instance fields ========================================================

    @SuppressWarnings("unused")
	private final Log log = LogFactory.getLog(VistaLabReportTest.class);

    //~ Constructors ===========================================================

    public VistaLabReportTest(String name) {
        super(name);
    }

    public void testParseElectronMicroscopy() throws Exception {
    	VistaLabReport report = VistaLabReport.parseElectronMicroscopy(emReport);
    	assertNotNull(report);
    	assertNotNull(report.getCollectionDate());
    	assertNotNull(report.getResult());
    	assertNotNull(report.getTestName());
    	assertNotNull(report.getFacility());
    	assertNotNull(report.getSpecimen());

    }

    public void testParseCrytology() throws Exception {
    	VistaLabReport report = VistaLabReport.parseCytoPathology(cytologyReport);
    	assertNotNull(report);
    	assertNotNull(report.getCollectionDate());
    	assertNotNull(report.getResult());
    	assertNotNull(report.getTestName());
    	assertNotNull(report.getFacility());
    	assertNotNull(report.getSpecimen());

    }
    
    private String cytologyReport = new StringBuilder("Report\n")
    .append("\n")    
    .append("\n")    
    .append("    ---- CYTOPATHOLOGY ----\n")
    .append("\n")
    .append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
	.append("MEDICAL RECORD |                   CYTOPATHOLOGY\n")
	.append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
	.append("PATHOLOGY REPORT\n")
	.append("Laboratory: ANN ARBOR VAMC                             Accession No. CY 10 4028\n")
	.append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
	.append("Submitted by: GUMBALL,CINDY K APN           Date obtained: Oct 21, 2010\n")
	.append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
	.append("Specimen (Received Oct 25, 2010 09:48):\n")
    .append("URINE\n")
	.append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
	.append("BRIEF CLINICAL HISTORY:\n")
    .append("Microhematuria.  \n")
	.append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
	.append("PREOPERATIVE DIAGNOSIS:\n")
    .append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
    .append("OPERATIVE FINDINGS:\n")
    .append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
    .append("POSTOPERATIVE DIAGNOSIS:\n")
    .append("\n")
    .append("Surgeon/physician:\n") 
    .append("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n")
    .append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
	.append("PATHOLOGY REPORT\n")
	.append("Laboratory: ANN ARBOR VAMC                             Accession No. CY 10 4028\n")
	.append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
	.append("\n")
	.append("\n")
	.append("GROSS DESCRIPTION:\n")
    .append("100 ml yellow fluid used to make one concentrated/smeared slide.\n")  
	.append("\n")
	.append("CYTOPATHOLOGIC DIAGNOSIS:\n")
    .append("Urine;  scant cellularity, negative for malignant cells.\n")  
	.append("\n")
	.append("CPT:  88108\n") 
	.append("\n")
	.append("/es/ PRISCILLA R GOOFBALLIUS MD\n")
	.append("Attending Physician, Pathology and Laboratory\n")
	.append("Signed OCT 26, 2010@11:01:09\n")
	.append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
	.append("                          (End of report)\n")
    .append("PRISCILLA R GOOFBALLIUS MD MD                       df | Date Oct 26, 2010\n")
	.append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
	.append("SUDDEN,GEORGE LEROY                               STANDARD FORM 515\n")
	.append("ID:363-56-1395  SEX:M DOB:12/21/1950  AGE: 59 LOC:L-MUSKEGON CBOC\n")
	.append("               PCP: \n")
    .append("Facility: ANN ARBOR VAMC\n")
	.append("===============================================================================\n")
	.toString();

    private String emReport = new StringBuilder("Report\n")
    .append("\n")
    .append("                              ---- ELECTRON MICROSCOPY ----\n")
    .append("\n")
    .append("  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
    .append("       MEDICAL RECORD |                   ELECTRON MICROSCOPY\n")
    .append("  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
    .append("                                PATHOLOGY REPORT\n")
    .append("  Laboratory: ANN ARBOR VAMC                               Accession No. EM 08 44\n")
    .append("  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
    .append("  Submitted by: XYZ,SUSAN MD                  Date obtained: Oct 28, 2008\n")
    .append("  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
    .append("  Specimen (Received Oct 29, 2008 07:25):\n")
    .append("  SKIN OF RIGHT LOWER ABDOMEN\n")
    .append("  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
    .append("  BRIEF CLINICAL HISTORY:\n")
    .append("       63 year old male.  Specimen submitted for evaluation for CADASIL\n")
    .append("       syndrome.  \n")
    .append("  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
    .append("  PREOPERATIVE DIAGNOSIS:\n")
    .append("  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
    .append("OPERATIVE FINDINGS:\n")
    .append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
   	.append("POSTOPERATIVE DIAGNOSIS:\n")
 	.append("  \n")
 	.append("                         Surgeon/physician: SUSAN XYZ MD\n")
 	.append("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n")
 	.append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
 	.append("                            PATHOLOGY REPORT\n")
 	.append("Laboratory: ANN ARBOR VAMC                               Accession No. EM 08 44\n")
 	.append("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
 	.append("\n")
 	.append("\n")
 	.append("LIGHT MICROSCOPIC DESCRIPTION:\n")
 	.append("   Ten, micron thick plastic semi-thin sections include normal appearing\n")
 	.append("   epidermis and dermis with multiple large and small vessels.  Sections\n")
 	.append("   of the vascular dermis were taken for ultrastructural examination.  \n")
 	.append("\n")
 	.append("ULTRASTRUCTURAL DESCRIPTION:\n")
 	.append("     TRANSMISSION ELECTRON MICROSCOPY:  Capillaries, arterials and venules\n")
 	.append("     are identified.  Within these vessels, endothelial cells, pericytes\n")
 	.append("     and smooth muscle cells are identified.  While some vessels showed no\n")
 	.append("     abnormalities, in several vessels, pericytes or smooth muscle cells\n")
 	.append("     demonstrated shallow enfoldings with deposits of granular osmiophilic\n")
 	.append("     material in the adjacent extracellular matrix.  These electron dense\n")
 	.append("\n")
 	.append("    ovoid or rounded aggregates closely approached the cell membrane\n")
 	.append("becoming more diffuse in the surrounding matrix.  In addition, loose\n")
 	.append("aggregates of this granular osmiophilic material were found in the\n")
 	.append("extracellular matrix adjacent to the smooth muscle cells.  Electron\n")
 	.append("dense material was also found within the cytoplasm of some cells in\n")
 	.append("direct contact with the plasma membrane.  \n")
 	.append("        \n")
 	.append("COMMENT:  Granular osmiophilic material in the basement membrane of\n")
 	.append("vascular smooth muscle cells is a characteristic feature of CADASIL\n")
 	.append("(cerebral autosomal dominant arteriopathy with subcortical infarct and\n")
 	.append("leukoencephalopathy).  \n")
 	.append("  \n")
 	.append("  DIAGNOSIS:\n")
	.append("       Skin of right lower abdomen, biopsy; granular deposits consistent with\n")
    .append("       the diagnosis of CADASIL.  \n")
    .append("        \n")
    .append("       CPT:  88305, 88348, 88313\n") 
    .append("  \n")
    .append("  /es/ HEDWIG MUDHEN MD\n")
    .append("  Attending Physician, Pathology and Laboratory\n")
    .append("  Signed DEC 04, 2008@11:48:47\n")
    .append("  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
    .append("                                                           (End of report)\n")
	.append("  HEDWIG MUDHEN MD MD PhD                             df | Date Dec 02, 2008\n")
	.append("  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n")
	.append("  ABCD,RONALD EUGENE                                STANDARD FORM 515\n")
	.append("  ID:369-46-2732  SEX:M DOB:08/30/1945  AGE: 63 LOC:L-DERM\n")
	.append("                                                PCP: \n")
    .append("Facility: ANN ARBOR VAMC\n")
    .append("===============================================================================\n")
    .toString();
}
