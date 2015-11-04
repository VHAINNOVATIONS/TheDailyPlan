package gov.med.va.innovations.dao.ibatis.handler;

import java.sql.SQLException;

import com.ibatis.sqlmap.client.extensions.ParameterSetter;
import com.ibatis.sqlmap.client.extensions.ResultGetter;
import com.ibatis.sqlmap.client.extensions.TypeHandlerCallback;

@SuppressWarnings("unchecked")
public class EnumTypeHandler<E extends Enum> implements TypeHandlerCallback {

    private Class<E> enumClass_;
    
    public EnumTypeHandler(Class<E> enumClass)
    {
    	enumClass_ = enumClass;
    }
    
    @Override
    public void setParameter(ParameterSetter setter, Object parameter)
    throws SQLException
    {
    	if (null != parameter)
    		setter.setString(((E) parameter).name());
    	else
    		setter.setString("");
    }
    
    @Override
    public Object getResult(ResultGetter getter) throws SQLException
    {
    	return valueOf(getter.getString());
    }
    
    @Override
    public Object valueOf(String s)
    {
    	if (null == s || "".equals(s)) 
    		return null;
    	
    	return Enum.valueOf(enumClass_, s);
    }

}
