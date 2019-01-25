/**
 * Compagnies controller
 * @module /app_api/controllers/compagnies
 */
const debug = require('debug')('app:api:controllers:compagnies')
const db = require('../models/db')
const ModelController = require('./modelController')

var controller = new ModelController(db.Compagnie)

// building other API calls...

// FUSION NOT YET COMPLETED

module.exports = controller;
