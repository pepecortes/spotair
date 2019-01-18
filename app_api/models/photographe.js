const bcrypt = require('bcrypt');
const debug = require('debug')('app:api:model:photographe');

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
			defaultValue: null
		},
		
		password: {
			type: DataTypes.VIRTUAL,
			set(val) {
				this.setDataValue('password', val)
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(val, salt)
				this.setDataValue('passwordHash', hash)
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
	
	// Class function. Generate a hash out of the given password
	Model.generateHash = async function(password) {
		return await bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	}
	
	// Check it the given password is valid
	Model.prototype.validPassword = async function(password) {
		return await bcrypt.compareSync(password, this.passwordHash)
	}
	
	return Model;
};
