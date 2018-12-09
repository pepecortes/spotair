/**
 * Galerie model
 * @module /app_api/models/galerie
 * @property {string} DOC IN PROGRESS
 */

module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("galerie", {
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},
			isSpotAir: {
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
				get: function() {return this.annee.annee
					+ ", " + this.theme.theme
					+ ", " + this.aerodrome.text
					+ ", isSpotair: " + this.isSpotAir
					+ ", " + this.commentaire}
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
		}
  );
	
	return Model;
};
