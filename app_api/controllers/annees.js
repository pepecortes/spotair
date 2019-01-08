/**
 * Annees controller
 * @module /app_api/controllers/annees
 */
const debug = require('debug')('app:api:controllers:annees');
const db = require('../models/db');
const crud = require('./crudator');
const sendJSON = require('../../app_lib/helpers').sendJSON;
const dbReplaceReference = require('../../app_lib/helpers').dbReplaceReference;

const Galerie = require('../models/db').Galerie;
const Model = db.Annee;
const fieldsArray = ['annee'];
const hasForeignKeys = false;

var exports = {};
const basicAPI = crud.buildBasicAPI(Model, fieldsArray, hasForeignKeys);
exports = Object.assign(exports, basicAPI);

// building other API calls...

// fusion
/**
 * @function fusion
 * @description delete the annee source: all galeries that
 * referred to the source now refer to the destination
 * @param {number} sourceid
 * @param {number} destinationid
 * @return {Object} {updated, removed}: 
 * number of deleted sources and number of modified galeries
 */
exports.fusion =  async function(req, res) {
	const sourceid = req.params.sourceid;
	const destinationid = req.params.destinationid;
	dbReplaceReference(Galerie, Model, "anneeId", sourceid, destinationid)
		.then(result => sendJSON.ok(res, result))
		.catch(err => sendJSON.serverError(res, err))
}

module.exports = exports;


