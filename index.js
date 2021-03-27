const scrapper = require('./controller');
const account = require('./config.json');

scrapper.controller(account.email, account.password);