const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');
const http = require('http');
const path = require('path');
const { generateToken, createUser, updateUser, deleteUser, searchUser } = require('./userManagement');
const { createFile, readFile, updateFile } = require('./fileOperations');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to log events
function logEvent(event) {
    fs.appendFileSync('event.log', `${new Date().toISOString()} - ${event}\n`);
}

// CLI prompts for CRUD operations
rl.question('Enter users file name: ', (fileName) => {
    let users;
    let isFile = fs.existsSync(`${fileName}.json`);
    if (isFile) {
        users = readFile(`${fileName}.json`);
        console.log(`File '${fileName}' already exists`);
        logEvent(`File '${fileName}' already exists`);
      } else {
        let users = users = { users: [] };
        createFile(fileName, users);
        logEvent(`Created users file: ${fileName}`);
      }
    
    const menu = () => {
        console.log('\n1. Create user\n2. Update user\n3. Delete user\n4. Search for a user\n5. Exit');
        rl.question('Choose an option: ', (option) => {
            switch(option) {
                case '1':
                    rl.question('Enter username to create: ', (username) => {
                        users = createUser(users, username);
                        logEvent(`Created user: ${username}`);
                        if (isFile) {
                            updateFile
                        }
                        createFile(fileName, users);
                        menu();
                    });
                    break;
                case '2':
                    rl.question('Enter username to update: ', (username) => {
                        rl.question('Enter new username: ', (newUsername) => {
                            users = updateUser(users, username, newUsername);
                            logEvent(`User updated: ${username + "==>" + newUsername}`)
                            createFile(fileName, users);
                            menu();
                        });
                    });
                    break;
                case '3':
                    rl.question('Enter username to delete: ', (username) => {
                        users = deleteUser(users, username);
                        logEvent(`User deleted ${username}`)
                        createFile(fileName, users);
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
                    process.exit(0);
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
