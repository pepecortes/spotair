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
  define: {timestamp:true, engine: 'InnoDB', underscored:false},
  dialect: 'mysql'
});

/** try to connect to database */
//sequelize
  //.authenticate()
  //.then(() => {
    //debug('connected to database ' + process.env.DB_DATABASE);
  //})
  //.catch(err => {
    //console.error('Unable to connect to the database:', err);
  //});

// Should I export sequelize? perphaps not: think about it
//module.exports.sequelize = sequelize;

/** Bring in the models that are defined in each file */
const Aerodrome = sequelize.import('./aerodrome');
const Annee = sequelize.import('./annee');
const Galerie = sequelize.import('./galerie');
const Theme = sequelize.import('./theme');

Annee.hasMany(Galerie, {onDelete: 'RESTRICT'});
Galerie.belongsTo(Annee);

Theme.hasMany(Galerie, {onDelete: 'RESTRICT'});
Galerie.belongsTo(Theme);

Aerodrome.hasMany(Galerie, {onDelete: 'RESTRICT'});
Galerie.belongsTo(Aerodrome);

module.exports.Aerodrome = Aerodrome;
module.exports.Annee = Annee;
module.exports.Galerie = Galerie;
module.exports.Theme = Theme;

sequelize.sync(); 
