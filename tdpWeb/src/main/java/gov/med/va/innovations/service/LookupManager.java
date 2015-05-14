package gov.med.va.innovations.service;

import java.util.List;

import gov.med.va.innovations.domain.LabelValue;

/**
 * Business Service Interface to talk to persistence layer and
 * retrieve values for drop-down choice lists.
 *
 * @author <a href="mailto:matt@raibledesigns.com">Matt Raible</a>
 */
public interface LookupManager extends UniversalManager {
    /**
     * Retrieves all possible roles from persistence layer
     * @return List of LabelValue objects
     */
    List<LabelValue> getAllRoles();
    /**
     * Retrieves all possible components from persistence layer
     * @return List of LabelValue objects
     */
    List<LabelValue> getAllComponents();
}
