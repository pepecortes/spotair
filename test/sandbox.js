// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

// connect database and models
const db = require('../app_api/models/db');


const Aerodrome = db.Aerodrome;

//Aerodrome.create({nom: "NOMBRE", lieu: "LIEU"}).then(record => {
	//console.log(record.nom);
	//console.log(record.lieu);
	//console.log(record.text);
//});

Aerodrome.findById(1).then(record => {
  console.log("record: " + record.nom + record.lieu + record.text);
});



