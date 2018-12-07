/**
 * Aerodromes controller
 * @module /app_api/controllers/aerodrome
 */

const debug = require('debug')('app:api:controllers:aerodromes');
const HTTPStatus = require('http-status');
const db = require('../models/db');
const help = require('../../app_lib/helpers');
const Aerodrome = db.Aerodrome;

const sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.all = function(req, res) {
  Aerodrome
    .findAll()
    .then(record => sendJSONresponse(res, HTTPStatus.OK, record))
    .catch(err => sendJSONresponse(res, HTTPStatus.NOT_FOUND, err));
};

module.exports.byId = function(req, res) {
  Aerodrome
    .findById(req.params.id)
    .then(record => sendJSONresponse(res, HTTPStatus.OK, record))
    .catch(err => sendJSONresponse(res, HTTPStatus.NOT_FOUND, err));
};

/**
 * Create an aerodrome
 */
module.exports.create = function(req, res) {
	var newRecord = {
		nom: req.body.nom,
		lieu: req.body.lieu,
		latitude: req.body.latitude,
		longitude: req.body.longitude
	}
  Aerodrome
    .create(newRecord)
    .then(record => sendJSONresponse(res, HTTPStatus.OK, record))
		.catch(err => sendJSONresponse(res, HTTPStatus.NOT_FOUND, err));
};

/**
 * Update a single aerodrome
 * Input: the record to update, which containes the ID
 */
module.exports.update = function(req, res) {
	const id = req.params.id;
	var updatedRecord = help.pickObject(req.body, ['nom', 'lieu', 'latitude', 'longitude']);
  Aerodrome
    .update(updatedRecord, {where: {id: id}})
    .then(() => Aerodrome.findById(id))
    .then(record => sendJSONresponse(res, HTTPStatus.OK, record))
		.catch(err => sendJSONresponse(res, HTTPStatus.NOT_FOUND, err));
};


