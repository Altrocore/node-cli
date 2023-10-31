const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');
const http = require('http');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to create new file
function createFile(fileName, content) {
    fs.writeFileSync(fileName, JSON.stringify(content, null, 2));
}

// Function to read file
function readFile(fileName) {
    return JSON.parse(fs.readFileSync(fileName));
}

// Function to generate token
function generateToken() {
    return crypto.createHash('sha256').update(Math.random().toString()).digest('hex');
}

// Function to log events
function logEvent(event) {
    fs.appendFileSync('event.log', `${new Date().toISOString()} - ${event}\n`);
}

// Function to create user
function createUser(users, username) {
    const token = generateToken();
    users.users.push({ username, token });
    return users;
}

// Function to update user
function updateUser(users, username, newUsername) {
    const user = users.users.find(user => user.username === username);
    if (user) {
        user.username = newUsername;
    }
    return users;
}

// Function to delete user
function deleteUser(users, username) {
    users.users = users.users.filter(user => user.username !== username);
    return users;
}

// Function to search for a user
function searchUser(users, query) {
    return users.users.find(user => user.username === query || user.email === query || user.phone === query);
}

// CLI prompts for CRUD operations
rl.question('Enter users file name: ', (usersFileName) => {
    let users = { users: [] };
    createFile(usersFileName, users);
    
    const menu = () => {
        console.log('\n1. Create user\n2. Update user\n3. Delete user\n4. Search for a user\n5. Exit');
        rl.question('Choose an option: ', (option) => {
            switch(option) {
                case '1':
                    rl.question('Enter username to create: ', (username) => {
                        users = createUser(users, username);
                        createFile(usersFileName, users);
                        menu();
                    });
                    break;
                case '2':
                    rl.question('Enter username to update: ', (username) => {
                        rl.question('Enter new username: ', (newUsername) => {
                            users = updateUser(users, username, newUsername);
                            createFile(usersFileName, users);
                            menu();
                        });
                    });
                    break;
                case '3':
                    rl.question('Enter username to delete: ', (username) => {
                        users = deleteUser(users, username);
                        createFile(usersFileName, users);
                        menu();
                    });
                    break;
                case '4':
                    rl.question('Enter query to search for a user: ', (query) => {
                        const user = searchUser(users, query);
                        console.log(user ? `User found: ${JSON.stringify(user)}` : 'User not found');
                        menu();
                    });
                    break;
                case '5':
                    rl.close();
                    break;
                default:
                    console.log('Invalid option');
                    menu();
            }
        });
    };
    
    menu();
});

// HTTP server to generate tokens and serve form
http.createServer((req, res) => {
    if (req.url === '/generate-token') {
        const token = generateToken();
        res.write(token);
        res.end();
    } else if (req.url === '/') {
        res.write('<form action="/submit-username" method="post"><input type="text" name="username" placeholder="Enter your username"><input type="submit" value="Submit"></form>');
        res.end();
    } else if (req.url === '/submit-username') {
        // handle form submission...
        res.end();
    } else {
        res.write('Invalid request');
        res.end();
    }
}).listen(8080);
