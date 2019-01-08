/**
 * Galeries controller
 * @module /app_api/controllers/galeries
 */
const debug = require('debug')('app:api:controllers:galeries');
const db = require('../models/db');
const crud = require('./crudator');
const sendJSON = require('../../app_lib/helpers').sendJSON;
const dbReplaceReference = require('../../app_lib/helpers').dbReplaceReference;

const Model = db.Galerie;
const fieldsArray = ['isSpotair', 'commentaire', 'anneeId', 'themeId', 'aerodromeId'];
const hasForeignKeys = true;

var exports = {};

// building the basic CRUD API calls first
const basicAPI = crud.buildBasicAPI(Model, fieldsArray, hasForeignKeys);
exports = Object.assign(exports, basicAPI);

// building other API calls...

// galeries "sorties associatives" only
exports.allSpotair =  function(req, res) {
	Model.scope('isspotair')
		.findAll({include: [{all:true}]})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err));
}

// fusion
/**
 * @function fusion
 * @description NOT YET IMPLEMENTED
 * @param {number} sourceid
 * @param {number} destinationid
 * @return {Object} {updated, removed}: 
 * number of deleted sources and number of modified galeries
 */
exports.fusion =  async function(req, res) {
	const sourceid = req.params.sourceid;
	const destinationid = req.params.destinationid;
	sendJSON.serverError(res, "METHOD NOT YET IMPLEMENTED")
	//dbReplaceReference(Galerie, Model, "anneeId", sourceid, destinationid)
		//.then(result => sendJSON.ok(res, result))
		//.catch(err => sendJSON.serverError(res, err))
}

module.exports = exports;


