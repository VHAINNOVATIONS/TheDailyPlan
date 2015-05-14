package gov.med.va.innovations.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class Template extends BaseObject implements Serializable {
	private static final long serialVersionUID = 766295020269949325L;
	private Long id;
    private String name;
    private String ward;
    private String description;
    private List<Component> components;
	private String createdBy;
	private String updatedBy;
	private Date updateDate;
	private byte[] createDate;
    
	@Override
	public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Template)) {
            return false;
        }

        final Template tpl = (Template) o;

        return !(name != null ? !name.equals(tpl.getName()) : tpl.getName() != null);
	}
	
	@Override
	public int hashCode() {
        return (name != null ? name.hashCode() : 0);
	}
	@Override
	public String toString() {
        ToStringBuilder sb = new ToStringBuilder(this, ToStringStyle.DEFAULT_STYLE)
        .append("id", this.id)
        .append("name", this.name)
        .append("description", this.description);
        
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<Component> getComponents() {
		return components;
	}
	public void setComponents(List<Component> components) {
		this.components = components;
	}

    /**
     * Convert user roles to LabelValue objects for convenience.
     * @return a list of LabelValue objects with role information
     */
    @Transient
    public List<LabelValue> getComponentList() {
        List<LabelValue> templateComponents = new ArrayList<LabelValue>();

        if (this.components != null) {
            for (Component comp : components) {
                // convert the template's components to LabelValue Objects
            	templateComponents.add(new LabelValue(comp.getName(), comp.getName()));
            }
        }

        return templateComponents;
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

	public String getWard() {
		return ward;
	}

	public void setWard(String ward) {
		this.ward = ward;
	}
	
	public String getComponentCount() {
		return "" + components.size();
	}
}