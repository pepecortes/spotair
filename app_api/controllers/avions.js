/**
 * Avions controller
 * @module /app_api/controllers/avions
 */
const debug = require('debug')('app:api:controllers:avions')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.Avion)

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


