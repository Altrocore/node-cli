const fs = require('fs');

function createFile(fileName, content) {
    fs.writeFileSync(fileName, JSON.stringify(content, null, 2));
}

function readFile(fileName) {
    return JSON.parse(fs.readFileSync(fileName));
}

function updateFile(fileName, newUser) {
    const users = JSON.parse(fs.readFileSync(fileName));
    users.push(newUser);
    const updatedJson = JSON.stringify(users, null, 2);
    fs.writeFileSync(fileName, updatedJson);
}

module.exports = { createFile, readFile, updateFile };
