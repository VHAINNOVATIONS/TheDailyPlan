package gov.med.va.innovations.domain;

import gov.med.va.innovations.service.EventManager;

import java.util.List;
import java.util.Map;

public class VistaGenericList extends VistaTO {
	private static final long serialVersionUID = -2772533438067317975L;
	private List<VistaTO> vistaList;
	private List<Map<String,Object>> mapList;
	public List<VistaTO> getVistaList() {
		return vistaList;
	}
	public void setVistaList(List<VistaTO> vistaList) {
		this.vistaList = vistaList;
	}
	public List<Map<String, Object>> getMapList() {
		return mapList;
	}
	public void setMapList(List<Map<String, Object>> mapList) {
		this.mapList = mapList;
	}
	@Override
	public Integer getListLength() {
		return mapList.size();
	}

	@Override
	/**
	 * When returning a non-null value, will trigger event generation (audit) for each access
	 */
	public EventManager.EventCode getEventCode() {
		return null;
	}
}
