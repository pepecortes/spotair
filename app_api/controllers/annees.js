/**
 * Annees controller
 * @module /app_api/controllers/annees
 */
const debug = require('debug')('app:api:controllers:annees')
const db = require('../models/db')
const ModelController = require('./modelController')

var controller = new ModelController(db.Annee)

// building other API calls...

// fusion
controller.fusion = ModelController.buildFusionController('anneeId', db.Annee, db.Galerie)

module.exports = controller



