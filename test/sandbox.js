// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')

// connect database and models
const db = require('../app_api/models/db');
const Model = db.Photographe

console.log("START TEST")

console.log("metadata " + JSON.stringify(Model.generateHash))
console.log("metadata " + JSON.stringify(Model.metadata))

const id = 1
var record = null

Model.findByPk(id)
	.then(record => console.log("record: " + record))
	.catch(e => console.log(e.toString()))






	



