const debug = require('debug')('app:api:routes');

var express = require('express');
var router = express.Router();
var ctrlAerodromes = require('../controllers/aerodromes');

/** Aerodromes */
router.get('/aerodromes', ctrlAerodromes.all);
router.get('/aerodromes/:id', ctrlAerodromes.byId);
router.post('/aerodromes', ctrlAerodromes.create);

module.exports = router;
