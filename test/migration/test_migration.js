// Sandbox for testing image migration 
require('dotenv').config({path: '../../.env'})
const OVH = require('../../app_lib/OVH')
const SpotairPict = require('../../app_lib/SpotairPict')

const CopyImage = require('./CopyImage')

//const _ = require('lodash');
//const fs = require('fs');
//const fsp = require('fs').promises
//const pickObject = require('lodash').pick;
//const Sharp = require('sharp')
const db = require('../../app_api/models/db')
//const path = require('path')
//const formidable = require('formidable')
//const SpotairPict = require('../app_lib/SpotairPict')

//const OVH = require('../app_lib/OVH')
//const LocalStorage = require('../app_lib/LocalStorage')

console.log("START TEST")
const Sharp = require('sharp')

const id = 666
const url = `http://spotair.org/repupload/original/${id}.jpg`

const img = new CopyImage(id)
	.then(img => img.migrate(id))
			

//async function log(id, message="") {
	//const record = {idOrigin: id, log: message}
	//return db.LogMigration.create(record)
//}
	
/**
 * create img
 * check if id has been already processed
 * copy img to uploaded
 * normalize img
 * copy to pictures
 * update database
 * create thumbnail
 * copy to thumbnails
 * log it
 */


