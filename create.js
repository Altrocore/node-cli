const fs = require('fs');
const { searchUser } = require('./search');
const { defaultFileName } = require('./usersFunc');
let users = loadUsers();

function createUserMenu(rl) {
    rl.question('Enter username to create: ', (username) => {
        rl.question('Enter email: ', (email) => {
            rl.question('Enter phone: ', (phone) => {
                createUser(users, username, email, phone);
                saveUsers(users);
                console.log('User created successfully.');
                rl.close();
            });
        });
    });
}

function loadUsers() {
    if (fs.existsSync(defaultFileName)) {
        try {
            return JSON.parse(fs.readFileSync(defaultFileName, 'utf8'));
        } catch (error) {
            console.error('An error occurred:', error);
        }
    } else {
        // If users file doesn't exist, create an empty one
        const emptyUsers = { users: [] };
        saveUsers("31", emptyUsers);
        return emptyUsers;
    }
}

function saveUsers(users) {
    fs.writeFileSync(defaultFileName, JSON.stringify(users, null, 2));
}

function createUser(users, username, email, phone) {
    users.push({ username, email, phone });
}

module.exports = { createUserMenu };
