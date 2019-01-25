/**
 * Aerodromes controller
 * @module /app_api/controllers/aerodromes
 */
const debug = require('debug')('app:api:controllers:aerodromes')
const db = require('../models/db')
const ModelController = require('./modelController')

var controller = new ModelController(db.Aerodrome)

// building other API calls...

// fusion
controller.fusion = ModelController.buildFusionController('aerodromeId', db.Aerodrome, db.Galerie)

module.exports = controller
