const debug = require('debug')('app:api:model:photographe');

/**
 * Photographe / user model
 * @module /app_api/models/photographe
 * @param {string}		nom
 * @param {string}		prenom
 * @param {virtual}			text					- (summary of all fields)
 */
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("photographe", {
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    
    nom: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
		},
		 
    prenom: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get() {return this.prenom + " " + this.nom}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					nom: 'Requis',
					prenom: 'Requis',
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
  },
  
  {
		indexes: [
				{type: 'FULLTEXT', name: 'text_search', fields: ['nom', 'prenom']}
		]
  }

	)
  
	Model.metadata = {
		name: "Photographe",
		hasForeignKeys: false,
		fieldNames: ['nom', 'prenom'],
	}
	
	return Model;
};
