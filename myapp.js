const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');
const http = require('http');
const path = require('path');
const { generateToken, createUser, updateUser, deleteUser, searchUser } = require('./controllers/userManagement');
const { createFile, readFile, updateFile } = require('./controllers/fileOperations');
const { updateConfig, createConfig } = require('./controllers/configManagement');
const express = require('express');
const app = express();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to log events
function logEvent(event) {
    fs.appendFileSync('event.log', `${new Date().toISOString()} - ${event}\n`);
}
console.log('Server started on port 3000');
// CLI prompts for CRUD operations
let users = { users: [] };

rl.question('\nEnter users file name: ', (fileName) => {
    let isFile = fs.existsSync(fileName);
    if (isFile) {
        users = readFile(fileName);
        console.log(`File '${fileName}' already exists`);
        logEvent(`File '${fileName}' already exists`);
      } else {
        createFile(fileName, users);
        logEvent(`Created users file: ${fileName}`);
      }
    
    const menu = () => {
        console.log('\n1. Create user\n2. Update user\n3. Delete user\n4. Search for a user\n5. Create config file\n6. Update config file\n7. Exit');
        rl.question('Choose an option: ', (option) => {
            switch(option) {
                case '1':
                    console.log('Choose user role:\n 1. End user\n 2. Helpdesk employee\n 3. System administrator');
                    rl.question('Choose an option: ', (role) => {
                        let userRole;
                        switch(role) {
                            case '1':
                                userRole = 'End user';
                                break;
                            case '2':
                                userRole = 'Helpdesk employee';
                                break;
                            case '3':
                                userRole = 'System administrator';
                                break;
                        }
                        rl.question('Enter username to create: ', (username) => {
                            rl.question('Enter password to create: ', (password) => {
                                users = createUser(users, username, userRole, password);
                                logEvent(`Created user: ${username}`);
                                console.log(`Created user: ${username}`);
                                createFile(fileName, users);
                                menu();
                              });
                        });
                    })
                    break;
                case '2':
                    rl.question('Enter username to update: ', (username) => {
                        rl.question('Enter new username: ', (newUsername) => {
                            users = updateUser(users, username, newUsername);
                            console.log(`User updated: ${username + " ==> " + newUsername}`)
                            logEvent(`User updated: ${username + " ==> " + newUsername}`)
                            createFile(fileName, users);
                            menu();
                        });
                    });
                    break;
                case '3':
                    rl.question('Enter username to delete: ', (username) => {
                        users = deleteUser(users, username);
                        console.log(`User deleted ${username}`)
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
                    console.log('Create config file: ');
                    rl.question('Enter the database host: ', (host) => {
                        rl.question('Enter the database port: ', (port) => {
                            rl.question('Enter the database username: ', (username) => {
                                rl.question('Enter the database password: ', (password) => {
                                createConfig(host, port, username, password);
                                console.log('\nConfig file created successfully');
                                menu();
                                });
                            });
                        });
                    });
                    break;
                case '6':
                    console.log('Update config file:');
                    rl.question('Enter the updated database host (or leave blank to keep existing): ', (host) => {
                        rl.question('Enter the updated database port (or leave blank to keep existing): ', (port) => {
                            rl.question('Enter the updated database username (or leave blank to keep existing): ', (username) => {
                                rl.question('Enter the updated database password (or leave blank to keep existing): ', (password) => {
                                    const update = {};
                                    if (host) update['host'] = host;
                                    if (port) update['port'] = port;
                                    if (username) update['username'] = username;
                                    if (password) update['password'] = password;
                                    updateConfig(update);
                                    console.log('\nConfig file updated successfully');
                                    menu();
                                });
                            });
                        });
                    });
                    break;
                case '7':
                    console.log('\nProcess finished')
                    rl.close();
                    process.exit();
                default:
                    console.log('\nInvalid option');
                    menu();
            }
        });
    };

    menu();

});

// HTTP server to generate tokens and serve form
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.post('/login', (req, res) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { username, password } = parseFormData(body);
      if (isValidUser( username, password )) {
        // redirect user to dashboard
        res.redirect('/?message=login+information+is+correct');
        console.log('\nlogin information is correct')
      } else {
        // redirect user back to login with error message
        res.redirect('/?message=Invalid+username+or+password');
        console.log('\nlogin information is incorrect')
      }
    });
  });
  function parseFormData(formData) {
    const fields = formData.split('&');
    const data = {};
    for (let field of fields) {
      const [key, value] = field.split('=');
      data[key] = decodeURIComponent(value);
    }
    return data;
  }
  
  function isValidUser(username, password) {
    const user = users.users.find(user => user.username === username);
    return user && user.password === password;
  }
app.listen(3000, function() {
    
});
