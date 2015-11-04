package gov.med.va.innovations.ui.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import gov.med.va.innovations.Constants;
import gov.med.va.innovations.domain.Testimonial;
import gov.med.va.innovations.service.GenericManager;
import gov.med.va.innovations.service.PagingLookupManager;
import gov.med.va.innovations.service.TestimonialManager;
import gov.med.va.innovations.ui.util.ExtendedPaginatedList;
import gov.med.va.innovations.ui.util.PaginateListFactory;

import org.apache.struts2.ServletActionContext;
import org.displaytag.pagination.PaginatedList;
import org.springframework.dao.DataIntegrityViolationException;

public class TestimonialAction extends BaseAction {

	private static final long serialVersionUID = 110706864090515863L;
    private PagingLookupManager pagingManager;
    private PaginateListFactory paginatedListFactory;
    private TestimonialManager testimonialManager;
    private PaginatedList testimonials;
    private Testimonial testimonial;
    private Long id;
    private File file;
    private String fileContentType;
    private String fileFileName;

    public void setId(Long id) {
    	this.id = id;
    }

	public Testimonial getTestimonial() {
		return testimonial;
	}

	public void setTestimonial(Testimonial testimonial) {
		this.testimonial = testimonial;
	}

    public void setPagingLookupManager(PagingLookupManager pagingManager) {
        this.pagingManager = pagingManager;
    }

	public void setPaginatedListFactory(PaginateListFactory paginatedListFactory) {
		this.paginatedListFactory = paginatedListFactory;
	}

	public void setTestimonialManager(
			GenericManager<Testimonial, Long> testimonialManager) {
		this.testimonialManager = (TestimonialManager) testimonialManager;
	}

	public String lookup() {
        loadTestimonials();
		return SUCCESS;
	}

	public PaginatedList getTestimonials() {
		return testimonials;		
	}

	public String list() {
        loadTestimonials();
		return SUCCESS;
	}

	private void loadTestimonials() {
		ExtendedPaginatedList paginatedList = paginatedListFactory
        	.getPaginatedListFromRequest(getRequest());
		testimonials = pagingManager.getAllRecordsPage(Testimonial.class, paginatedList);
	}
	
	public String delete() {
		testimonialManager.remove(testimonial.getId());
	    saveMessage(getText("definition.deleted"));

	    return SUCCESS;
	}

	public String edit() {
	    if (id != null) {
	    	testimonial = testimonialManager.get(id);
	    } else {
	    	testimonial = new Testimonial();
	    }

	    return SUCCESS;
	}

	public String save() throws Exception {
	    if (cancel != null) {
	        return CANCEL;
	    }
	    if (LOG.isDebugEnabled()) LOG.debug("Starting Save...");

	    if (delete != null) {
	        return delete();
	    }

	    boolean isNew = (testimonial.getId() == null);

	    try {
	    	if (null != file) {
	    		uploadFile();
	    		testimonial.setImageLink((String) getRequest().getAttribute("link"));
	    	}
	    	if (isNew) {
	    		testimonial.setCreatedBy(getRequest().getRemoteUser());
	    	}
	    	else {
	    		testimonial.setUpdatedBy(getRequest().getRemoteUser());
	    	}
	    	testimonial = testimonialManager.save(testimonial);
	    }
	    catch(DataIntegrityViolationException die) {
	    	addActionError(getText("testimonial.exists", new String[]{testimonial.getTitle()}));
	    	return INPUT;
	    }

	    String key = (isNew) ? "testimonial.added" : "testimonial.updated";
	    saveMessage(getText(key));

	    if (!isNew) {
	        return INPUT;
	    } else {
	        return SUCCESS;
	    }
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}
	
    public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	private void uploadFile() throws Exception {

        // the directory to upload to
        String uploadDir = ServletActionContext.getServletContext().getRealPath("/resources")
                + "/";

        // write the file to the file specified
        File dirPath = new File(uploadDir);

        if (!dirPath.exists()) {
            dirPath.mkdirs();
        }

        //retrieve the file data
        InputStream stream = new FileInputStream(file);

        //write the file to the file specified
        OutputStream bos = new FileOutputStream(uploadDir + fileFileName);
        int bytesRead;
        byte[] buffer = new byte[8192];

        while ((bytesRead = stream.read(buffer, 0, 8192)) != -1) {
            bos.write(buffer, 0, bytesRead);
        }

        bos.close();
        stream.close();

        // place the data into the request for retrieval on next page
        getRequest().setAttribute("location", dirPath.getAbsolutePath()
                + Constants.FILE_SEP + fileFileName);

        String link = getRequest().getContextPath() + "/resources" + "/";

        getRequest().setAttribute("link", link + fileFileName);
    }

    @Override
    public void validate() {
        if (getRequest().getMethod().equalsIgnoreCase("post")) {
            getFieldErrors().clear();
            if (null != file && file.length() > 2097152) {
                addActionError(getText("maxLengthExceeded"));
            }
        }
    }

}
