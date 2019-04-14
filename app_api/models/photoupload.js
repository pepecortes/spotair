/**
 * PhotoUpload model
 * @module /app_api/models/photoupload
 * @property {date=}				dateUpload
 * @property {foreignKey}		photographeId
 * @property {string=}		jsonData
 */
const debug = require('debug')('app:api:models:photoUpload');
const db = require('../models/db');
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("photoUpload", {
		
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
		},
		
		validated: {
			type: DataTypes.BOOLEAN,
			allowNull: null,
			defaultValue: null,
		},
		
    jsonData: {
			type: DataTypes.JSON,
			allowNull: true,
		}, 
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				const id = this.id
				const validated = (this.validated)? "V" : "X"
				const photographe = (this.photographe)? this.photographe.text : null
				const date = (this.dateUpload)? this.dateUpload : null
				return [id, validated, photographe, date].filter(Boolean).join(', ')
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
			
	},
	
	{
		scopes: {
			
			// returns different validation status...
			rejected: {
				where: {validated: false}
			},
			pending: {
				where: {validated: null}
			},		
			validated: {
				where: {validated: true}
			},
			
		},	
	}
	
  );
  
	Model.metadata = {
		name: "PhotoUpload",
		hasForeignKeys: true,
		fieldNames: ['validated', 'jsonData', 'photographeId', 'photoId'],
	}
	
	return Model;
};
