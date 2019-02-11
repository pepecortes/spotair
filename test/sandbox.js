// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')

// connect database and models
console.log("START TEST")

//const db = require('../app_api/models/db')
	
//Model = db.Photo
//var instance = Model.build();
//console.log("photo " + JSON.stringify(instance))

//var OVHStorage = require('node-ovh-storage');

//var config = {
	//username: 'sJm6rkJbMD8h',
	//password: '3478wfekYQEwWQNN5TaWEpRx6sHsYBqw',
	//authURL: 'https://auth.cloud.ovh.net/v2.0/',
  //tenantId: '204701acb74a4804903a0a7699535282',
  //region:   'GRA5'
//};

//var storage = new OVHStorage(config)
//storage.getToken(
	//function(err) {
		//console.log("CONNECTED: err: " + err)
    ////storage.putFile('./tmp/hola.pepe', '/static/hola.pepe', (err, res) => {console.log(err), console.log(res)})
    //storage.getFileList('/', (err, res) => {console.log(err), console.log(res)})
	//}
//)

const source = "./hola.pepe"
const target = "./bak/hola.pepe"

//function copyFile(source, target) {
  //var rd = fs.createReadStream(source);
  //var wr = fs.createWriteStream(target);
  //return new Promise(function(resolve, reject) {
    //rd.on('error', reject);
    //wr.on('error', reject);
    //wr.on('finish', resolve);
    //rd.pipe(wr);
  //}).catch(function(error) {
    //rd.destroy();
    //wr.end();
    //throw error;
  //});
//}

helpers.copyFile(source, target)
	.then(out => console.log("success: " + out))
	.catch(err => console.log("error: " + err))





