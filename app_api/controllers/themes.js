/**
 * Themes controller
 * @module /app_api/controllers/themes
 */
const debug = require('debug')('app:api:controllers:annees');
const db = require('../models/db');
const crud = require('./crudator');

const Model = db.Theme;
const fieldsArray = ['theme'];
const hasForeignKeys = false;

var exports = {};
const basicAPI = crud.buildBasicAPI(Model, fieldsArray, hasForeignKeys);
exports = Object.assign(exports, basicAPI);

module.exports = exports;
