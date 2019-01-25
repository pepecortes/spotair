// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')

// connect database and models
console.log("START TEST")

const db = require('../app_api/models/db')
const ModelController = require('../app_api/controllers/modelControler')

var controllers = new ModelController(db.Aerodrome)
console.log("controllers: " + controllers.includeOption)

const ctrlAerodromes = require('../app_api/controllers/aerodromes')
console.log("ctrlAerodromes: " + ctrlAerodromes.includeOption)
