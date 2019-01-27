/**
 * Modeles controller
 * @module /app_api/controllers/modeles
 */
const debug = require('debug')('app:api:controllers:modeles')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.Modele)

// building other API calls...

// fusion
controller.fusion = ModelController.buildFusionController('modeleId', db.Modele, db.Avion)

module.exports = controller


