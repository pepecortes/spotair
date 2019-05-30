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
				type: DataTypes.STRING(4096),
				allowNull: true,		
				defaultValue: null,		
			},
			
			text: {
				type: DataTypes.VIRTUAL,
				get: function() {
					if (this.id == 1) return "(aucune galerie)"
					// you need to check for null before using the values of the
					// associated Models because they will not be resolved under
					// certain circumstances (i.e. when using requesting a fresh model)
					const annee = (this.annee)? this.annee.text : null
					const theme = (this.theme)? this.theme.text : null
					return [theme, annee].filter(Boolean).join(', ')
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
		
			hooks: {
					beforeValidate(instance, options) {
						if (instance.id == 1) throw new Error('NIL instance is READONLY')
					},
					beforeDestroy(instance, options) {
						if (instance.id == 1) throw new Error('NIL instance is READONLY')
					},
			},
			
		}
  );
  
	Model.metadata = {
		name: "Galerie",
		hasForeignKeys: true,
		fieldNames: ['isSpotair', 'commentaire', 'anneeId', 'themeId', 'aerodromeId'],
	}
	
	return Model;
};
