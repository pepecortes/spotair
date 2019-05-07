/**
 * Journaux controller
 * @module /app_api/controllers/journaux
 */
const debug = require('debug')('app:api:controllers:journaux')
const db = require('../models/db')
const ModelController = require('./modelController')

var controller = new ModelController(db.Journal)

// building other API calls...

module.exports = controller
