/**
 * Annees controller
 * @module /app_api/controllers/annees
 */
const debug = require('debug')('app:api:controllers:annees');
const db = require('../models/db');
const crud = require('./crud_creator');

/**
 * Select all annees
 * @example
 * GET: http://host:port/api/annees
 * @returns {Array} All annees in database
 */
module.exports.all = crud.all(db.Annee);

/**
 * Select an annee given by its id
 * @param {number} req.param.id - id
 * @example
 * GET: http://host:port/api/annees/12
 * @returns
 * The annee (or NOT_FOUND error)
 */
module.exports.byId = crud.byId(db.Annee);

/**
 * Create an annee
 * @param {Object} req.body - annee data
 * @param {string} req.body.annee - annee
 * @example
 * POST: http://host:port/api/annees/ (with form data in the body)
 * @returns
 * The new annee (or NOT_FOUND error)
 */
module.exports.create = crud.create(db.Annee, ['annee']);

/**
 * Update a single annee
 * @param {number} req.params.id - annee id
 * @param {Object} req.body - annee data
 * @param {string} req.body.annee - annee
 * @example
 * PUT: http://host:port/api/annees/4 (with form data in the body)
 * @returns
 * The annee modified (or NOT_FOUND error)
 */
module.exports.update = crud.update(db.Annee, ['annee']);


