/**
 * Themes controller
 * @module /app_api/controllers/themes
 */
const debug = require('debug')('app:api:controllers:themes')
const db = require('../models/db')
const ModelController = require('./modelController')

var controller = new ModelController(db.Theme)

// building other API calls...

// fusion
controller.fusion = ModelController.buildFusionController('themeId', db.Theme, db.Galerie)

module.exports = controller
