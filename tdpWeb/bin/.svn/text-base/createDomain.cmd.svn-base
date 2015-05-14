rem @echo off

set MW_HOME=C:\Oracle\Middleware
set WL_HOME=%MW_HOME\%wlserver
set JAVA_HOME=C:\Program Files\Java\jdk1.6.0_20

pushd %MW_HOME%
call configure.cmd

mkdir %MW_HOME%\user_projects
%MW_HOME%\wlserver\common\bin\config.cmd

popd