const debug = require('debug')('app:api:search')
const helpers = require('../../app_lib/helpers')
const db = require('../models/db')
const sendJSON = helpers.sendJSON
const Stemmer = require('multilingual-stemmer').Stemmer
const Languages = require('multilingual-stemmer').Languages

const ModelController = require('./modelController')
const PhotoController = new ModelController(db.Photo)
const stem_en = new Stemmer(Languages.English)
const stem_fr = new Stemmer(Languages.French)

var SearchController = {}

/**
 * @function fts (full text search)
 * @description Perform a full text search against the 'photoSearch'  table
 * @param {string} req.query.q	- query string to search for
 * @return {[Object]} All matched records from the PHOTOS table
 * @example http://localhost:3000/api/search/fts?q=iberia meeting
 */
SearchController.fts = function(req, res) {
	search(req.query.q)
		.then(ids => PhotoController._findAll(ids, false, false))
		.then(result => sendJSON.ok(res, result))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function ftsIdsOnly
 * @description Like fts, return an array of photo ids only
 */
SearchController.ftsIdsOnly = function(req, res) {
	search(req.query.q)
		.then(result => sendJSON.ok(res, result))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function ftsPartial
 * @description Like fts, but limit the number of results
 * @param {String} req.query.q	- query string to search for
 * @param {Integer} req.params.limit	- record limit to return
 * @param {Integer} req.params.offset	- start on record number 'offset'
 * @return {[Object]} All matched photos
 */
SearchController.ftsPartial = function(req, res) {
	const limit = parseInt(req.params.limit)
	const offset = parseInt(req.params.offset)
	search(req.query.q)
		.then(ids => PhotoController._findAll(ids, limit, offset))
		.then(result => sendJSON.ok(res, result))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function search
 * @description Core search: performs a FTS on the photoSearch table
 * refer to: https://dev.mysql.com/doc/refman/5.5/en/fulltext-boolean.html
 * @return {Promise([Integer])} Array of matching ids
 */
async function search(queryString) {
	const sql = buildSQL(translateQueryString(queryString))
	const selectQuery = db.sequelize.QueryTypes.SELECT 
	return db.sequelize.query(sql, { type: selectQuery })
		.then(result => result.map(record => record.id))
} 

/**
 * @function queryTranslator
 * @description Translates a search query string into something
 * meaningful so send to the search engine. Uses a stemmer to extract
 * the stem of each word (both in English and in French)
 * Use AND (instead of OR) for multiple serch terms
 */
function translateQueryString(queryString) {
	
	debug("search query: " + queryString)
	
	const stem = (word => {
		const AndOrNot = isNegative(word)? '-' : '+'
		word = word.replace(/\+|\-|\"/g, '')
		if (word.length <= 3) return word
		const en = stem_en.stem(word)
		const fr = stem_fr.stem(word)
		return `${AndOrNot}(${en}* ${fr}*)`
	})

	const isNegative = (word => (word && word.charAt(0) == '-'))
	const isPositive = (word => !isNegative(word))

	const regexSanitize = /\*|\<|\>|\~|\)|\(/g // avoid certain characters in conflict with SQL FTS
	const regexQuotes = /("|\+"|\-")(.*?)"/g // capture expressions in double quotes (keep heading + and -)

	let termsArray = []
	const sanitizedString = queryString.trim().replace(regexSanitize, '')
	const quotedArray = sanitizedString.match(regexQuotes)
	const remainderArray = sanitizedString
		.replace(regexQuotes, '')
		.replace(/"/g, '')
		.trim()
		.split(/\s+/g)
	const stemmedArray = remainderArray.map(w => stem(w))
	termsArray = termsArray.concat(quotedArray, stemmedArray)
	const negativeTerms = termsArray.filter(isNegative)
	const positiveTerms = termsArray.filter(isPositive)
	const sortedTermsArray = positiveTerms.concat(negativeTerms)
	const output = sortedTermsArray.join(' ')
	debug("search query translated: " + output)
	
	return output
}

/**
 * @description Return a SQL ready to be sent as a raw query. Use
 * MySQL full text search in BOOLEAN MODE
 */
function buildSQL(expr) {
	return  `
		SELECT * FROM photoSearch
		WHERE MATCH (text) AGAINST('${expr}' IN BOOLEAN MODE)
	`;
}

module.exports = SearchController




