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

// Define the routes

// Aerodromes 
router.get('/aerodromes', ctrlAerodromes.all);
router.get('/aerodromes/:id(\\d+)', ctrlAerodromes.byId);
router.post('/aerodromes', ctrlAerodromes.create);
router.put('/aerodromes/:id(\\d+)', ctrlAerodromes.update);
router.delete('/aerodromes/:id(\\d+)', ctrlAerodromes.delete);

// Annees
router.get('/annees', ctrlAnnees.all);
router.get('/annees/:id(\\d+)', ctrlAnnees.byId);
router.post('/annees', ctrlAnnees.create);
router.put('/annees/:id(\\d+)', ctrlAnnees.update);
router.delete('/annees/:id(\\d+)', ctrlAnnees.delete);

// Themes
router.get('/themes', ctrlThemes.all);
router.get('/themes/:id(\\d+)', ctrlThemes.byId);
router.post('/themes', ctrlThemes.create);
router.put('/themes/:id(\\d+)', ctrlThemes.update);
router.delete('/themes/:id(\\d+)', ctrlThemes.delete);

// Galeries
router.get('/galeries', ctrlGaleries.all);
router.get('/galeries/:id(\\d+)', ctrlGaleries.byId);
router.post('/galeries', ctrlGaleries.create);
router.put('/galeries/:id(\\d+)', ctrlGaleries.update);
router.delete('/galeries/:id(\\d+)', ctrlGaleries.delete);
router.get('/galeries/spotair', ctrlGaleries.allSpotair);


module.exports = router;
