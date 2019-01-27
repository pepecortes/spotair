// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')

// connect database and models
console.log("START TEST")

const db = require('../app_api/models/db')
var hasForeignKeys = true
const includeOption = (hasForeignKeys)? {include: [{all:true, nested: true}]} : {};

	
db.Modele
	.findAll(includeOption)
	//.findAll()
	.then(record => console.log(JSON.stringify(record)))
	.catch(err => console.log("error " + err))
