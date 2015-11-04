package gov.med.va.innovations.service;

import gov.med.va.innovations.domain.Definition;

import java.util.List;

/**
 * Business Service Interface to talk to persistence layer and
 * retrieve values for abbreviation definitions.
 *
 * @author mark
 */
public interface DefinitionManager extends UniversalManager {
    
	/**
	 * Allows definition retrieval by abbreviation
	 * @param abbrev
	 * @return
	 */
    Definition getDefinition(String abbrev);

    /**
     * Allows for definition removal by abbreviation
     * @param abbrev
     */
    void removeDefinition(String abbrev);
    
    /**
     * Retrieve Common medical definitions from the Merriam-Webster MedlinePlus online dictionary 
     * @return List of common definitions
     */
    List<Definition> getCommonMedlineDefs();
    
    /**
     * Reload all definitions with a status of COMMON with MedlinePlus Common Definitions
     */
    void reloadCommonMedlineDefs();

    /**
     * Lookup a definition from the Merriam-Webster MedlinePlus online dictionary 
     * @param abbrev
     * @return
     */
    List<Definition> lookupMedlineDef(String abbrev);
    
    List<Definition> list();
}
