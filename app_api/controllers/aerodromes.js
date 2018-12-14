/**
 * Aerodromes controller
 * @module /app_api/controllers/aerodromes
 */
const debug = require('debug')('app:api:controllers:aerodromes');
const crud = require('./crudator');
const sendJSON = require('../../app_lib/helpers').sendJSON;
const Model = require('../models/db').Aerodrome;
const Galerie = require('../models/db').Galerie;

const fieldsArray = ['nom', 'lieu', 'latitude', 'longitude'];
const hasForeignKeys = false;

var exports = {};
const basicAPI = crud.buildBasicAPI(Model, fieldsArray, hasForeignKeys);
exports = Object.assign(exports, basicAPI);

// building other API calls...

// fusion of aerodromes
/**
 * @function fusion
 * @description delete the aerodrome source: all galeries that
 * referred to the source now refer to the destination
 * @param {number} sourceid 			- id of aerodrome source
 * @param {number} destinationid	- id of aerodrome destination
 * @return {Object} {galeries_updated, aerodromes_removed}: 
 * number of deleted sources and number of modified galeries
 */
exports.fusion =  async function(req, res) {
	const destinationid = req.params.destinationid;
	const sourceid = req.params.sourceid;
	
	// Check first that the query makes sense: source and destination
	// must exist and be different
	try {
		var error = [];
		var src, dest
		[src, dest] = await Promise.all([
			Model.findByPk(sourceid),
			Model.findByPk(destinationid)
		])
		if (sourceid == destinationid) error.push("source and destination are the same")
		if (!dest) error.push("destination id: " + destinationid + " not found")
		if (!src) error.push("source id: " + sourceid + " not found")
		if (error.length >= 1) {
			sendJSON.notFound(res, error.join(', '))
			return
		}
	} catch(err) {
		sendJSON.serverError(res, err)
		return
	}
	
	// Update galeries to the destination aerodrome and delete the source
	const output = {};
	Galerie.update({aerodromeId: destinationid},{where: {aerodromeId: sourceid}})
	.then(result => {
		output.galeries_updated = result[0];
		return Model.findByPk(sourceid);
	})
	.then(result => {
		result.destroy();
		output.aerodromes_removed = result.id;
		sendJSON.ok(res, output);
	})
	.catch(err => {if(err) sendJSON.serverError(res, err)});
}

module.exports = exports;
