const bcrypt = require('bcrypt');

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
		
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null
		},
		
		password: {
			type: DataTypes.VIRTUAL,
			set: (val) => {
				this.setDataValue('password', val)
				this.setDataValue('password_hash', this.salt + val)
			},
			validate: {
				isLongEnough: (val) => {
					if (val.length < 2) throw new Error("Please choose a longer password")
				}
			}
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get() {return this.prenom + ", " + this.nom}
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
