to run cli u should go to the root foolder of the app and run command: node myapp

1. `generateToken()`: This function generates a random token and returns it as a string.

2. `createUser(users, username, role)`: This function takes an array of `users`, a string `username` and
 a string `role`, and adds a new user to the array. It returns the modified array of users.

3. `updateUser(users, username, newUsername)`: This function takes an array of `users`, a string `username`, 
and a string `newUsername`, and updates an existing user's username. If no user with the given `username` 
is found, it logs an error message and returns the original array of `users`. It returns the modified array of users.

4. `deleteUser(users, username)`: This function takes an array of `users` and a string `username`, 
and deletes an existing user. If no user with the given `username` is found, it logs an error message 
and returns the original array of `users`. It returns the modified array of users.

5. `searchUser(users, query)`: This function takes an array of `users` and a string `query`,
 and returns the first user that matches the query. If no user is found, it returns `null`.

6. `createFile(filename, data)`: This function takes a string `filename` and an object `data`, 
and creates a new file with the given name and writes the `data` to it.

7. `readFile(filename)`: This function takes a string `filename` and reads the contents of the 
file with the given name. It returns the contents as an object.

8. `updateFile(filename, data)`: This function takes a string `filename` and an object `data`, 
and updates the contents of the file with the given name to the `data`. If the file does not exist, 
it creates a new file with the given name and writes the `data` to it.

The file also creates a `readline` interface for CLI prompts to manage users. It logs events using a 
`logEvent()` function that takes an event message as input and writes it to an `event.log` file.
 It also creates an HTTP server that listens on port 8080 for generating tokens and serving a basic form.

When the program is run, the CLI prompts the user for a _users file name_. If a file with the given name 
already exists, it reads the contents of the file; otherwise it creates a new file. The menu for CRUD 
operations is displayed, and the user can choose an option to create, update, delete, search for a user, 
create a config file, or exit the program. The `config()` function creates a config file with the user's 
database connection details.

The HTTP server handles three routes: `/generate-token` returns a random token, `/` serves a basic 
login form, and `/submit-username` handles the submission of the login form.
