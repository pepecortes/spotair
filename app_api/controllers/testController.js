const debug = require('debug')('app:api:test')
const helpers = require('../../app_lib/helpers')
const db = require('../models/db')
const sendJSON = helpers.sendJSON

var controller = {}

controller.test1 = function(req, res) {
	const A = [...Array(80000).keys()]
	sendJSON.ok(res, A)
}

controller.translate = function(req, res) {
	const ids = req.body.ids
	sendJSON.ok(res, `size: ${ids.length}`)
}

module.exports = controller
