/**
 * Appareils controller
 * @module /app_api/controllers/appareils
 */
const debug = require('debug')('app:api:controllers:appareils')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.Appareil)

// building other API calls...

// fusion
controller.fusion = ModelController.buildFusionController('appareilId', db.Appareil, db.Photo)

// filter by avion id
controller.byAvion = function(req, res) {
	const id = req.params.id;
	db.Appareil
		.findAll({where: {avionId: id}, include: [{all:true, nested:true}]})
		.then((record) => {
			if (record) sendJSON.ok(res, record);
			else sendJSON.notFound(res, "Not found");
		})
		.catch(err => sendJSON.serverError(res, err));
}

module.exports = controller


