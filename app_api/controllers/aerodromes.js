/**
 * Aerodromes controller
 * @module /app_api/controllers/aerodromes
 */
const debug = require('debug')('app:api:controllers:aerodromes');
const crud = require('./crudator');
const sendJSON = require('../../app_lib/helpers').sendJSON;
const checkSourceDestination = require('../../app_lib/helpers').checkSourceDestination;
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
	const sourceid = req.params.sourceid;
	const destinationid = req.params.destinationid;
	
	// Check first that the query makes sense: source and destination
	// must exist and be different
	try {
		error = await checkSourceDestination(Model, sourceid, destinationid)
		if (error.length > 0) {sendJSON.notFound(res, error); return}
	} catch(err) {
		sendJSON.serverError(res, err)
		return
	}
	
	sendJSON.ok(res, error);
	return
	
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
