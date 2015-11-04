package gov.med.va.innovations.ui.report;

import org.xhtmlrenderer.pdf.ITextRenderer;
import org.xhtmlrenderer.pdf.PDFCreationListener;

import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.ColumnText;
import com.lowagie.text.pdf.PdfDocument;
import com.lowagie.text.pdf.PdfPageEventHelper;
import com.lowagie.text.pdf.PdfWriter;

public class CustomPageNumberRenderer implements PDFCreationListener {
	PdfWriter pdfWriter;
	PdfDocument pdfDoc;

	
	public void onClose(ITextRenderer iTextRenderer)  {
		pdfDoc.close(); 
	} 
	
	public void preOpen(ITextRenderer iTextRenderer)  {
		pdfWriter = iTextRenderer.getWriter();
		pdfWriter.open();
		pdfDoc = pdfWriter.getDirectContent().getPdfDocument();
//		Phrase phrase = new Phrase();
//		phrase.add(new Chunk("Hello World", FontFactory.getFont(FontFactory.HELVETICA, 8)));
//		HeaderFooter footer = new HeaderFooter(new Phrase(),false);
//		footer.setBorder(Rectangle.NO_BORDER);
//		footer.setAlignment(Element.ALIGN_RIGHT);
//		pdfDoc.setFooter(footer);
		pdfWriter.setBoxSize("pageNumber", new Rectangle(36, 54, 559, 788));

		pdfWriter.setPageEvent(new PdfPageEventHelper(){

			private int pagenumber;
			@Override
			public void onEndPage(PdfWriter writer, Document doc) {
				System.out.println("onEndPage");
				Rectangle rect = writer.getBoxSize("pageNumber");
				ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_CENTER, new Phrase(String.format("page %d", pagenumber)), (rect.getLeft() + rect.getRight()) / 2, rect.getBottom() - 35, 0);
			}

			@Override
			public void onStartPage(PdfWriter writer, Document doc) {
			      pagenumber++;  
			}

			@Override
			public void onChapter(PdfWriter arg0, Document arg1, float arg2,
					Paragraph arg3) {
				System.out.println("onChapter");
				super.onChapter(arg0, arg1, arg2, arg3);
			}

			@Override
			public void onParagraph(PdfWriter arg0, Document arg1, float arg2) {
				System.out.println("onParagraph");
				super.onParagraph(arg0, arg1, arg2);
			}

			@Override
			public void onSection(PdfWriter arg0, Document arg1, float arg2,
					int arg3, Paragraph arg4) {
				System.out.println("onSection");
				super.onSection(arg0, arg1, arg2, arg3, arg4);
			}
		});
	}

}
