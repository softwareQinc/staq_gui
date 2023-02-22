#!/bin/sh
​
# Start the ssh server
sudo service ssh start
​
# Execute the CMD
exec "$@"