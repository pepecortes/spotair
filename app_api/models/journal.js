/**
 * Journal model
 * @module /app_api/models/journal
 * @property {string}	url
 */

module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("journal", {
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    url: {
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
			get: function() {return this.url}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					url: 'URL. Requis',
				}
			}
		},
    
  }, {
		indexes: [
				{type: 'FULLTEXT', name: 'text_search', fields: ['url']}
		],
  });
  
	Model.metadata = {
		name: "Journal",
		hasForeignKeys: false,
		fieldNames: ['url'],
	}
	
	return Model;
};
