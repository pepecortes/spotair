/**
 * Modele model
 * @module /app_api/models/modele
 * @property {string}				nom	
 * @property {string=}			surnom 		
 * @property {virtual}			text					- (summary of all fields)
 * @property {foreignKey}		constructeurId
 */
const debug = require('debug')('app:api:models:modele');
const db = require('../models/db');
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("modele", {
		
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
		
		surnom: {
			type: DataTypes.STRING,
			allowNull: true,		
			defaultValue: null,		
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				const constructeur = (this.constructeur)? this.constructeur.text : null
				return [constructeur, this.nom, this.surnom].filter(Boolean).join(', ')
			}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					nom: 'Requis',
					surnom: "",
					constructeur: "Requis",
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
			{type: 'FULLTEXT', name: 'text_search', fields: ['nom', 'surnom']}
		],
			
		}
  );
  
	Model.metadata = {
		name: "Modele",
		hasForeignKeys: true,
		fieldNames: ['nom', 'surnom', 'constructeurId'],
	}
	
	return Model;
};
