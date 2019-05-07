/**
 * Info model
 * @module /app_api/models/info
 * @property {string}	titre
 * @property {string}	info
 */

module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("info", {
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    titre: {
			type: DataTypes.STRING(32),
			allowNull: false,
			defaultValue: "",
		},
    info: {
			type: DataTypes.STRING(512),
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
			get: function() {return this.info}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					titre: 'Requis',
					info: 'Requis',
				}
			}
		},
    
  }, {
		indexes: [
				{type: 'FULLTEXT', name: 'text_search', fields: ['titre', 'info']}
		],
  });
  
	Model.metadata = {
		name: "Info",
		hasForeignKeys: false,
		fieldNames: ['titre', 'info'],
	}
	
	return Model;
};
