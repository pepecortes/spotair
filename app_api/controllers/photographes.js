/**
 * Photographes controller
 * @module /app_api/controllers/photographe
 */
const debug = require('debug')('app:api:controllers:photographe');
const db = require('../models/db');
const crud = require('./crudator');
const sendJSON = require('../../app_lib/helpers').sendJSON;
const dbReplaceReference = require('../../app_lib/helpers').dbReplaceReference;

const Model = db.Photographe;
const fieldsArray = ['nom', 'prenom', 'mail', 'isAdmin', 'passwordHash'];
const hasForeignKeys = false;

var exports = {};
const basicAPI = crud.buildBasicAPI(Model, fieldsArray, hasForeignKeys);
exports = Object.assign(exports, basicAPI);

// building other API calls...

// get user by login name
/**
 * @function byLogin
 * @description Returns the photographe that has the given username
 * @param {string} username
 * @return {Object} The given photographe, or null if not exists
 */
exports.byLogin =  async function(req, res) {
	const username = req.params.username
	Model.findOne({where: {mail: username}})
		.then(result => sendJSON.ok(res, result))
		.catch(err => sendJSON.serverError(res, err))
}

module.exports = exports;
