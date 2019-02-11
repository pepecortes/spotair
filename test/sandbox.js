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


function getOVHToken(container) {
	return new Promise((resolve, reject) => container.getToken((err, data) => {
		if (err !== null) {debug("token error: " + err);reject(err)}
		else resolve(data)
	}))
}

var OVHStorage = require('node-ovh-storage')
var configOVH = {
	username:	process.env.OVH_USERNAME,
	password:	process.env.OVH_PASSWORD,
	authURL:	process.env.OVH_AUTH_URL,
  tenantId: process.env.OVH_TENTANT_ID,
  region: 	process.env.OVH_REGION
}
console.log(JSON.stringify(configOVH))
const containerOVH = new OVHStorage(configOVH)

OVHStorage.getToken(function(err) {
	if (err) console.log("ERROR " + err)
	else {
		storage.getFiles('/static', function(err, files) {
					// done
				});
	}
  
});



