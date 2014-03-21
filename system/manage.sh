#!/bin/bash
#
# This file supports various actions for managing the server.

BASE_PATH="/home/deploy/server/"
LOG_PATH="${BASE_PATH}logs/"
SERVER_FILE="${BASE_PATH}server.js"


########## Helpers ##########

checkServerIsRunning() {
  #Get rid of all columns but the script name
  forever columns set script > /dev/null

  output=`forever list | grep "\[[0-9]*\]" | grep "${SERVER_FILE}"`
  if [[ $output == "" ]]
  then
    #The server is stopped
    exit_status=0;
  else
    #The server is running
    exit_status=1;
  fi

  #Return columns to original state
  forever columns set uid command script forever pid logfile uptime > /dev/null
  return $exit_status
}

##############################



########## Action Methods ##########

start() {
  #Start the server
  checkServerIsRunning
  if [[ $? == 0 ]]
  then
    forever start -al ${LOG_PATH}forever.log -ao ${LOG_PATH}out.log -ae ${LOG_PATH}err.log ${SERVER_FILE}
  else
    echo "The server is already running"
  fi
}

stop() {
  #Stop the server
  checkServerIsRunning
  if [[ $? == 0 ]]
  then
    echo "The server is already stopped"
  else
    forever stop ${SERVER_FILE}
  fi
}

restart() {
  #Restart the server
  forever restart ${SERVER_FILE}
}

status() {
  #Print the server status
  checkServerIsRunning
  if [[ $? == 0 ]]
  then
    echo "[${SERVER_FILE}] status: stopped"
  else
    echo "[${SERVER_FILE}] status: running"
  fi
}

help() {
  #Print a help message for this script
  echo -ne "\tUsage: ${0} [action]\n";
  echo -ne "\n";
  echo -ne "\tActions:\n";
  echo -ne "\t\tstart";         echo -ne "\t\tStarts the server\n";
  echo -ne "\t\tstop";          echo -ne "\t\tStops the server\n";
  echo -ne "\t\trestart";       echo -ne "\t\tRestarts the server\n";
  echo -ne "\t\tstatus";        echo -ne "\t\tPrints whether or not the server is running\n";
}

##############################



########## Actions ##########

if [[ $1 == "start" ]]
then
  start
elif [[ $1 == "stop" ]]
then
  stop
elif [[ $1 == "restart" ]]
then
  restart
elif [[ $1 == "status" ]]
then
  status
else
  help
fi

##############################
