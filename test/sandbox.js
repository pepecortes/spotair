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
    //storage.putFile('./tmp/hola.pepe', '/static/hola.pepe', (err, res) => {console.log(err), console.log(res)})
	//}
//)

const SwiftClient = require('openstack-swift-client')
const authURL = "http://swift:8080/auth/v1.0"
const username = "test:tester"
const password =  "testing"
const authenticator = new SwiftClient.SwiftAuthenticator(authURL, username, password)
 
let client = new SwiftClient(authenticator);
//let container = client.container('my-container');
//container.get('test-file', process.stdout).then(() => {
    //console.log("Done!");
//});

//client.create("static", true)
	//.then(res => console.log("resultado: " + res))	
	//.catch(err => console.log("error: " + err))

client.list()
	.then(res => console.log("resultado: " + JSON.stringify(res)))	
	.catch(err => console.log("error: " + err))
	
let container = client.container('static')
container.list()
	.then(res => console.log("resultado: " + JSON.stringify(res)))	
	.catch(err => console.log("error: " + err))
 
let stream = fs.createReadStream('./koko.txt');
container.create('mykoko.txt', stream, {author: 'pepe'})
	.then(res => console.log("resultado: " + JSON.stringify(res)))	
	.catch(err => console.log("error: " + err))
	
container.list()
	.then(res => console.log("resultado: " + JSON.stringify(res)))	
	.catch(err => console.log("error: " + err))



