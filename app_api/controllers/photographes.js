/**
 * Photographes controller
 * @module /app_api/controllers/photographe
 */
const debug = require('debug')('app:api:controllers:photographes')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')
const dbReplaceReference = require('../../app_lib/helpers').dbReplaceReference

var controller = new ModelController(db.Photographe)

// building other API calls...

// fusion. Do not use the standard fusion, as a photographe is referred
// both in Photos and Users.
// replace the reference in photos and remove the user
controller.fusion = async function(req, res) {
	const sourceid = req.params.sourceid
	const destinationid = req.params.destinationid
	var promise1 = dbReplaceReference(db.Photo, db.Photographe, 'photographeId', sourceid, destinationid)
	var promise2 = db.User.destroy({where: {photographeId: sourceid}})
	Promise.all([promise1, promise2])
		.then(result => sendJSON.ok(res, result[0]))
		.catch(err => sendJSON.serverError(res, err))
}

module.exports = controller
