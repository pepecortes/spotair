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
const Aerodrome = sequelize.import('./aerodrome')
const Annee = sequelize.import('./annee')
const Galerie = sequelize.import('./galerie')
const Theme = sequelize.import('./theme')
const Photographe = sequelize.import('./photographe')
const Compagnie = sequelize.import('./compagnie')
const Constructeur = sequelize.import('./constructeur')
const Modele = sequelize.import('./modele')
const Avion = sequelize.import('./avion')

// then, build all the relationships between Models
Galerie.belongsTo(Annee, {onDelete: 'RESTRICT'})
Galerie.belongsTo(Theme, {onDelete: 'RESTRICT'})
Galerie.belongsTo(Aerodrome, {onDelete: 'RESTRICT'})
Modele.belongsTo(Constructeur, {onDelete: 'RESTRICT'})
Avion.belongsTo(Modele, {onDelete: 'RESTRICT'})

// export sequelize object (a handler to the db) and the Models
module.exports.sequelize = sequelize
module.exports.Aerodrome = Aerodrome
module.exports.Annee = Annee
module.exports.Galerie = Galerie
module.exports.Theme = Theme
module.exports.Photographe = Photographe
module.exports.Compagnie = Compagnie
module.exports.Constructeur = Constructeur
module.exports.Modele = Modele
module.exports.Avion = Avion

// synchro with the mysql server
// disable or enable logs for dev
sequelize.sync({logging: false})
