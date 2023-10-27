const fs = require('fs');
defaultFileName = './users.json';

function createFile(fileName = defaultFileName, content) {
    defaultFileName = fileName;
    fs.writeFileSync(fileName, JSON.stringify(content, null, 2));
}

function createUser(users, username, email, phone) {
    const token = generateToken(); // Assuming you export generateToken from init.js
    users.users.push({ username, email, phone, token });
    return users;
}

function updateUser(users, username, newUsername) {
    const user = users.users.find((user) => user.username === username);
    if (user) {
        user.username = newUsername;
    }
    return users;
}

function deleteUser(users, username) {
    users.users = users.users.filter((user) => user.username !== username);
    return users;
}

function searchUser(users, query) {
    return users.users.find((user) => user.username === query || user.email === query || user.phone === query);
}

module.exports = { createFile, createUser, updateUser, deleteUser, searchUser, defaultFileName };
