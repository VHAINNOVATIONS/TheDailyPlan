package gov.med.va.innovations.domain;

import java.io.Serializable;
import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class Component extends BaseObject implements Serializable {
	private static final long serialVersionUID = -3482939787655352667L;
	private Long id;
    private String name;
    private String title;
    private String template;
    private boolean mandatory;
    private String method;
	private String createdBy;
	private String updatedBy;
	private Date updateDate;
	private byte[] createDate;
	private Long priority;
    private boolean hasCriteria;
    private String criteria;
	
	public Component() {}
	public Component(Component that) {
		this.id = that.id;
		this.name = that.name;
		this.title = that.title;
		this.template = that.template;
		this.mandatory = that.mandatory;
		this.method = that.method;
		this.createdBy = that.createdBy;
		this.updatedBy = that.updatedBy;
		this.createDate = that.createDate;
		this.updateDate = that.updateDate;
		this.hasCriteria = that.hasCriteria;
		this.criteria = that.criteria;
	}

	@Override
	public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Component)) {
            return false;
        }

        final Component cmp = (Component) o;

        return !(id != null ? !id.equals(cmp.getId()) : cmp.getId() != null);
	}
	
	@Override
	public int hashCode() {
        return (name != null ? name.hashCode() : 0);
	}
	@Override
	public String toString() {
        ToStringBuilder sb = new ToStringBuilder(this, ToStringStyle.DEFAULT_STYLE)
        .append("name", this.name);
        
        return sb.toString();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public boolean isMandatory() {
		return mandatory;
	}

	public void setMandatory(boolean b) {
		this.mandatory = b;
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

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}
	public void setPriority(Long priority) {
		this.priority = priority;
	}
	public Long getPriority() {
		return priority;
	}
	public boolean isHasCriteria() {
		return hasCriteria;
	}
	public void setHasCriteria(boolean hasCriteria) {
		this.hasCriteria = hasCriteria;
	}
	public String getCriteria() {
		return criteria;
	}
	public void setCriteria(String criteria) {
		this.criteria = criteria;
	}

}