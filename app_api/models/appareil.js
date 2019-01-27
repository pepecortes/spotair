/**
 * Appareil model
 * @module /app_api/models/appareil
 * @property {string}				immat	
 * @property {string=}			serial
 * @property {string=}			commentaire	
 * @property {virtual}			text					- (summary of all fields)
 * @property {foreignKey}		avionId
 */
const debug = require('debug')('app:api:models:appareil');
const db = require('../models/db');
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("appareil", {
		
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
		},
			
		immat: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		
		serial: {
			type: DataTypes.STRING,
			allowNull: true,		
			defaultValue: null,		
		},
		
		commentaire: {
			type: DataTypes.STRING,
			allowNull: true,		
			defaultValue: null,		
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				const avion = (this.avion)? this.avion.text : null
				return [avion, this.immat, this.serial, this.commentaire].filter(Boolean).join(', ')
			}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					immat: '',
					serial: '',
					commentaire: '',
					avion: "Requis",
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
			{type: 'FULLTEXT', name: 'text_search', fields: ['immat', 'serial', 'commentaire']}
		],
			
		}
  );
  
	Model.metadata = {
		name: "Appareil",
		hasForeignKeys: true,
		fieldNames: ['immat', 'serial', 'commentaire', 'avionId'],
	}
	
	return Model;
};
