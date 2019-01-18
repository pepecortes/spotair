// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')
//const createInstanceFromQuery = require('../../app_lib/helpers').createInstanceFromQuery;

// connect database and models
const db = require('../app_api/models/db');

console.log("START TEST")

const Photographe = require('../app_api/models/db').Photographe;

const id = 1
const password = "membrexx"

Photographe.findByPk(id)
	.then(record =>  {
		record.password = password
		return record.save()
	})
	.then(record => Photographe.findByPk(record.id))
	.then(record => console.log(JSON.stringify(record)))//dsendJSON.ok(res, record))
	.catch(err => console.log(err.toString()))//sendJSON.serverError(res, err));
	
	//.then((valid) => console.log("VALID IS " + valid))
	//.catch(e => console.log(e.toString()))


//var photographe = createInstanceFromQuery(req.body, ["password"])
//debug(JSON.stringify(photographe))


	



