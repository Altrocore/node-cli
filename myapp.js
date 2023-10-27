const yargs = require('yargs');
const { init, create, update, remove, search } = require('./commands');

yargs
    .command('init', 'Initialize the HTTP server', () => {
        init();
    })
    .command('create', 'Create a user', (yargs) => {
        return yargs
            .option('username', {
                alias: 'u',
                describe: 'Username',
                demandOption: true,
                type: 'string',
            })
            .option('email', {
                alias: 'e',
                describe: 'Email',
                demandOption: true,
                type: 'string',
            })
            .option('phone', {
                alias: 'p',
                describe: 'Phone number',
                demandOption: true,
                type: 'string',
            })
            .option('file', {
                alias: 'f',
                describe: 'Users file name',
                demandOption: true,
                type: 'string',
            });
    }, (argv) => {
        create(argv.username, argv.email, argv.phone, argv.file);
    })
    .command('update', 'Update a user', (yargs) => {
        return yargs
            .option('username', {
                alias: 'u',
                describe: 'Username to update',
                demandOption: true,
                type: 'string',
            })
            .option('newUsername', {
                alias: 'n',
                describe: 'New username',
                demandOption: true,
                type: 'string',
            })
            .option('file', {
                alias: 'f',
                describe: 'Users file name',
                demandOption: true,
                type: 'string',
            });
    }, (argv) => {
        update(argv.username, argv.newUsername, argv.file);
    })
    .command('remove', 'Remove a user', (yargs) => {
        return yargs
            .option('username', {
                alias: 'u',
                describe: 'Username to remove',
                demandOption: true,
                type: 'string',
            })
            .option('file', {
                alias: 'f',
                describe: 'Users file name',
                demandOption: true,
                type: 'string',
            });
    }, (argv) => {
        remove(argv.username, argv.file);
    })
    .command('search', 'Search for a user', (yargs) => {
        return yargs
            .option('query', {
                alias: 'q',
                describe: 'Search query',
                demandOption: true,
                type: 'string',
            })
            .option('file', {
                alias: 'f',
                describe: 'Users file name',
                demandOption: true,
                type: 'string',
            });
    }, (argv) => {
        search(argv.query, argv.file);
    })
    .help().argv;
