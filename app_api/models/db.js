/** 
* Database management using Sequelize
* @module /app_api/models/db
*/
const Sequelize = require('sequelize');
const debug = require('debug')('app:api:db');

module.exports = {};

// create the connection to database as a Sequelize object
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  operatorsAliases: false,
  define: {timestamp:true, engine: 'InnoDB', underscored:false},
  dialect: 'mysql'
});

// try to connect to database */
//sequelize
  //.authenticate()
  //.then(() => {
    //debug('connected to database ' + process.env.DB_DATABASE);
  //})
  //.catch(err => {
    //console.error('Unable to connect to the database:', err);
  //});

// bring in the models that are defined in each file
const Aerodrome = sequelize.import('./aerodrome');
const Annee = sequelize.import('./annee');
const Galerie = sequelize.import('./galerie');
const Theme = sequelize.import('./theme');

// then, build all the relationships between Models
Annee.hasMany(Galerie, {onDelete: 'RESTRICT'});
Galerie.belongsTo(Annee);

Theme.hasMany(Galerie, {onDelete: 'RESTRICT'});
Galerie.belongsTo(Theme);

Aerodrome.hasMany(Galerie, {onDelete: 'RESTRICT'});
Galerie.belongsTo(Aerodrome);

// export sequelize object (a handler to the db) and the Models
module.exports.sequelize = sequelize;
module.exports.Aerodrome = Aerodrome;
module.exports.Annee = Annee;
module.exports.Galerie = Galerie;
module.exports.Theme = Theme;

// synchro with the mysql server
sequelize.sync(); 
