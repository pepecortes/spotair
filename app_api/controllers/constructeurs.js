/**
 * Constructeur controller
 * @module /app_api/controllers/constructeurs
 */
const debug = require('debug')('app:api:controllers:constructeur')
const db = require('../models/db')
const ModelController = require('./modelController')

var controller = new ModelController(db.Constructeur)

// building other API calls...

// fusion
//controller.fusion = ModelController.buildFusionController('modeleId', db.Constructeur, db.Modele)

module.exports = controller
