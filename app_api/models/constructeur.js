/**
 * Constructeur model
 * @module /app_api/models/constructeur
 * @property {string}		nom
 */

module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("constructeur", {
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
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				if (this.id == 1) return "(aucun constructeur)"
				return [this.nom].filter(Boolean).join(', ')
			}
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
		indexes: [{type: 'FULLTEXT', name: 'text_search', fields: ['nom']}],
	
		hooks: {
				beforeValidate(instance, options) {
					if (instance.id == 1) throw new Error('NIL instance is READONLY')
				},
				beforeDestroy(instance, options) {
					if (instance.id == 1) throw new Error('NIL instance is READONLY')
				},
		},
  }
  
  )
  
	Model.metadata = {
		name: "Constructeur",
		hasForeignKeys: false,
		fieldNames: ['nom'],
	}
	
	return Model;
};
