// MANAGE MYSQL DATABASE CONNECTION
const Sequelize = require('sequelize');
const debug = require('debug')('app:api:db');

module.exports = {};

/** create the connection to database */
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  operatorsAliases: false,
  define: {timestamp:true, engine: 'MyISAM', underscored:false},
  dialect: 'mysql'
});

/** try to connect to database */
sequelize
  .authenticate()
  .then(() => {
    debug('connected to database ' + process.env.DB_DATABASE);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync();

// Should I export sequelize? perphaps not: think about it
module.exports.sequelize = sequelize;

/** Bring in the models that are defined in each file */
module.exports.Aerodrome = sequelize.import('./aerodrome');

