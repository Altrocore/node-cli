const { initWebServer } = require('./init');
const { createFile, createUser, updateUser, deleteUser, searchUser } = require('./usersFunc.js');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define command handlers
function init() {
  initWebServer();
}

function create(username, email, phone, usersFileName) {
    let users = { users: [] };
    createFile(usersFileName, users);

    // Your create user logic here
}

function update(username, newUsername, usersFileName) {
    // Your update user logic here
}

function remove(username, usersFileName) {
    // Your delete user logic here
}

function search(query, usersFileName) {
    // Your search user logic here
}

module.exports = { init, create, update, remove, search };
