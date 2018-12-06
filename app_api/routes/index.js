const debug = require('debug')('app:api:routes');

var express = require('express');
var router = express.Router();
var ctrlLugares = require('../controllers/aerodrome');

/** Get an aerodrome by its id */
router.get('/aerodrome/:id', ctrlLugares.aerodromeById);

module.exports = router;
