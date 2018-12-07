/**
 * Themes controller
 * @module /app_api/controllers/themes
 */
const debug = require('debug')('app:api:controllers:annees');
const db = require('../models/db');
const crud = require('./crud_creator');

/**
 * Select all themes
 * @example
 * GET: http://host:port/api/themes
 * @returns {Array} All themes in database
 */
module.exports.all = crud.all(db.Theme);

/**
 * Select a theme given by its id
 * @param {number} req.param.id - id
 * @example
 * GET: http://host:port/api/themes/12
 * @returns
 * The theme (or NOT_FOUND error)
 */
module.exports.byId = crud.byId(db.Theme);

/**
 * Create a theme
 * @param {Object} req.body - theme data
 * @param {string} req.body.theme - theme
 * @example
 * POST: http://host:port/api/themes/ (with form data in the body)
 * @returns
 * The new theme (or NOT_FOUND error)
 */
module.exports.create = crud.create(db.Theme, ['theme']);

/**
 * Update a single theme
 * @param {number} req.params.id - theme id
 * @param {Object} req.body - theme data
 * @param {string} req.body.theme - annee
 * @example
 * PUT: http://host:port/api/themes/4 (with form data in the body)
 * @returns
 * The theme modified (or NOT_FOUND error)
 */
module.exports.update = crud.update(db.Theme, ['theme']);


