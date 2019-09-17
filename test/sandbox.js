// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
//const fs = require('fs');
//const fsp = require('fs').promises
//const pickObject = require('lodash').pick;
//const helpers = require('../app_lib/helpers')
//const SpotairPict = require('../app_lib/SpotairPict')
//const Sharp = require('sharp')
//const probe = require('probe-image-size')

const db = require('../app_api/models/db')
const storageController = require('../app_api/controllers/storage.js')
const photoUploadController = require('../app_api/controllers/photouploads.js')

console.log("START")


const idPhoto = 1
photoUploadController._invalidate(idPhoto)
	.then(result => console.log(result))
	







