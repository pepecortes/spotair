/**
 * Galerie model
 * @module /app_api/models/galerie
 * @property {boolean}			isSpotAir 		
 * @property {string=}			commentaire 		
 * @property {virtual}			text					- (summary of all fields)
 * @property {foreignKey}		anneeId
 * @property {foreignKey}  	themeId
 * @property {foreignKey}		aerodromeId
 */
const debug = require('debug')('app:api:models:galerie');
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("galerie", {
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},
			isSpotair: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
				
			},
			commentaire: {
				type: DataTypes.STRING,
				allowNull: true,				
			},
			text: {
				type: DataTypes.VIRTUAL,
				get: function() {
					return this.annee.annee
					+ ", " + this.theme.theme
					+ ", " + this.aerodrome.text
					+ ", isSpotair: " + this.isSpotair
					+ ", " + this.commentaire
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
				{type: 'FULLTEXT', name: 'text_search', fields: ['commentaire']}
			],
			
			scopes: {
				// returns only galeries "sorties associatives"
				isspotair: {
					where: {isSpotair: true}
				}
			},
			
		}
  );
	
	return Model;
};
