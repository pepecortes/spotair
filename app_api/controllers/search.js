const debug = require('debug')('app:api:search')
const helpers = require('../../app_lib/helpers')
const db = require('../models/db')
const sendJSON = helpers.sendJSON

var SearchController = {}

/**
 * @function fts (full text search)
 * @description Perform a full text search against the 'photoSearch'  table
 * @param {string} req.query.q	- query string to search for
 * @return {[Object]} All matched records
 */
SearchController.fts = function(req, res) {
	// example http://localhost:3000/api/search/fts?q=iberia
	var searchQuery = req.query.q
	var SQLquery = `SELECT * FROM photoSearch WHERE MATCH (text) AGAINST("${searchQuery}")`
	//debug(SQLquery)
	db.sequelize.query(SQLquery)
		.then(result => sendJSON.ok(res, result))
		.catch(err => sendJSON.serverError(res, err))
}

module.exports = SearchController




