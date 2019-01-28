/**
 * Appareils controller
 * @module /app_api/controllers/appareils
 */
const debug = require('debug')('app:api:controllers:appareils')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.Appareil)

// building other API calls...

// fusion
controller.fusion = ModelController.buildFusionController('appareilId', db.Appareil, db.Photo)

module.exports = controller


