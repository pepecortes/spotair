/**
 * Avions controller
 * @module /app_api/controllers/avions
 */
const debug = require('debug')('app:api:controllers:avions')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.Avion)

// building other API calls...

// fusion
controller.fusion = ModelController.buildFusionController('avionId', db.Avion, db.Appareil)

module.exports = controller


