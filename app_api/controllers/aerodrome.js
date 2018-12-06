const debug = require('debug')('app:api:controllers:aerodrome');
const HTTPStatus = require('http-status');
const sequelize = require('../models/db');
const Aerodrome = sequelize.import('../models/aerodrome');

const sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//module.exports.allLugares = function(req, res) {
  //lugar
    //.find()
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

module.exports.aerodromeById = function(req, res) {
  sendJSONresponse(res, HTTPStatus.OK, "not yet completed");
  //lugar
    //.findById(req.params.id)
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
};

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


