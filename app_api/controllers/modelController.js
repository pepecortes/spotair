const debug = require('debug')('app:api:modelController')
const pickObject = require('lodash').pick
const helpers = require('../../app_lib/helpers')
const db = require('../models/db')
const sendJSON = helpers.sendJSON
const createInstanceFromQuery = helpers.createInstanceFromQuery
const dbReplaceReference = helpers.dbReplaceReference

/**
 * @Object
 * @desc Create a controller for the given Model.
 * @desc Create the basic CRUD API calls (all, byId, fresh, create, udpate, delete)
 * @desc Contains class methods to create additional API calls (i.e. fusion)
 * @param {Object} Model - Model for which we are creating the API calls
 */ 
function ModelController(Model) {
	this.Model = Model
	this.includeOption = (Model.metadata.hasForeignKeys)? {include: [{all:true, nested:true}]} : {}
}

/**
 * @function buildFusionController
 * @description Class method
 * @description Create a standard fusion controller. Contrary to the other controllers
 * this one needs additional data to build so it is the responsability of the particular
 * model controller to create it
 * @param {string} idField 			- field that will be fused (i.e. aerodromeId)
 * @param {Model} targetModel 	- Model being fused
 * @param {Model} parentModel		- Model that refers to the id of the targetModel
 * @return {function} a function(req, res) ready to be used as a route controller
 * number of deleted sources and number of modified galeries
 */
ModelController.buildFusionController =  function(idField, targetModel, parentModel) {
	return async function(req, res) {
		const sourceid = req.params.sourceid;
		const destinationid = req.params.destinationid;
		dbReplaceReference(parentModel, targetModel, idField, sourceid, destinationid)
			.then(result => sendJSON.ok(res, result))
			.catch(err => sendJSON.serverError(res, err))
	}
}
	
ModelController.prototype.all = function(req, res) {
	this.Model
		.findAll(this.includeOption)
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err));
}	

ModelController.prototype.byId = function(req, res) {
	const id = req.params.id;
	this.Model
		.findByPk(id, this.includeOption)
		.then((record) => {
			if (record) sendJSON.ok(res, record);
			else sendJSON.notFound(res, "id: " + id + " not found");
		})
		.catch(err => sendJSON.serverError(res, err));
}

// Returns a fresh instance of the Model (not existing in the db yet)
ModelController.prototype.fresh = function(req, res) {
	var instance = this.Model.build();
	sendJSON.ok(res, instance);
}

ModelController.prototype.create = function(req, res) {
	const record = createInstanceFromQuery(req.body, this.Model.metadata.fieldNames)
	this.Model
		.findOrCreate({where: record})
		.spread((record, created) => sendJSON.ok(res, record))
		.catch(err => {sendJSON.serverError(res, err)});
}

ModelController.prototype.update = function(req, res) {
	var updates = createInstanceFromQuery(req.body, this.Model.metadata.fieldNames)
	this.Model
		.findByPk(req.params.id, this.includeOption)
		.then(record => {
			record = Object.assign(record, updates);
			return record.save();
		})
		.then(record => this.Model.findByPk(record.id, this.includeOption))
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err));
}

ModelController.prototype.delete = function(req, res) {
	this.Model
		.findByPk(req.params.id)
		.then(record => record.destroy())
		.then(() => sendJSON.ok(res, "Removed. id: " + req.params.id))
		.catch(err => sendJSON.serverError(res, err));
}

module.exports = ModelController




