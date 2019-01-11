// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')

// connect database and models
const db = require('../app_api/models/db');

console.log("START TEST")

const Photographe = require('../app_api/models/db').Photographe;


Photographe.findByPk(1)
	.then((record) => record.validPassword("membres"))
	.then((valid) => console.log("VALID IS " + valid))
	




//async function test(req, res) {
	
	//const output = "";
	//const destinationid = 3;
	////try {
		//await db.Aerodrome.findByPk(destinationid);
	////} catch (error) {
		//console.log("NO RECORD")
	////}
	//console.log("CONTINUO")
	
	
	//Model
		//.findByPk(destinationid)
		//.then((record) => {
			//if (!record) {
				//sendJSON.notFound(res, "destination id: " + destinationid + " not found");
				//return Promise.reject();
			//}
			//else return Galerie.update(
				//{aerodromeId: destinationid},
				//{where: {aerodromeId: sourceid}}
			//)
		//})
		//.then(result => {
			//output.galeries_updated = result[0];
			//return Model.findByPk(sourceid);
		//})
		//.then(result => {
			//result.destroy();
			//output.aerodromes_removed = result.id;
			//sendJSON.ok(res, output);
		//})
		//.catch(err => {if(err) sendJSON.serverError(res, err)});
//}

//var result = test(null, null);
//console.log("RESULT: " + result);

