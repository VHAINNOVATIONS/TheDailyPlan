package gov.med.va.innovations.service.impl;

import static org.junit.Assert.assertSame;
import gov.med.va.innovations.dao.DefinitionDao;
import gov.med.va.innovations.domain.Definition;

import java.util.ArrayList;
import java.util.List;

import org.jmock.Expectations;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class DefinitionManagerImplTest extends BaseManagerMockTestCase {
	private DefinitionManagerImpl mockManager = null;
	private DefinitionDao dao = null;
	
	@Before
	public void setUp() {
		dao = context.mock(DefinitionDao.class);
		mockManager = new DefinitionManagerImpl();
		mockManager.setDao(dao);
	}
	
	@After
	public void tearDown() {
		mockManager = null;
	}
	
	@Test
	public void testGetDefinition() {
        log.debug("testing getAll...");

        final List<Definition> definitions = new ArrayList<Definition>();

        // set expected behavior on dao
        context.checking(new Expectations() {{
            one(dao).getAll(Definition.class);
            will(returnValue(definitions));
        }});

        List<Definition> result = mockManager.getAll(Definition.class);

        assertSame(definitions, result);
	}
	
    @Test
    public void testSaveDefinition() {
        log.debug("testing save...");

        final Definition def = new Definition();
        // enter all required fields
        def.setId(-11L);
        def.setAbbreviation("ZZ");
        def.setDefinition("Zorro Zeroes");
        
        // set expected behavior on dao
        context.checking(new Expectations() {{
            one(dao).save(with(same(def)));
        }});

        mockManager.save(def);
    }

//    @Test
//    public void testRemoveDefinition() {
//        log.debug("testing remove...");
//
//        final Long id = -11L;
//
//        // set expected behavior on dao
//        context.checking(new Expectations() {{
//            one(dao).remove(Definition.class,with(equal(id)));
//        }});
//
//        mockManager.remove(Definition.class,id);
//    }
}
