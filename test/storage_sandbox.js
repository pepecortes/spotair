// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const debug = require('debug')('app:api:storage')

const _ = require('lodash');
const fs = require('fs');
const fsp = require('fs').promises
const pickObject = require('lodash').pick;
const Sharp = require('sharp')
const db = require('../app_api/models/db')
const path = require('path')
const formidable = require('formidable')
const SpotairPict = require('../app_lib/SpotairPict')

//var LOCAL_STORAGE = (process.env.STORAGE === "LOCAL")
LOCAL_STORAGE = false


const OVH = require('../app_lib/OVH')

console.log("START TEST: " + LOCAL_STORAGE)
console.log("path " + readUploadedImage(1))

const container = new OVH()
//container.deletePicture(3)
//container.connect()
container.readUploaded("3")
	.then(buffer => (new SpotairPict(buffer)).thumbnail().toThumbnailFile("x"))
	//.then(() => container.getFileAsync("/static/uploads/3.jpg"))
//var stream = fs.createReadStream(readUploadedImage(1))
//container.writePicture(stream, "3")
	//.then(() => container.getFileListAsync("/static"))
	//.then(output => console.log(JSON.stringify(output)))
	.then(output => console.log(output instanceof Buffer))
	.catch(err => console.log("error " + err))
	
	
function readUploadedImage(id) {
	console.log("READING IMAGE " + id)
	const dir = path.resolve('../', process.env.LOCAL_STORAGE_LOCATION, process.env.UPLOAD_LOCATION, id + ".jpg")
	return dir
}

