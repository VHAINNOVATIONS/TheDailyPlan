@echo off
@rem ***************************************************************************
@rem This script is used to build the DailyPlanWeb artifacts
@rem
@rem JAVA_HOME and TDP_HOME need to be configured prior to invoking this script
@rem ***************************************************************************

setlocal

set MW_HOME=C:\Oracle\Middleware
set TDP_HOME=C:\Documents and Settings\insanmaster\My Documents\workspace
set SHARED_HOME=%TDP_HOME%\shared
set SVN_HOME=


if not defined TDP_HOME (
  echo "ERROR: You must set TDP_HOME and it must point to a directory".
  echo "       where an installation of TdpWeb exists. "
  goto finish
)

if not defined JAVA_HOME (
  echo "ERROR: You must set JAVA_HOME and point it to a valid location"
  echo "       of where your JDK has been installed"
  goto finish
)

@rem
@rem Setup the environment
@rem
call "%MW_HOME%\wlserver_10.3\server\bin\setWLSEnv.cmd"

set DBUNIT=%SHARED_HOME%\lib\dbunit-2.4.5.jar;%SHARED_HOME%\lib\slf4j-api-1.6.0.jar;%SHARED_HOME%\lib\slf4j-simple-1.6.0.jar
FOR %%i IN ("%DBUNIT%") DO SET DBUNIT=%%~fsi
set CLASSPATH=%CLASSPATH%%DBUNIT%

@rem 
@rem Build the tdp ear file
@rem 
%JAVA_HOME%\bin\java.exe -Dant.home=%MW_HOME%\modules\org.apache.ant_1.7.1 org.apache.tools.ant.Main -f "%TDP_HOME%"\tdpWeb\build.xml %*

:finish

pause

endlocal
