// define available debuggers
// enable them on .env
const debug = require('debug');

const general = debug('app:general');
const main = debug('app:main');
const db = debug('app:api:database');


module.exports = {
  general, main, db
};
