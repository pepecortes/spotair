/**
 * Photo Uploads controller
 * @module /app_api/controllers/photouploads
 */
const debug = require('debug')('app:api:controllers:photouploads')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.PhotoUpload)

// building other API calls...

// fusion
controller.fusion =  async function(req, res) {
	const sourceid = req.params.sourceid;
	const destinationid = req.params.destinationid;
	sendJSON.serverError(res, "METHOD NOT YET IMPLEMENTED")
}

module.exports = controller


