#!/bin/bash
#
# description: TDP EWD init script
# processname: EWD  
 
#Location of EWD_HOME
export EWD_HOME=/home/ewdjs/
 
#EWD Command
export EWDCMD=ewdStart-cache-linux.js
 
#EWD_USER is the default user of EWD
export EWD_USER=ewd
 
#EWD_USAGE is the message if this script is called without any options
EWD_USAGE="Usage: $0 {\e[00;32mstart\e[00m|\e[00;31mstop\e[00m|\e[00;31mkill\e[00m|\e[00;32mstatus\e[00m|\e[00;31mrestart\e[00m}"
 
#SHUTDOWN_WAIT is wait time in seconds for EWD proccess to stop
SHUTDOWN_WAIT=20
 
ewd_pid() {
        echo `ps -fe | grep $EWDCMD | grep -v grep | tr -s " "|cut -d" " -f2`
}
 
start() {
  pid=$(ewd_pid)
  if [ -n "$pid" ]
  then
    echo -e "\e[00;31mEWD is already running (pid: $pid)\e[00m"
  else
    # Start EWD
    echo -e "\e[00;32mStarting EWD\e[00m"
    #ulimit -n 100000
    #umask 007
    #/bin/su -p -s /bin/sh $EWD_USER
        if [ `user_exists $EWD_USER` = "1" ]
        then
                /bin/su $EWD_USER -c $EWD_HOME/$EWDCMD
        else
                echo -e "\e[00;31mEWD user $EWD_USER does not exists. Starting with $(id)\e[00m"
                sh $EWD_HOME/$EWDCMD
        fi
        status
  fi
  return 0
}
 
status(){
          pid=$(ewd_pid)
          if [ -n "$pid" ]
            then echo -e "\e[00;32mEWD is running with pid: $pid\e[00m"
          else
            echo -e "\e[00;31mEWD is not running\e[00m"
            return 3
          fi
}

terminate() {
	echo -e "\e[00;31mTerminating EWD\e[00m"
	kill -9 $(EWD_pid)
}

stop() {
  pid=$(EWD_pid)
  if [ -n "$pid" ]
  then
    echo -e "\e[00;31mStoping EWD\e[00m"
    kill -9 $(EWD_pid)
  else
    echo -e "\e[00;31mEWD is not running\e[00m"
  fi
 
  return 0
}
 
user_exists(){
        if id -u $1 >/dev/null 2>&1; then
        echo "1"
        else
                echo "0"
        fi
}
 
case $1 in
	start)
	  start
	;;
	stop)  
	  stop
	;;
	restart)
	  stop
	  start
	;;
	status)
		status
		exit $?  
	;;
	kill)
		terminate
	;;		
	*)
		echo -e $EWD_USAGE
	;;
esac    
exit 0