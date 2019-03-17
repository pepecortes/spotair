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
		
    jsonData: {
			type: DataTypes.JSON,
			allowNull: true,
		}, 
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				const id = this.id
				const photographe = (this.photographe)? this.photographe.text : null
				const date = (this.dateUpload)? this.dateUpload : null
				return [id, photographe, date].filter(Boolean).join(', ')
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
	
	{}
	
  );
  
	Model.metadata = {
		name: "PhotoUpload",
		hasForeignKeys: true,
		fieldNames: ['dateUpload', 'photographeId', 'jsonData'],
	}
	
	return Model;
};
