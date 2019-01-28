// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')

// connect database and models
console.log("START TEST")

const db = require('../app_api/models/db')
	
Model = db.Photo
var instance = Model.build();
console.log("photo " + JSON.stringify(instance))
