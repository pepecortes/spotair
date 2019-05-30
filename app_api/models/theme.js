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
    
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				return (this.id == 1)? "(aucun thème)" : this.theme
			}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					theme: 'Requis',
				}
			}
		},
    
  }, {
		indexes: [
				{type: 'FULLTEXT', name: 'text_search', fields: ['theme']}
		],
		
		hooks: {
				beforeValidate(instance, options) {
					if (instance.id == 1) throw new Error('NIL instance is READONLY')
				},
				beforeDestroy(instance, options) {
					if (instance.id == 1) throw new Error('NIL instance is READONLY')
				},
		},
		
  });
  
	Model.metadata = {
		name: "Theme",
		hasForeignKeys: false,
		fieldNames: ['theme'],
	}
	
	return Model;
};
