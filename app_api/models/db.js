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
  define: {
		charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamp:true, engine: 'InnoDB', 
    underscored:false
  },
  dialect: 'mysql',
  dialectOptions: {multipleStatements: true},
  logging: false,
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

const Aerodrome = require('./aerodrome')(sequelize, Sequelize)
const Annee = require('./annee')(sequelize, Sequelize)
const Galerie = require('./galerie')(sequelize, Sequelize)
const Theme = require('./theme')(sequelize, Sequelize)
const Photographe = require('./photographe')(sequelize, Sequelize)
const User = require('./user')(sequelize, Sequelize)
const Compagnie = require('./compagnie')(sequelize, Sequelize)
const Constructeur = require('./constructeur')(sequelize, Sequelize)
const Modele = require('./modele')(sequelize, Sequelize)
const Avion = require('./avion')(sequelize, Sequelize)
const Appareil = require('./appareil')(sequelize, Sequelize)
const Photo = require('./photo')(sequelize, Sequelize)
const PhotoUpload = require('./photoupload')(sequelize, Sequelize)
const Info = require('./info')(sequelize, Sequelize)
const Journal = require('./journal')(sequelize, Sequelize)
const Like = require('./like')(sequelize, Sequelize)
const LogMigration = require('./logMigration')(sequelize, Sequelize)

// then, build all the relationships between Models
Galerie.belongsTo(Annee, {onDelete: 'RESTRICT'})
Galerie.belongsTo(Theme, {onDelete: 'RESTRICT'})
Galerie.belongsTo(Aerodrome, {onDelete: 'RESTRICT'})
Modele.belongsTo(Constructeur, {onDelete: 'RESTRICT'})
Avion.belongsTo(Modele, {onDelete: 'RESTRICT'})
Appareil.belongsTo(Avion, {onDelete: 'RESTRICT'})
Photo.belongsTo(Photographe, {onDelete: 'RESTRICT'})
Photo.belongsTo(Compagnie, {onDelete: 'RESTRICT'})
Photo.belongsTo(Appareil, {onDelete: 'RESTRICT'})
Photo.belongsTo(Galerie, {onDelete: 'RESTRICT'})
User.belongsTo(Photographe, {onDelete: 'RESTRICT'})
PhotoUpload.belongsTo(Photographe, {onDelete: 'RESTRICT'})
PhotoUpload.belongsTo(Photo, {onDelete: 'RESTRICT'})
Like.belongsTo(Photo, {onDelete: 'CASCADE'})


createFTSIndex = function() {
	// Create MYSQL stored procedure CreateSearchTable generation (FULL TEXT SEARCH)
	// Create MYSQL schedule for launching it
	
	debug("Creating CreateSearchTable generation procedure & schedule")
	const SQLquery =`
		DROP PROCEDURE IF EXISTS CreateSearchTable;
		DROP EVENT IF EXISTS CreateSearchTableEvent;
		
		CREATE PROCEDURE CreateSearchTable()
		BEGIN
		DROP TABLE IF EXISTS photoSearchTemp;
		CREATE TABLE photoSearchTemp
		SELECT photos.id, CONCAT_WS(', ', photos.commentaire,	photographes.nom,
			photographes.prenom, compagnies.nom, compagnies.flotille,
			appareils.immat, appareils.serial, appareils.commentaire,
			avions.version,	modeles.nom, modeles.surnom,	constructeurs.nom,
			galeries.commentaire,	annees.annee,	themes.theme,	aerodromes.nom,
			aerodromes.lieu) AS text
		FROM photos
		LEFT JOIN photographes ON photos.photographeId = photographes.id
		LEFT JOIN compagnies ON photos.compagnieId = compagnies.id
		LEFT JOIN appareils ON photos.appareilId = appareils.id
		LEFT JOIN avions ON appareils.avionId = avions.id
		LEFT JOIN modeles ON avions.modeleId = modeles.id
		LEFT JOIN constructeurs ON modeles.constructeurId = constructeurs.id
		LEFT JOIN galeries ON photos.galerieId = galeries.id
		LEFT JOIN annees ON galeries.anneeId = annees.id
		LEFT JOIN themes ON galeries.themeId = themes.id
		LEFT JOIN aerodromes ON galeries.aerodromeId = aerodromes.id;
		CREATE FULLTEXT INDEX fts ON photoSearchTemp (text);
		DROP TABLE IF EXISTS photoSearch;
		RENAME TABLE photoSearchTemp TO photoSearch;
		END;
		
		CREATE EVENT CreateSearchTableEvent
		ON SCHEDULE EVERY 1 HOUR STARTS CURRENT_TIMESTAMP
		ON COMPLETION PRESERVE
		DO CALL CreateSearchTable;
	`;
	
	sequelize.query(SQLquery)
		.then(([results, metadata]) =>  debug("CreateSearchTable: " + JSON.stringify(results)))
		.catch(err => debug(err))
}


updateFTSindex = function() {
	// Force immediate update of the FULL TEXT SEARCH index
	debug("Force FTS index update")
	sequelize.query("CALL CreateSearchTable();")
		.then(results =>  debug("FTS index update completed"))
		.catch(err => debug(err))
}

// synchro with the mysql server
// disable or enable logs for dev
sequelize.sync({logging: false})

// Create FTS index generation and schedule
createFTSIndex()
	
// export sequelize object (a handler to the db) and the Models
module.exports.sequelize = sequelize
module.exports.Aerodrome = Aerodrome
module.exports.Annee = Annee
module.exports.Galerie = Galerie
module.exports.Theme = Theme
module.exports.Photographe = Photographe
module.exports.User = User
module.exports.Compagnie = Compagnie
module.exports.Constructeur = Constructeur
module.exports.Modele = Modele
module.exports.Avion = Avion
module.exports.Appareil = Appareil
module.exports.Photo = Photo
module.exports.PhotoUpload = PhotoUpload
module.exports.Info = Info
module.exports.Journal = Journal
module.exports.Like = Like
module.exports.LogMigration = LogMigration
module.exports.updateFTSindex = updateFTSindex
