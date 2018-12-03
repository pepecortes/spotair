var express = require('express');
var router = express.Router();
var ctrlLugares = require('../controllers/lugares');

/*--- LUGARES ---*/
router.get('/lugares', ctrlLugares.allLugares);
router.get('/lugares/:id', ctrlLugares.lugarById);
router.get('/lugares/nombre/:nombre', ctrlLugares.lugarByNombre);
router.put('/lugares/visit/:nombre', ctrlLugares.visit);
	/* example: http://localhost:3003/api/lugares/visit/cernin?comentario=kakavaka */
	
router.put('/lugares/visitId/:id', ctrlLugares.visitById);
// log a visit to the lugar given by its id
	
/**
 * Log a visit to a lugar given GPS coordinates. If the coordinates
 * are not close to a place, then log nothing
 * Can pass a range as input, otherwise use default 100 meters
 */
router.put('/lugares/visit/long/:long/lat/:lat', ctrlLugares.visitByGPS);
	
/**
 * Create a new lugar. Pass visit=true if you want to log a visit
 */
router.post('/lugares', ctrlLugares.createLugar);

// remove a geolog entry
router.put('/lugares/removelog/:idLugar/idlog/:idLog', ctrlLugares.removeGeolog);

// edit a lugar
router.put('/lugares/:id', ctrlLugares.editLugar);

/**
 * remove a lugar
 */
router.delete('/lugares/:id', ctrlLugares.deleteLugar);


/**
 * geoquery: return all lugares within given range
 * (defaults to 100 meters)
 * example: /api/lugares/long/1.4112564/lat/43.602314?range=150
 */
router.get('/lugares/long/:long/lat/:lat', ctrlLugares.lugarInRange);


module.exports = router;
