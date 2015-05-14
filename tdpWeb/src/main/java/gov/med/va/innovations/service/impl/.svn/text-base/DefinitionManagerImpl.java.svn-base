package gov.med.va.innovations.service.impl;

import gov.med.va.innovations.dao.DefinitionDao;
import gov.med.va.innovations.dao.mdws.VistaMdwsDao;
import gov.med.va.innovations.dao.mdws.WebsiteReader;
import gov.med.va.innovations.domain.Definition;
import gov.med.va.innovations.domain.DefinitionStatus;
import gov.med.va.innovations.service.DefinitionManager;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.DataIntegrityViolationException;

/**
 * Implementation of RoleManager interface.
 * 
 * @author mark
 */
@Path("/definitions")
public class DefinitionManagerImpl extends UniversalManagerImpl implements DefinitionManager {
	private static final Log LOG = LogFactory.getLog(DefinitionManagerImpl.class);
	private VistaMdwsDao vistaMdwsDao;

    public DefinitionDao getDefinitionDao() {
        return (DefinitionDao) dao;
    }

	@Override
	@Produces("application/json")
	@GET
	@Path("/abbreviation/{abbrev}")
	public Definition getDefinition(@PathParam("abbrev") String abbrev) {
		List<Definition> defs = getDefinitionDao().findByAbbreviation(abbrev);
		if (defs.size() > 0) {
			Definition def = defs.get(0);
			switch (def.getStatus()) {
				case MISSING:
				case MEDLINEPLUS:
					Calendar cal = new GregorianCalendar();
					cal.setTime(new Date());
					cal.add(Calendar.DATE, 1); // Tomorrow
					if (null == def.getNextRefresh() || def.getNextRefresh().before(new Date())) {
						try {
							WebsiteReader reader = new WebsiteReader();
							List<Definition> medlineDefs = reader.lookupTerm(abbrev);
							if (medlineDefs.size() > 0) {
								def.setDefinition(medlineDefs.get(0).getDefinition());
								def.setMedlinePlusIndex(0);
								def.setStatus(medlineDefs.get(0).getStatus());
								def.setNextRefresh(cal.getTime());
								save(def);
							}
							else {
								def.setNextRefresh(cal.getTime());
								save(def);
							}
						} catch (IOException ioe) {
							LOG.error("Error with lookup of MedlinePlus", ioe);
						}
					}
					break;
				default:
					break;
			}
			return def;
		}
		else {
			try {
				WebsiteReader reader = new WebsiteReader();
				defs = reader.lookupTerm(abbrev);
				if (defs.size() > 0) {
					Definition def = defs.get(0);
					def = (Definition) save(def);
					return def;
				}
			} catch (IOException ioe) {
				LOG.error("Problem with Lookup of Medline Plus",ioe);
			}
			return null;
		}
	}

	@Override
	public void removeDefinition(String abbrev) {
		List<Definition> defs = getDefinitionDao().findByAbbreviation(abbrev);
		if (defs.size() > 0)
			dao.remove(Long.class,defs.get(0).getId());
	}

	@Override
	public List<Definition> getCommonMedlineDefs() {
		List<Definition> defs = new ArrayList<Definition>();
		List<String> commonDefs = vistaMdwsDao.getVistaFile("51.1", new String[]{".01","8"}, "", null, null, null);
		for(String abbrevRec : commonDefs) {
			String[] abbrevParts = abbrevRec.split("\\^");
			if (abbrevParts.length > 2)
				defs.add(new Definition(abbrevParts[1], abbrevParts[2], DefinitionStatus.COMMON));
		}
		
		return defs;
	}

	@Override
	@Produces("application/json")
	@GET
	@Path("/medlineAbbreviation/{abbrev}")
	public List<Definition> lookupMedlineDef(@PathParam("abbrev") String abbrev) {
		try {
			WebsiteReader reader = new WebsiteReader();
			return reader.lookupTerm(abbrev);
		} catch (IOException ioe) {
			LOG.error("Problem communicating with MedlinePlus site", ioe);
			return new ArrayList<Definition>();
		}
	}

	@Override
	public void reloadCommonMedlineDefs() {
		List<Definition> defs = getCommonMedlineDefs();
		
		if (null != defs && defs.size() > 0) {
			for(Definition def: getDefinitionDao().findByStatus(DefinitionStatus.COMMON)) {
				remove(Definition.class,def);
			}
			for(Definition def: defs) {
				try {
					save(def);
				}
				catch(DataIntegrityViolationException die) {
					LOG.warn("Trying to insert duplicate definition: " + def.getAbbreviation());
				}
			}
			
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	@Produces("application/json")
	@GET
	public List<Definition> list() {
		return getAll(Definition.class);
	}

	public void setVistaMdwsDao(VistaMdwsDao vistaMdwsDao) {
		this.vistaMdwsDao = vistaMdwsDao;
	}
}