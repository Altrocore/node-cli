const crypto = require('crypto');
const { readFile, createFile } = require('./fileOperations');

function generateToken() {
    return crypto.createHash('sha256').update(Math.random().toString()).digest('hex');
}

function createUser(users, username) {
    const token = generateToken();
    users.users.push({ username, token });
    return users;
}

function updateUser(users, username, newUsername) {
  console.log(users)
    const user = users.users.find(user => user.username === username);
    if (user) {
        user.username = newUsername;
    }
    return users;
}

function deleteUser(users, username) {
    users.users = users.users.filter(user => user.username !== username);
    return users;
}

function searchUser(users, query) {
    return users.users.find(user => user.username === query || user.email === query || user.phone === query);
}

module.exports = { generateToken, createUser, updateUser, deleteUser, searchUser };
