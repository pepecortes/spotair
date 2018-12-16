// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');

// connect database and models
//const db = require('../app_api/models/db');


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

var clientKeys = Object.keys(process.env).filter(key => key.substring(0, 6) == 'CLIENT')
var clientEnv = _.pick(process.env, clientKeys)
var output = 'const ENV = ' + JSON.stringify(clientEnv)
console.log(output)

fs.writeFile("./env.js", output, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
