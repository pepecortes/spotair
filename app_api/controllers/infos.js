/**
 * Infos controller
 * @module /app_api/controllers/infos
 */
const debug = require('debug')('app:api:controllers:infos')
const db = require('../models/db')
const ModelController = require('./modelController')

var controller = new ModelController(db.Info)

// building other API calls...

module.exports = controller
