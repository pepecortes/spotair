/**
 * Likes controller
 * @module /app_api/controllers/likes
 */
const debug = require('debug')('app:api:controllers:likes')
const db = require('../models/db')
const ModelController = require('./modelController')

var controller = new ModelController(db.Like)

// building other API calls...

module.exports = controller
