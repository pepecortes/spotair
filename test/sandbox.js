// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

// connect database and models
const sequelize = require('../app_api/models/db');


const Contact = sequelize.import('../app_api/models/contact');
const Aerodrome = sequelize.import('../app_api/models/aerodrome');

//Aerodrome.create({nom: "NOMBRE", lieu: "LIEU"}).then(record => {
	//console.log(record.nom);
	//console.log(record.text);
//});

Aerodrome.findById(1).then(record => {
  console.log("record: " + record.nom + record.lieu + record.text);
});



