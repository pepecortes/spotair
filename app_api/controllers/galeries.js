/**
 * Galeries controller
 * @module /app_api/controllers/galeries
 */
const debug = require('debug')('app:api:controllers:galeries');
const db = require('../models/db');
const crud = require('./crudator');

const Model = db.Galerie;
const fieldsArray = ['isSpotair', 'commentaire', 'anneeId', 'themeId', 'aerodromeId'];
const hasForeignKeys = true;

var exports = {};
const basicAPI = crud.buildBasicAPI(Model, fieldsArray, hasForeignKeys);
exports = Object.assign(exports, basicAPI);

module.exports = exports;


