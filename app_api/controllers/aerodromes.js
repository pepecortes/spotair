const debug = require('debug')('app:api:controllers:aerodromes');
const HTTPStatus = require('http-status');
const db = require('../models/db');
const Aerodrome = db.Aerodrome;

const sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.all = function(req, res) {
  Aerodrome
    .findAll()
    .then(record => sendJSONresponse(res, HTTPStatus.OK, record))
    .catch(err => sendJSONresponse(res, HTTPStatus.NOT_FOUND, err));
};

module.exports.byId = function(req, res) {
  Aerodrome
    .findById(req.params.id)
    .then(record => sendJSONresponse(res, HTTPStatus.OK, record))
    .catch(err => sendJSONresponse(res, HTTPStatus.NOT_FOUND, err));
};

/**
 * Create an aerodrome
 */
module.exports.create = function(req, res) {
	var newRecord = {
		nom: req.body.nom,
		lieu: req.body.lieu,
		latitude: req.body.latitude,
		longitude: req.body.longitude
	}
  Aerodrome
    .create(newRecord)
    .then(record => sendJSONresponse(res, HTTPStatus.OK, record))
		.catch(err => sendJSONresponse(res, HTTPStatus.NOT_FOUND, err));
};

///**
 //* Update a single aerodrome
 //* Input: the record to update, which containes the ID
 //*/
//module.exports.upsert = function(req, res) {
	//var updatedRecord = {
		//id: req.body.id,
		//nom: req.body.nom,
		//lieu: req.body.lieu,
		//latitude: req.body.latitude,
		//longitude: req.body.longitude
	//}
  //Aerodrome
    //.upsert(updatedRecord)
    //.then(record => sendJSONresponse(res, HTTPStatus.OK, record))
		//.catch(err => sendJSONresponse(res, HTTPStatus.NOT_FOUND, err));
//};


//module.exports.lugarByNombre = function(req, res) {
  //lugar
    //.findOne({nombre: req.params.nombre})
    //.populate('pretty')
    //.exec(function(err, lugares) {
      //if (!lugares) {
        //sendJSONresponse(res, HTTPStatus.NOT_FOUND, {
          //"message": "nothing found"
        //});
        //return;
      //} else if (err) {
        //sendJSONresponse(res, HTTPStatus.NOT_FOUND, err);
        //return;
      //}
      //sendJSONresponse(res, HTTPStatus.OK, lugares);
    //});
//};




//module.exports.editLugar = function(req, res) {
	///*
	 //* Edit a lugar
	 //* input: idLugar and an object: {nombre, nombre_largo, lat, long}
	 //* output: number affected + idLugar
	 //*/
	//var id = req.params.id;
	//var updatedLugar = {
		//nombre: req.body.nombre,
		//nombre_largo: req.body.nombre_largo,
		//geo: [parseFloat(req.body.long), parseFloat(req.body.lat)]
	//};
	//lugar.update(
			//{_id: id},
			//updatedLugar,
			//{},
			//function(err, numAffected) {
			//if (err) {
				//sendJSONresponse(res, HTTPStatus.BAD_REQUEST, err);
			//} else {
				//result = numAffected;
				//result.id = id;
				//sendJSONresponse(res, HTTPStatus.OK, result);
			//}}
		//);
//}


