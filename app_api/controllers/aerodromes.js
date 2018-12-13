/**
 * Aerodromes controller
 * @module /app_api/controllers/aerodromes
 */
const debug = require('debug')('app:api:controllers:aerodromes');
const db = require('../models/db');
const crud = require('./crudator');
const sendJSON = require('../../app_lib/helpers').sendJSON;

const Model = db.Aerodrome;
const Galerie = db.Galerie;
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
 * @return the number of sources that have been deleted (fusioned)
 */
exports.fusion =  function(req, res) {
	const destinationid = req.params.destinationid;
	const sourceid = req.params.sourceid;
	const output = {};
	Model
		.findByPk(destinationid)
		.then((record) => {
			if (!record) {
				sendJSON.notFound(res, "destination id: " + destinationid + " not found");
				return Promise.reject();
			}
			else return Galerie.update(
				{aerodromeId: destinationid},
				{where: {aerodromeId: sourceid}}
			)
		})
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
