// Sandbox for testing image migration 
require('dotenv').config({path: '../../.env'})
const OVH = require('../../app_lib/OVH')

const CopyImage = require('./CopyImage')

//const _ = require('lodash');
//const fs = require('fs');
//const fsp = require('fs').promises
//const pickObject = require('lodash').pick;
//const Sharp = require('sharp')
//const db = require('../app_api/models/db')
//const path = require('path')
//const formidable = require('formidable')
//const SpotairPict = require('../app_lib/SpotairPict')

//const OVH = require('../app_lib/OVH')
//const LocalStorage = require('../app_lib/LocalStorage')

console.log("START TEST")
const img = new CopyImage("666", new OVH())
img.readImage()
	.then(img => img.updateDatabase())
	.then(img => img.copyToContainer())
	//.then(img => console.log(img.METADATA))
	.catch(err => console.error("CATCH ERROR " + err))

////const container = new LocalStorage()
//const containerOVH = new OVH()
//const containerLocal = new LocalStorage()
////var buffer = fs.readFileSync(readUploadedImage(1))
////const filepath = "/pictures/koko.jpg"
//containerOVH.readUploaded("10")
	//.then(buffer => new SpotairPict(buffer).thumbnail().toThumbnailFile("666"))
	////.then(spotairpict => containerLocal.writeThumbnail(spotairpict, 666))
	////.then(spotairpict => containerOVH.writeThumbnail(spotairpict, 666))
	////.then(buffer => debug("result is buffer " + (buffer instanceof Buffer)))
	//.then(output => console.log(JSON.stringify(output)))
	//.catch(err => console.log("error " + err))	
	

	
	
//function readUploadedImage(id) {
	//console.log("READING IMAGE " + id)
	//const dir = path.resolve('../', process.env.LOCAL_STORAGE_LOCATION, process.env.UPLOAD_LOCATION, id + ".jpg")
	//return dir
//}

