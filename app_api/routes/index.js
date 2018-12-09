/** 
* API routes definition
* @module /app_api/index
*/
const debug = require('debug')('app:api:routes');
var express = require('express');

// Import all the controllers 
var ctrlAerodromes = require('../controllers/aerodromes');
var ctrlAnnees = require('../controllers/annees');
var ctrlThemes = require('../controllers/themes');
var ctrlGaleries = require('../controllers/galeries');

// Start the router
var router = express.Router();

// Aerodromes 
router.get('/aerodromes', ctrlAerodromes.all);
router.get('/aerodromes/:id', ctrlAerodromes.byId);
router.post('/aerodromes', ctrlAerodromes.create);
router.put('/aerodromes/:id', ctrlAerodromes.update);
router.delete('/aerodromes/:id', ctrlAerodromes.delete);

// Annees
router.get('/annees', ctrlAnnees.all);
router.get('/annees/:id', ctrlAnnees.byId);
router.post('/annees', ctrlAnnees.create);
router.put('/annees/:id', ctrlAnnees.update);
router.delete('/annees/:id', ctrlAnnees.delete);

// Themes
router.get('/themes', ctrlThemes.all);
router.get('/themes/:id', ctrlThemes.byId);
router.post('/themes', ctrlThemes.create);
router.put('/themes/:id', ctrlThemes.update);
router.delete('/themes/:id', ctrlThemes.delete);

// Galeries
router.get('/galeries', ctrlGaleries.all);
router.get('/galeries/:id', ctrlGaleries.byId);
router.post('/galeries', ctrlGaleries.create);
router.put('/galeries/:id', ctrlGaleries.update);
router.delete('/galeries/:id', ctrlGaleries.delete);


module.exports = router;
