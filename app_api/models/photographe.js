const bcrypt = require('bcrypt');
const debug = require('debug')('app:api:model:photographe');

// Generate a hash out of the given password
function generateHash(password) {
	const salt = bcrypt.genSaltSync(8)
	return bcrypt.hashSync(password, salt)
}

/**
 * Photographe / user model
 * @module /app_api/models/photographe
 * @param {string}		nom
 * @param {string}		prenom
 * @param {email}		mail
 * @param {boolean}	isAdmin
 * @param {string}		passwordHash
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
    mail: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
      unique: true,
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: generateHash(process.env.MEMBRES_DEFAULT_PASSWORD)
		},
		
		password: {
			type: DataTypes.VIRTUAL,
			set(val) {
				this.setDataValue('password', val)
				this.setDataValue('passwordHash', Model.generateHash(val))
			},	
			validate: {
				isLongEnough: val => {
					if (val.length < 8) throw new Error("Le mot de passe doit avoir plus de 8 charactères")
				}
			}
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
					email: 'Adresse mail. Requis',
					password: 'Minimum 8 charactères',
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
				{type: 'FULLTEXT', name: 'text_search', fields: ['nom', 'prenom', 'mail']}
		]
  }

	)
  
	Model.metadata = {
		name: "Photographe",
		hasForeignKeys: false,
		fieldNames: ['nom', 'prenom', 'mail', 'isAdmin', 'passwordHash'],
	}
	
	// Class function. Generate a hash out of the given password
	Model.generateHash = function(password) {
		const salt = bcrypt.genSaltSync(8)
		return bcrypt.hashSync(password, salt)
	}
	
	// Check it the given password is valid
	Model.prototype.validPassword = function(password) {
		return bcrypt.compareSync(password, this.passwordHash)
	}
	
	return Model;
};
