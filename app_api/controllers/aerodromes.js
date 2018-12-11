/**
 * Aerodromes controller
 * @module /app_api/controllers/aerodromes
 */
const debug = require('debug')('app:api:controllers:aerodromes');
const db = require('../models/db');
const crud = require('./crudator');
const sendJSON = require('../../app_lib/helpers').sendJSON;

const Model = db.Aerodrome;
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
 */
exports.fusion =  function(req, res) {
	debug("HERE I AM");
	sendJSON.ok(res, "NOT YET IMPLEMENTED");
	//Model
		//.findAll({include: [{all:true}]})
		//.then(record => sendJSON.ok(res, record))
		//.catch(err => sendJSON.serverError(res, err));
}

//function aerodromeFusion($post, $files) {
	///**
	 //* Fusion of the origin and destination aerodromes
	 //* @param 'idOrigin'
	 //* @param 'idDestination'
	 //*/
	//$idOrigin = $post['idOrigin'];
	//$idDestination = $post['idDestination'];	
	//$fusion = fusionAerodromes($idOrigin, $idDestination);
	//if (!$fusion) return ['output' => "", 'error' => CONTACT_ADMIN_MSG];
	//return ['output' => selectAerodrome($idDestination), 'error' => ""];
//}

module.exports = exports;
