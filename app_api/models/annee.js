/**
 * Annee model
 * @module /app_api/models/annee
 * @property {string}	annee
 */

module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("annee", {
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    annee: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
		},
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {return this.annee}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					annee: 'Requis'
				}
			}
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
				{type: 'FULLTEXT', name: 'text_search', fields: ['annee']}
		],
  }
  );
	
	return Model;
};
