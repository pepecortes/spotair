/**
 * Photo model
 * @module /app_api/models/photo
 * @property {integer}			width
 * @property {integer}			height
 * @property {date=}				dateUpload
 * @property {string=}			messageUpload
 * @property {boolean}			validation
 * @property {date=}				dateValidation
 * @property {string=}			commentaire	
 * @property {virtual}			text					- (summary of all fields)
 * @property {foreignKey}		photographeId
 * @property {foreignKey}		compagnieId
 * @property {foreignKey}		appareilId
 * @property {foreignKey}		galerieId
 */
const debug = require('debug')('app:api:models:photo');
const db = require('../models/db');
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("photo", {
		
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
		},
		
		width: {
				type: DataTypes.SMALLINT,
				allowNull: false,
				defaultValue: 200,
		},
		
		height: {
				type: DataTypes.SMALLINT,
				allowNull: false,
				defaultValue: 200,
		},
		
		dateUpload: {
			type: DataTypes.DATE,
			allowNull: true,
			set(val) {
				try {this.setDataValue('dateUpload', val)}
				catch (e) {this.setDataValue('dateUpload', null)}
			},
		},
		
		views: {
			// how many times this photo has been seen?
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		
		commentaire: {
			type: DataTypes.STRING(256),
			allowNull: true,		
			defaultValue: null,		
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				const photographe = (this.photographe)? this.photographe.text : null
				const compagnie = (this.compagnie)? this.compagnie.text : null
				const appareil = (this.appareil)? this.appareil.text : null
				const galerie = (this.galerie)? this.galerie.text : null
				return [
					photographe, compagnie, appareil, galerie,
					this.commentaire
				].filter(Boolean).join(', ')
			}
		},
		
		caption: {
			type: DataTypes.VIRTUAL,
			get: function() {
				const photographe = this.photographe.text
				const aerodrome = this.galerie.aerodrome.text
				const avion = this.appareil.avion.text
				return `Photo : ${photographe} - Spotair.org, réalisée à ${aerodrome}, ${avion}`
			}
		},
		
		invalid: {
			type: DataTypes.VIRTUAL,
			get() {
				return {
					photographe: 'Requis',
					compagnie: 'Requis',
					appareil: 'Requis',
					galerie: 'Requis',
					commentaire: '',
				}
			}
		},
		
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		},
		
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		},
			
	}, {
		
		getterMethods: {
				viewYear: function() {
					// TO BE COMPLETED return the number of views per year 
					return this.getDataValue('views') / 2
				},
		},
		
		setterMethods: {
				addView: function() {
					// increment the view count of this photo
					this.setDataValue('views', this.getDataValue('views') + 1)
				}
		},
			
		indexes: [
			{type: 'FULLTEXT', name: 'text_search', fields: ['commentaire']}
		],
			
		}
  );
  
	Model.metadata = {
		name: "Photo",
		hasForeignKeys: true,
		fieldNames: [
									'width', 'height', 'dateUpload', 'views',
									'dateValidation', 'commentaire', 'photographeId',
									'compagnieId', 'appareilId', 'galerieId'
								],
	}
	
	return Model;
};
