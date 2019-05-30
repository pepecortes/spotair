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
			get: function() {
				return (this.id == 1)? "(aucune année)" : this.annee
			}
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
		name: "Annee",
		hasForeignKeys: false,
		fieldNames: ['annee'],
	}
	
	return Model;
};
