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

// photos pending validation only
controller.pending =  (req, res) =>	filterValidation(req, res, "pending")

// photos validated only
controller.validated =  (req, res) =>	filterValidation(req, res, "validated")

// photos rejected only
controller.rejected =  (req, res) =>	filterValidation(req, res, "rejected")

// select photos filtered by validation statuns (pending, rejected, validated)
function filterValidation(req, res, scopeString = "pending") {
	db.PhotoUpload.scope(scopeString)
		.findAll({include: [{all:true}]})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err));	
}

// fusion
controller.fusion =  async function(req, res) {
	const sourceid = req.params.sourceid;
	const destinationid = req.params.destinationid;
	sendJSON.serverError(res, "METHOD NOT YET IMPLEMENTED")
}

module.exports = controller


