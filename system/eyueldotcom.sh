#!/bin/bash
#
# This script is located at /home/deploy/server/system/eyueldotcom.sh
# and is linked to as an init.d script at /etc/init.d/eyueldotcom.



handle() {
  su -c "~/server/manage.sh $1" deploy
}



case "$1" in
  start)
    handle start
    ;;
  stop)
    handle stop
    ;;
  status)
    handle status
    ;;
  restart|reload|force-reload)
    handle restart
    ;;
  *)
    echo "Usage: service eyueldotcom {start|stop|status|restart}"
    exit 1
    ;;
esac
