package gov.med.va.innovations.domain;

import java.io.Serializable;
import java.util.Date;

import org.apache.commons.lang.builder.CompareToBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class Definition implements Serializable, Comparable<Definition> {

	private static final long serialVersionUID = -5234831494120579587L;
	private Long id;
	private String abbreviation;
	private String definition;
	private boolean isDeleted;
	private DefinitionStatus status;
	private Integer medlinePlusIndex;
	private Date nextRefresh;
	private String lastupdateBy;
	
	
	public Definition() {}
	
	public Definition(String abbreviation, String definition, DefinitionStatus status) {
		this.abbreviation = abbreviation;
		this.definition = definition;
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}

	public String getDefinition() {
		return definition;
	}

	public void setDefinition(String definition) {
		this.definition = definition;
	}

	public boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	@Override
	public boolean equals(Object object) {
        if (!(object instanceof Definition)) {
            return false;
        }
        Definition rhs = (Definition) object;
        return new EqualsBuilder().append(this.id, rhs.id).append(this.abbreviation,
                rhs.abbreviation).append(this.definition, rhs.definition)
                .isEquals();

	}

	@Override
	public int hashCode() {
        return new HashCodeBuilder(896218595, -572312663).append(this.id)
        .append(this.abbreviation).append(this.definition).toHashCode();
	}

	@Override
	public String toString() {
		ToStringBuilder sb = new ToStringBuilder(this, ToStringStyle.DEFAULT_STYLE)
			.append("id", this.id)
			.append("abbreviation", this.abbreviation)
			.append("definition", this.definition)
			.append("isDeleted", this.isDeleted);
		
		return sb.toString();
	}

	public Integer getMedlinePlusIndex() {
		return medlinePlusIndex;
	}

	public void setMedlinePlusIndex(Integer medlinePlusIndex) {
		this.medlinePlusIndex = medlinePlusIndex;
	}

	public Date getNextRefresh() {
		return nextRefresh;
	}

	public void setNextRefresh(Date nextRefresh) {
		this.nextRefresh = nextRefresh;
	}

	public String getLastupdateBy() {
		return lastupdateBy;
	}

	public void setLastupdateBy(String lastupdateBy) {
		this.lastupdateBy = lastupdateBy;
	}

	public DefinitionStatus getStatus() {
		return status;
	}

	public void setStatus(DefinitionStatus status) {
		this.status = status;
	}
	
    /**
     * @see java.lang.Comparable#compareTo(Object)
     */
    public int compareTo(Definition myClass) {
        return new CompareToBuilder().append(this.id, myClass.id).append(this.abbreviation,
                myClass.abbreviation).toComparison();
    }

}
