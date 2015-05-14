package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;
import gov.va.medora.mdws.emrsvc.AllergyTO;
import gov.va.medora.mdws.emrsvc.ArrayOfAllergyTO;

import java.util.ArrayList;
import java.util.List;

public class VistaAllergyList extends VistaTO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2741220651699598926L;
	List<VistaAllergy> allergies = new ArrayList<VistaAllergy>();
	
	public VistaAllergyList(ArrayOfAllergyTO mdws) {
		if (null != mdws.getAllergyTO()) {
			for (AllergyTO allergy : mdws.getAllergyTO()) {
				allergies.add(new VistaAllergy(allergy));
			}
		}
	}

	public List<VistaAllergy> getAllergies() {
		return allergies;
	}

	public void addAllergies(ArrayOfAllergyTO mdws) {
		if (null != mdws.getAllergyTO()) {
			for (AllergyTO allergy : mdws.getAllergyTO()) {
				allergies.add(new VistaAllergy(allergy));
			}
		}
	}

	@Override
	public Integer getListLength() {
		return allergies.size();
	}

	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventManager.EventCode getEventCode() {
		return null;
	}
}
