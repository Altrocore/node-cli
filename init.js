// init.js

const http = require('http');
const readline = require('readline');
const { createUserMenu } = require('./create');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function initWebServer() {
    // Check if the server is already running (e.g., by checking for a server flag in a config file)
    if (fs.existsSync('server-config.json')) {
        // Server is already running, do not start it again
        console.log('The server is already running. Skipping initialization.');
    } else {
        // Start the server
        startServer();
    }

    // Regardless of whether the server is started, initiate the "Create User" menu
    createUserMenu(rl);
}

function startServer() {
    // HTTP server initialization code here
    // Save a flag in a config file to indicate that the server is running
    fs.writeFileSync('server-config.json', JSON.stringify({ serverRunning: true }));

    console.log('HTTP server started on port 8080');
}

module.exports = { initWebServer };
