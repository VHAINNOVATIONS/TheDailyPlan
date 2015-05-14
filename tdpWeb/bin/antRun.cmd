@ECHO OFF

@REM WARNING: This file is created by the Configuration Wizard.
@REM Any changes to this script may be lost when adding extensions to this configuration.

SETLOCAL

set DOMAIN_HOME=C:\Oracle\Middleware\user_projects\domains\tdp_domain
set WORKSPACE_HOME=C:\Documents and Settings\insanmaster\workspace
for %%i in ("%WORKSPACE_HOME%") do set WORKSPACE_HOME=%%~fsi

set CLASSPATH=%WORKSPACE_HOME%\shared\lib\dbunit-2.4.5.jar
set CLASSPATH=%CLASSPATH%;%WORKSPACE_HOME%\shared\lib\slf4j-api-1.6.0.jar
set CLASSPATH=%CLASSPATH%;%WORKSPACE_HOME%\shared\lib\slf4j-simple-1.6.0.jar

call "%DOMAIN_HOME%\bin\setDomainEnv.cmd"

CD "%WORKSPACE_HOME%"
pushd TdpApp
svn update
popd
pushd TdpWeb
svn update
ant %*


ENDLOCAL

PAUSE