/**
 * Aerodromes model
 * @module /app_api/models/aerodrome
 * @property {string}	nom 		
 * @property {string}	lieu 		
 * @property {number=}	latitude 	- {min:-90, max:90} can be null, but both (lat and long) or neither are required
 * @property {number=}	longitude	- {min:-180, max:180}
 * @property {virtual}	text		- "nom, lieu"
 */

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
			defaultValue: "",
		}, 
    lieu: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
		},
		latitude: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			defaultValue: null,
			validate: {min:-90, max:90},
			set(val) {
				// set to null if empty value
				val = ((val === "")? null : val)
				this.setDataValue('latitude', val)
			}
		},
		longitude: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			defaultValue: null,
			validate: {min:-180, max:180},
			set(val) {
				// set to null if empty value
				val = ((val === "")? null : val)
				this.setDataValue('longitude', val)
			}
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				if (this.id == 1) return "(sans localisation)"
				return (this.lieu == "")?  this.nom : `${this.lieu}, ${this.nom}`
			}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					nom: 'Requis',
					lieu: 'Requis',
					latitude: "Doit être entre -90 et +90. Doit être accompagné de longitude",
					longitude: "Doit être entre -180 et +180. Doit être accompagné de latitude",
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
				{type: 'FULLTEXT', name: 'text_search', fields: ['nom', 'lieu']}
		],
		
		validate: {			
			bothCoordsOrNone() {
				if ((this.latitude === null) !== (this.longitude === null)) {
					throw new Error('Require either both latitude and longitude or neither')
				}
			}
		},
		
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
		name: "Aerodrome",
		hasForeignKeys: false,
		fieldNames: ['nom', 'lieu', 'latitude', 'longitude'],
	}
	
	return Model;
};
