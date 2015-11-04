package gov.med.va.innovations.domain;

import java.io.Serializable;
import java.util.Date;

public class Testimonial implements Serializable {
	private static final long serialVersionUID = -5297450933587019683L;
	private Long id;
    private String title;
    private String quote;
    private String testimonial;
    private String imageLink;
	private String createdBy;
	private String updatedBy;
	private Date updateDate;
	private byte[] createDate;
    
	public Long getId() {
		return id;
	}
	public void setId(Long testimonialId) {
		this.id = testimonialId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getQuote() {
		return quote;
	}
	public void setQuote(String quote) {
		this.quote = quote;
	}
	public String getTestimonial() {
		return testimonial;
	}
	public void setTestimonial(String testimonial) {
		this.testimonial = testimonial;
	}
	public String getImageLink() {
		return imageLink;
	}
	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public byte[] getCreateDate() {
		return createDate;
	}
	public void setCreateDate(byte[] createDate) {
		this.createDate = createDate;
	}
}