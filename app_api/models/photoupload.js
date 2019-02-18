/**
 * PhotoUpload model
 * @module /app_api/models/photoupload
 * @property {date=}				dateUpload
 * @property {string=}			message
 * @property {string=}			commentaire	
 * @property {virtual}			text					- (summary of all fields)
 * @property {foreignKey}		photographeId
 * @property {foreignKey}		compagnieId
 * @property {foreignKey}		appareilId
 * @property {foreignKey}		galerieId
 */
const debug = require('debug')('app:api:models:photoUpload');
const db = require('../models/db');
module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("photoUpload", {
		
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
		},
		
		dateUpload: {
			type: DataTypes.DATE,
			allowNull: true,
			set(val) {
				try {this.setDataValue('dateUpload', val)}
				catch (e) {this.setDataValue('dateUpload', null)}
			},
		},
		
		message: {
			type: DataTypes.STRING,
			allowNull: true,		
			defaultValue: null,		
		},
		
		commentaire: {
			type: DataTypes.STRING,
			allowNull: true,		
			defaultValue: null,		
		},
		
		text: {
			type: DataTypes.VIRTUAL,
			get: function() {
				return "NOT COMPLETED"
				//const validation = (this.validation)? "publiée" : null
				//const photographe = (this.photographe)? this.photographe.text : null
				//const compagnie = (this.compagnie)? this.compagnie.text : null
				//const appareil = (this.appareil)? this.appareil.text : null
				//const galerie = (this.galerie)? this.galerie.text : null
				//return [
					//validation,
					//photographe, compagnie, appareil, galerie,
					//this.commentaire
				//].filter(Boolean).join(', ')
			}
		},
		
		//invalid: {
			//type: DataTypes.VIRTUAL,
			//get() {
				//return {
					//validation: '',
					//photographe: 'Requis',
					//compagnie: 'Requis',
					//appareil: 'Requis',
					//galerie: 'Requis',
					//commentaire: '',
				//}
			//}
		//},
		
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
		

			
		indexes: [
			{type: 'FULLTEXT', name: 'text_search', fields: ['commentaire', 'message']}
		],
			
		}
  );
  
	Model.metadata = {
		name: "PhotoUpload",
		hasForeignKeys: true,
		fieldNames: [
									'dateUpload', 'message', 'commentaire',
									'photographeId', 'compagnieId', 'appareilId',
									'galerieId'
								],
	}
	
	return Model;
};
