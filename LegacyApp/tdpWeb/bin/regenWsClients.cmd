PATH=%PATH%;"\tools\apache-cxf-2.1.3\bin"

CD "\Documents and Settings\insanmaster\My Documents\workspace\tdpWeb"

wsdl2java -client -d src\main\java src\main\resources\wsdl\emrsvc.wsdl

wsdl2java -client -d src\main\java src\main\resources\wsdl\querysvc.wsdl

pause