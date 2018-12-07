const debug = require('debug')('app:api:routes');

var express = require('express');
var router = express.Router();
var ctrlAerodromes = require('../controllers/aerodromes');
var ctrlAnnees = require('../controllers/annees');
var ctrlThemes = require('../controllers/themes');

/** Aerodromes */
router.get('/aerodromes', ctrlAerodromes.all);
router.get('/aerodromes/:id', ctrlAerodromes.byId);
router.post('/aerodromes', ctrlAerodromes.create);
router.put('/aerodromes/:id', ctrlAerodromes.update);

/** Annees */
router.get('/annees', ctrlAnnees.all);
router.get('/annees/:id', ctrlAnnees.byId);
router.post('/annees', ctrlAnnees.create);
router.put('/annees/:id', ctrlAnnees.update);

/** Themes */
router.get('/themes', ctrlThemes.all);
router.get('/themes/:id', ctrlThemes.byId);
router.post('/themes', ctrlThemes.create);
router.put('/themes/:id', ctrlThemes.update);

module.exports = router;
