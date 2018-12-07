/**
 * Theme model
 * @module /app_api/models/theme
 * @property {string}	theme
 */

module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("theme", {
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    theme: {
			type: DataTypes.STRING,
			allowNull: false,
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
  }, {
		indexes: [
				{type: 'FULLTEXT', name: 'text_search', fields: ['theme']}
		],
  }
  );
	
	return Model;
};
