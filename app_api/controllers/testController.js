const debug = require('debug')('app:api:test')
const helpers = require('../../app_lib/helpers')
const db = require('../models/db')
const sendJSON = helpers.sendJSON

var controller = {}

controller.test1 = function(req, res) {
	const A = [...Array(80000).keys()]
	sendJSON.ok(res, A)
}

controller.test2 = function(req, res) {
	
	const options = {where: {immat: "F-PYSM + F-PREV"}, include: [{all:true, nested:true}]}
	//const options = {where: {text: "F-PYSM + F-PREV"}, include: [{all:true, nested:true}]}
	//const options = {include: [{all:true, nested:true}]}
	debug(options)
	
	//if (ids) Object.assign(options, { where: { id: { [Op.in]: ids } } })
	//if (limit) Object.assign(options, { limit: limit })
	//if (offset) Object.assign(options, { offset: offset })
	db.Appareil.findAll(options)
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err))
}

controller.translate = function(req, res) {
	const ids = req.body.ids
	sendJSON.ok(res, `size: ${ids.length}`)
}


module.exports = controller
