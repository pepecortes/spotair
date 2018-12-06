module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("aerodrome", {
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    nom: {
			type: DataTypes.STRING,
			allowNull: false,
		}, 
    lieu: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		latitude: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			defaultValue: null,
			validate: {min:-90, max:90}
		},
		longitude: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			defaultValue: null,
			validate: {min:-180, max:180}
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {return this.get('nom') + ", " + this.get('lieu')}
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
				{type: 'FULLTEXT', name: 'text_search', fields: ['nom', 'lieu']}
		],
		validate: {
			bothCoordsOrNone() {
				if ((this.latitude === null) !== (this.longitude === null)) {
					throw new Error('Require either both latitude and longitude or neither')
				}
			}
		}
  }
  );
	
	return Model;
};
