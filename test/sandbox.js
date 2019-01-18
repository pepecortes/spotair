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
const password = "membres"

Photographe.findByPk(id)
	.then(record =>  {
		console.log(JSON.stringify(record))
		record.password = password
		console.log(JSON.stringify(record))
	})
	//.then((valid) => console.log("VALID IS " + valid))
	.catch(e => console.log(e.toString()))


//var photographe = createInstanceFromQuery(req.body, ["password"])
//debug(JSON.stringify(photographe))


	



