/**
 * Galerie model
 * @module /app_api/models/galerie
 * @property {boolean}			isSpotAir 		
 * @property {string=}			commentaire 		
 * @property {virtual}			text					- (summary of all fields)
 * @property {foreignKey}		anneeId
 * @property {foreignKey}  	themeId
 * @property {foreignKey}		aerodromeId
 */
const debug = require('debug')('app:api:models:galerie');
const db = require('../models/db');
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("galerie", {
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},
			isSpotair: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
				
			},
			commentaire: {
				type: DataTypes.STRING,
				allowNull: true,		
				defaultValue: null,		
			},
			text: {
				type: DataTypes.VIRTUAL,
				include: {model: db.Theme},
				get: function() {
					// you need to check for null before using the values of the
					// associated Models because they will not be resolved under
					// certain circumstances (i.e. when using Model.update())
					var output = "";
					if (this.annee) output += ", " + this.annee.annee;
					if (this.theme) output += ", " + this.theme.theme;
					if (this.aerodrome) output += ", " + this.aerodrome.text;
					output += ", isSpotair: " + this.isSpotair;
					output += ", " + this.commentaire;
					return output;
				}
			},
		
			invalid: {
				type: DataTypes.VIRTUAL,
				get() {
					return {
						isspotair: 'Requis',
						commentaire: '',
						annee: "Requis",
						theme: "Requis",
						aerodrome: "Requis",
					}
				}
			},
		
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
		}, {
			
			indexes: [
				{type: 'FULLTEXT', name: 'text_search', fields: ['commentaire']}
			],
			
			scopes: {
				// returns only galeries "sorties associatives"
				isspotair: {
					where: {isSpotair: true}
				}
			},
			
		}
  );
	
	return Model;
};
