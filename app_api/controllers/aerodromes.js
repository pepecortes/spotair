/**
 * Aerodromes controller
 * @module /app_api/controllers/aerodromes
 */
const debug = require('debug')('app:api:controllers:aerodromes');
const crud = require('./crudator');
const sendJSON = require('../../app_lib/helpers').sendJSON;
const dbReplaceReference = require('../../app_lib/helpers').dbReplaceReference;
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
	dbReplaceReference(Galerie, Model, "aerodromeId", sourceid, destinationid)
		.then(result => sendJSON.ok(res, result))
		.catch(err => sendJSON.serverError(res, err))
}

module.exports = exports;
