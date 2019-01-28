/**
 * Users controller
 * @module /app_api/controllers/users
 */
const debug = require('debug')('app:api:controllers:users')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.User)

// building other API calls...

// get user by login name
/**
 * @function byLogin
 * @description Returns the photographe that has the given username
 * @param {string} username
 * @return {Object} The given photographe, or null if not exists
 */
controller.byLogin =  async function(req, res) {
	const username = req.params.username
	db.User.findOne({where: {mail: username}})
		.then(result => sendJSON.ok(res, result))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function setPassword
 * @description Sets the password of the user given by its id
 * @param {string} req.param.id
 * @param {string} req.body.password
 * @return {Object} The given photographe, or null if fails
 */
controller.setPassword = async function(req, res) {
	const id = req.params.id
	const password = req.body.password	
	db.User.findByPk(id)
		.then(record =>  {
			record.password = password
			return record.save()
		})
		.then(record => db.User.findByPk(id))
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err))
}

module.exports = controller
