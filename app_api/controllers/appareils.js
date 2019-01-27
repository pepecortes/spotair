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


