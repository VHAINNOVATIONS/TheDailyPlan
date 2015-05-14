package gov.med.va.innovations;

import gov.med.va.innovations.ui.report.CustomPageNumberRenderer;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.xhtmlrenderer.pdf.ITextRenderer;

public class QuickPdf {
	private static final String LOC = "src/test/report/";

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {
		if (args.length == 1) {
			generateReport(args[0]);
		}
		else {
			System.err.println("No report supplied! Using " + LOC + "testReport as a default.");
			generateReport("testReport");
		}
	}
	
	private static void generateReport(String reportName) throws Exception {
		
		String filePath = LOC + reportName + ".html";
		File testHtml = new File(filePath);
		if (testHtml.exists()) {
		    byte[] buffer = new byte[(int) testHtml.length()];
		    BufferedInputStream f = null;
		    try {
		        f = new BufferedInputStream(new FileInputStream(filePath));
		        f.read(buffer);
		    } finally {
		        if (f != null) try { f.close(); } catch (IOException ignored) { }
		    }
		    String result = new String(buffer);
			
            String outputFile = LOC + reportName + ".pdf";
                   
	        try {
	            OutputStream os = new FileOutputStream(outputFile);
		        DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
		        Document doc = builder.parse(new ByteArrayInputStream(result.getBytes()));
		        ITextRenderer renderer = new ITextRenderer();
		        renderer.setDocument(doc, null);
		        renderer.setListener(new CustomPageNumberRenderer());
		        renderer.layout();
		        renderer.createPDF(os);
		        os.close();
	        }
	        catch(Exception e) {
	        	throw new IOException(e.fillInStackTrace());
	        }
	
		}
	}
}
