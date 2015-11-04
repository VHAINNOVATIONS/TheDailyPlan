package gov.med.va.innovations.dao;

import gov.med.va.innovations.domain.Component;
import gov.med.va.innovations.domain.Template;

import java.util.ArrayList;
import java.util.List;

/**
 * This class tests the current TemplateDao and ComponentDao implementation classes
 */
public class TemplateDaoTest extends BaseDaoTestCase {
    private TemplateDao dao;
    private ComponentDao compDao;

	public void setTemplateDao(TemplateDao dao) {
        this.dao = dao;
    }

	public void setComponentDao(ComponentDao dao) {
        this.compDao = dao;
    }

    public void testGetInvalid() throws Exception {
        Template temp = dao.getTemplateByName("bogus");
        assertTrue(null == temp);
    }

    public void testGet() throws Exception {
        Template temp = dao.getTemplateByName("Mandatory Components");
        assertNotNull(temp);
        assertNotNull(temp.getComponents());
        
        List<Template> temps = dao.getTemplatesForWard("ICU/CCU");
        assertEquals(2,temps.size());
    }

    public void testUpdateComponent() throws Exception {
        Template temp = dao.get(1L);
        temp.setDescription("test description");
        dao.save(temp);
        flush();
        
        temp = dao.get(1L);
        assertEquals("test description", temp.getDescription());
    }

    public void testAddAndRemoveRole() throws Exception {
        Template tpl = new Template();
        tpl.setName("new Template");
        tpl.setDescription("new template descr");
        tpl.setCreatedBy("tester");
        tpl.setComponents(makeComponents(3));
        dao.save(tpl);
        flush();
        
        tpl = dao.getTemplateByName("new Template");
        assertNotNull(tpl.getDescription());
        assertTrue(tpl.getComponents().size() > 0);

        dao.remove(tpl.getId());
        flush();

        tpl = dao.getTemplateByName("new Template");
        assertTrue(null == tpl);
    }
    
    private List<Component> makeComponents(int num) {
    	List<Component> comps = new ArrayList<Component>();
		for(int i = 0; i < num; i++) {
			Component comp = new Component();
			comp.setName("Comp_"+i);
			comp.setTitle("CompTitle_"+i);
			comp.setTemplate("Template_"+i);
			comp.setCreatedBy("tester");
			comp.setMethod("calMe");
			comp = compDao.save(comp);
			comps.add(comp);
		}
		return comps;
	}
}
