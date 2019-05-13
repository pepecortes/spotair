/**
 * LogMigration model
 * @module /app_api/models/logMigration
 * @property {string}	url
 */

module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("logMigration", {
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    idOrigin: {
			type: DataTypes.INTEGER,
			allowNull: false,
      unique: true,
		},
		log: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: "",
		},		
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false,
    },
    
  });
  
	Model.metadata = {
		name: "LogMigration",
		hasForeignKeys: false,
		fieldNames: ['idOrigin', 'log'],
	}
	
	return Model;
};
