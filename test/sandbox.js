// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

// connect database and models
const db = require('../app_api/models/db');

db.Galerie.scope('isspotair').findAll({include: [{all:true, nested:true}]}).then(records => {
  console.log('\r\n');
  console.log(records.length);
  console.log(records[0].text);
  console.log('\r\n');
})

//db.Annee.findByPk(1, {include: [{all:true, nested:true}]}).then(record => {
  //console.log('\r\n');
  //console.log(JSON.stringify(record));
  //console.log('\r\n');
//})

//db.Annee.findByPk(1, {include: [{all:true, nested:true}]})
	//.then(record => {
		//console.log('\r\n');
		//console.log(JSON.stringify(record));
		//console.log('\r\n');
		//return record.destroy();
	//})
	//.then(() => console.log("DESTROYED"))
	//.catch(err => console.log(err));
	
//db.Galerie.findByPk(1, {include: [{all:true, nested:true}]})
	//.then(record => {
		//console.log('\r\n');
		//console.log(JSON.stringify(record));
		//console.log('\r\n');
		//return record.destroy();
	//})
	//.then(() => console.log("DESTROYED"))
	//.catch(err => console.log(err));


//const newRecord = {
    //"isSpotair": "1",
    //"commentaire": "comentario jocoso segundo",
    //"anneeId": "1",
    //"themeId": "1",
    //"aerodromeId": "1"
//};
//const id = 21;

//db.Galerie.update(newRecord, {where: {id: id}, include: [{all:true, nested:true}]})
	//.then(() => {
		//console.log('\r\n');
		////console.log(record.commentaire);
		//console.log('\r\n');
	//})
	//.catch(err => console.log("ERROR: " + err));
