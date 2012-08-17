#Dotgame with socket.io

I wrote this so that I could demo it at http://www.bangalorejs.org/first.html for my talk

##How to run
ser.sh has a shell script to run the server. Right now it is hardcoded to listen on port 81, so you need root privileges
index.html must be configured to load socket.io.js from the server

##What is needed
The server code is server.js and queue.js
The rest is the client side code

It users supervisor to look for modifications in server.js and queue.js and automatically reloads the server
I also use underscore.js and express

The client uses underscore.js, jquery, bootstrap


