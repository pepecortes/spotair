const debug = require('debug')('app:api:search')
const helpers = require('../../app_lib/helpers')
const db = require('../models/db')
const sendJSON = helpers.sendJSON
const Stemmer = require('multilingual-stemmer').Stemmer
const Languages = require('multilingual-stemmer').Languages

var SearchController = {}

const stem_en = new Stemmer(Languages.English)
const stem_fr = new Stemmer(Languages.French)

/**
 * @function fts (full text search)
 * @description Perform a full text search against the 'photoSearch'  table
 * @param {string} req.query.q	- query string to search for
 * @return {[Object]} All matched records
 */
SearchController.fts = function(req, res) {
	// example http://localhost:3000/api/search/fts?q=iberia-meeting
	translateQueryString(req.query.q)
		.then(search_expression => buildSQL(search_expression))
		.then(sql => db.sequelize.query(sql))
		.then(result => sendJSON.ok(res, result))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function queryTranslator
 * @description Translates a search query string into something
 * meaningful so send to the search engine. Uses a stemmer to extract
 * the stem of each word (both in English and in French)
 * Use AND (instead of OR) for multiple serch terms
 */
async function translateQueryString(queryString) {
	
	const stem = (word => {
		const en = stem_en.stem(word)
		const fr = stem_fr.stem(word)
		return `+${en}* +${fr}*`
	})
	
	return queryString.split(' ').map(w => stem(w)).join(' ')
}

/**
 * @description Return a SQL ready to be sent as a raw query. Use
 * MySQL full text search in BOOLEAN MODE
 */
function buildSQL(expr) {
	return  `
		SELECT * FROM photoSearch
		WHERE MATCH (text) AGAINST("${expr}" IN BOOLEAN MODE)
	`;
}

module.exports = SearchController



