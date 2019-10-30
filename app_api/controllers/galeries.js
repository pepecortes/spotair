/**
 * Galeries controller
 * @module /app_api/controllers/galeries
 */
const debug = require('debug')('app:api:controllers:galeries')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.Galerie)

// building other API calls...

// galeries "sorties associatives" only
controller.allSpotair =  function(req, res) {
	db.Galerie.scope('isspotair')
		.findAll({include: [{all:true}]})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err));
}

// filter by annee id
controller.byAnnee = function(req, res) {
	const id = req.params.id
	db.Galerie.findAll({where: {anneeId: id}, include: [{all:true, nested:true}]})
		.then((record) => {
			if (record) sendJSON.ok(res, record);
			else sendJSON.notFound(res, "Not found");
		})
		.catch(err => sendJSON.serverError(res, err));
}

// galeries "sorties associatives" only, filtered by annee
controller.spotairByAnnee =  function(req, res) {
	const id = req.params.id
	db.Galerie.scope('isspotair')
		.findAll({where: {anneeId: id}, include: [{all:true, nested:true}]})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err));
}

// filter by aerodrome id
controller.byAerodrome = function(req, res) {
	const id = req.params.id
	db.Galerie
		.findAll({where: {aerodromeId: id}, include: [{all:true, nested:true}]})
		.then((record) => {
			if (record) sendJSON.ok(res, record);
			else sendJSON.notFound(res, "Not found");
		})
		.catch(err => sendJSON.serverError(res, err));
}

// fusion
controller.fusion = ModelController.buildFusionController('galerieId', db.Galerie, db.Photo)

/**
 * @function recent
 * @desc Returns the last 'limit' (default=15) recently created galeries
 */
controller.recent = async function(req, res) {
	const limit = (req.params.limit)? parseInt(req.params.limit) : 15
	db.Galerie
		.findAll({
				limit: limit,
				order:[['createdAt', 'DESC']],
				include: [{all:true, nested:true}]
		})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function musees
 * @desc Returns the galeries corresponding to musees
 */
controller.musees = async function(req, res) {
	db.Galerie
		.findAll({
				where: {anneeId: 22},
				order:[['createdAt', 'DESC']],
				include: [{all:true, nested:true}]
		})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function collectors
 * @desc Returns the galeries corresponding to collectors
 */
controller.collectors = async function(req, res) {
	db.Galerie
		.findAll({
				where: {anneeId: 23},
				order:[['createdAt', 'DESC']],
				include: [{all:true, nested:true}]
		})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err))
}

module.exports = controller


