/**
 * Galeries controller
 * @module /app_api/controllers/galeries
 */
const debug = require('debug')('app:api:controllers:galeries')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.Galerie)

// building other API calls...

// galeries "sorties associatives" only
controller.allSpotair =  function(req, res) {
	db.Galerie.scope('isspotair')
		.findAll({include: [{all:true}]})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err));
}

// fusion
/**
 * @function fusion
 * @description NOT YET IMPLEMENTED
 */
controller.fusion =  async function(req, res) {
	const sourceid = req.params.sourceid;
	const destinationid = req.params.destinationid;
	sendJSON.serverError(res, "METHOD NOT YET IMPLEMENTED")
}

module.exports = controller


