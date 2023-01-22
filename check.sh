#!/bin/bash
FILE=/var/bot/restart
while true
do
  if test -f "$FILE"; then
    echo "$FILE exists. Restarting..."
    rm -R $FILE
    sleep 3
    systemctl restart bot
  fi
done

