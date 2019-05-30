/**
 * Avion model
 * @module /app_api/models/avion
 * @property {string}				nom		
 * @property {virtual}			text					- (summary of all fields)
 * @property {foreignKey}		modeleId
 */
const debug = require('debug')('app:api:models:avion');
const db = require('../models/db');
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("avion", {
		
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
		},
			
		version: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				if (this.id == 1) return "(aucun avion)"
				const modele = (this.modele)? this.modele.text : null
				return [modele, this.version].filter(Boolean).join('-')
			}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					version: 'Requis',
					modele: "Requis",
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
			{type: 'FULLTEXT', name: 'text_search', fields: ['version']}
		],
	
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
		name: "Avion",
		hasForeignKeys: true,
		fieldNames: ['version', 'modeleId'],
	}
	
	return Model;
};
