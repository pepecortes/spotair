// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const pickObject = require('lodash').pick;

// connect database and models
//const db = require('../app_api/models/db');

/**
 * @function
 * @desc Returns the same instance with the associated models IDs completed
 * @param {Object} Instance - Instance of a given model, perhaps with associations
 * @return {Object} Instance - Instance with the IDs of the associated models completed
 * @example {id:3, "theme":{"id":2,"theme":"foo", ...}, ...} -> {id:3, themeId:2, "theme":{"id":2,"theme":"foo", ...}, ...}
 */
function completeAssociationsId(instance) {
	
	function extractId(key, value) {
		if ((value == null) || (typeof value !== 'object') || !('id' in value)) return [false, false]
		var output = {}
		var keyId = key + "Id"
		return [keyId, value.id]
	}
	
	var output = JSON.parse(JSON.stringify(instance));
	for (var key in instance) {
		var [keyId, value] = extractId(key, instance[key])
		if (keyId) output[keyId] = value
	}
	return output
	
}


var form = {"text":", isSpotair: false, null","invalid":{"isspotair":"Requis","commentaire":"","annee":"Requis","theme":"Requis","aerodrome":"Requis"},"createdAt":{"val":"CURRENT_TIMESTAMP"},"updatedAt":{"val":"CURRENT_TIMESTAMP"},"isSpotair":true,"commentaire":"kokoloko","id":null,"annee":{"text":"1984","invalid":{"annee":"Requis"},"id":1,"annee":"1984","createdAt":"2018-12-08T16:16:43.000Z","updatedAt":"2018-12-08T16:16:43.000Z"},"theme":{"text":"COLORIN COLORADO","invalid":{"theme":"Requis"},"id":2,"theme":"COLORIN COLORADO","createdAt":"2018-12-09T14:38:45.000Z","updatedAt":"2018-12-09T14:39:57.000Z"},"aerodrome":{"text":"Don Quijote, en un lugar de la mancha","invalid":{"nom":"Requis","lieu":"Requis","latitude":"Doit être entre -90 et +90. Doit être accompagné de longitude","longitude":"Doit être entre -180 et +180. Doit être accompagné de latitude"},"id":2,"nom":"Don Quijote","lieu":"en un lugar de la mancha","latitude":12,"longitude":21,"createdAt":"2018-12-09T11:06:03.000Z","updatedAt":"2018-12-16T17:07:27.000Z"}}


var record = completeAssociationsId(form)
console.log("\nrecord is " + JSON.stringify(record))

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

