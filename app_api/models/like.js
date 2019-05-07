/**
 * Like model
 * @module /app_api/models/like
 * @property {foreignKey}		photoId
 */
const debug = require('debug')('app:api:models:like');
const db = require('../models/db');
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("like", {
		
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				return `like ${this.id}`
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
			
	});
  
	Model.metadata = {
		name: "Like",
		hasForeignKeys: true,
		fieldNames: ['photoId'],
	}
	
	return Model;
};
