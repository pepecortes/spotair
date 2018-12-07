/**
 * Aerodromes controller
 * @module /app_api/controllers/aerodromes
 */
const debug = require('debug')('app:api:controllers:aerodromes');
const db = require('../models/db');
const crud = require('./crud_creator');

/**
 * Select all aerodromes
 * @example
 * GET: http://host:port/api/aerodromes
 * @returns {Array} All aerodromes in database
 */
module.exports.all = crud.all(db.Aerodrome);

/**
 * Select an aerodrome given by its id
 * @param {number} req.param.id - id
 * @example
 * GET: http://host:port/api/aerodromes/12
 * @returns
 * The aerodrome (or NOT_FOUND error)
 */
module.exports.byId = crud.byId(db.Aerodrome);

/**
 * Create an aerodrome
 * @param {Object} req.body - aerodrome data
 * @param {string} req.body.nom - nom
 * @param {string} req.body.lieu - lieu
 * @param {string} req.body.latitude - latitude (-90 to 90)
 * @param {string} req.body.longitude - longitude (-180 to 180)
 * @example
 * POST: http://host:port/api/aerodromes/ (with form data in the body)
 * @returns
 * The new aerodrome (or NOT_FOUND error)
 */
module.exports.create = crud.create(db.Aerodrome, ['nom', 'lieu', 'latitude', 'longitude']);

/**
 * Update a single aerodrome
 * @param {number} req.params.id - aerodrome id
 * @param {Object} req.body - aerodrome data (any can be missing for un update)
 * @param {string} req.body.nom - nom
 * @param {string} req.body.lieu - lieu
 * @param {string} req.body.latitude - latitude (-90 to 90)
 * @param {string} req.body.longitude - longitude (-180 to 180)
 * @example
 * PUT: http://host:port/api/aerodromes/4 (with form data in the body)
 * @returns
 * The aerodrome modified (or NOT_FOUND error)
 */
module.exports.update = crud.update(db.Aerodrome, ['nom', 'lieu', 'latitude', 'longitude']);


