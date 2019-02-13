/**
 * Photos controller
 * @module /app_api/controllers/photos
 */
const debug = require('debug')('app:api:controllers:photos')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.Photo)

// building other API calls...

// fusion
controller.fusion =  async function(req, res) {
	const sourceid = req.params.sourceid;
	const destinationid = req.params.destinationid;
	sendJSON.serverError(res, "METHOD NOT YET IMPLEMENTED")
}

// recent photos
controller.recent = async function(req, res) {
	db.Photo.findAll({
										limit: 50,
										order:[['dateValidation', 'DESC']],
										include: [{all:true, nested:true}]
										})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err))
}

module.exports = controller


