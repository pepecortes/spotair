/**
 * Photo model
 * @module /app_api/models/photo
 * @property {date=}				dateUpload
 * @property {string=}			messageUpload
 * @property {boolean}			validation
 * @property {date=}				dateValidation
 * @property {string=}			commentaire	
 * @property {virtual}			text					- (summary of all fields)
 * @property {foreignKey}		photographeId
 * @property {foreignKey}		compagnieId
 * @property {foreignKey}		aerodromeId
 * @property {foreignKey}		appareilId
 * @property {foreignKey}		galerieId
 */
const debug = require('debug')('app:api:models:photo');
const db = require('../models/db');
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("photo", {
		
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
		},
		
		dateUpload: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		},
		
		messageUpload: {
			type: DataTypes.STRING,
			allowNull: true,		
			defaultValue: null,		
		},
		
		validation: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		
		dateValidation: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		},
		
		commentaire: {
			type: DataTypes.STRING,
			allowNull: true,		
			defaultValue: null,		
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				const validation = (this.validation)? "publiée" : null
				const photographe = (this.photographe)? this.photographe.text : null
				const compagnie = (this.compagnie)? this.compagnie.text : null
				const aerodrome = (this.aerodrome)? this.aerodrome.text : null
				const appareil = (this.appareil)? this.appareil.text : null
				const galerie = (this.galerie)? this.galerie.text : null
				return [
					validation,
					photographe, compagnie, aerodrome, appareil, galerie,
					commentaire
				].filter(Boolean).join(', ')
			}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					validation: '',
					photographe: 'Requis',
					compagnie: 'Requis',
					aerodrome: 'Requis',
					appareil: 'Requis',
					galerie: 'Requis',
					commentaire: '',
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
			
		}
  );
  
	Model.metadata = {
		name: "Photo",
		hasForeignKeys: true,
		fieldNames: ['dateUpload', 'messageUpload', 'validation', 'dateValidation',
		 'commentaire', 'photographeId', 'compagnieId', 'aerodromeId',
		 'appareilId', 'galerieId'],
	}
	
	return Model;
};
