const bcrypt = require('bcrypt');
const debug = require('debug')('app:api:model:photographe');

// Generate a hash out of the given password
function generateHash(password) {
	const salt = bcrypt.genSaltSync(8)
	return bcrypt.hashSync(password, salt)
}

/**
 * User model
 * @module /app_api/models/user
 * @param {email}				mail
 * @param {tinyint}			group
 * @param {string}			passwordHash
 * @param {foreignKey}	photographeId
 * @param {virtual}			text					- (summary of all fields)
 */
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("user", {
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    
    // In general there is no need to define the foreign key for an
    // 'belongsTo' association. However, I need this one to be UNIQUE
    photographeId: {
			type: DataTypes.INTEGER,
			unique: true,
		},
    
    mail: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
      unique: true,
		},
		
		group: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
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
			get() {return this.mail}
		},
		
		isAdmin: {
			type: DataTypes.VIRTUAL,
			get() {return (this.group == 1)}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					mail: 'Adresse mail. Requis',
					photographe: 'Requis',
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
				{type: 'FULLTEXT', name: 'text_search', fields: ['mail']}
		]
  }

	)
  
	Model.metadata = {
		name: "User",
		hasForeignKeys: true,
		fieldNames: ['mail', 'group', 'passwordHash', 'photographeId'],
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
