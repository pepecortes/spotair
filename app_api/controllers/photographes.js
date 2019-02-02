/**
 * Photographes controller
 * @module /app_api/controllers/photographe
 */
const debug = require('debug')('app:api:controllers:photographes')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.Photographe)

// building other API calls...

// fusion
controller.fusion = ModelController.buildFusionController('photographeId', db.Photographe, db.Photo)

module.exports = controller
