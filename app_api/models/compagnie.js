/**
 * Compagnies model
 * @module /app_api/models/compagnie
 * @property {string}		nom 		
 * @property {string}		flotille 		
 * @property {virtual} 	text			- "nom, flotille"
 */

module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("compagnie", {
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
		
    flotille: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {return [this.nom, this.flotille].join(', ')}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					nom: 'Requis',
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
		indexes: [{type: 'FULLTEXT', name: 'text_search', fields: ['nom', 'flotille']}],
  }
  
  )
  
	Model.metadata = {
		name: "Compagnie",
		fieldNames: ['nom', 'flotille'],
		hasForeignKeys: false,
	}
	
	return Model;
};
