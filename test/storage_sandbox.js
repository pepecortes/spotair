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

//var LOCAL_STORAGE = (process.env.STORAGE === "LOCAL")
LOCAL_STORAGE = false


const OVH = require('../app_lib/OVH')

console.log("START TEST: " + LOCAL_STORAGE)
console.log("path " + readUploadedImage(1))

const container = new OVH()
//container.connect()
	//.then(() => container.getFileAsync(OVH.buildPath("8")))
container.readThumbnail("8")
	//.then(() => container.getFileListAsync("/static"))
	.then(output => console.log(JSON.stringify(output)))
	.catch(err => console.log("error " + err))
	
	
function readUploadedImage(id) {
	console.log("READING IMAGE " + id)
	const dir = path.resolve('../', process.env.LOCAL_STORAGE_LOCATION, process.env.UPLOAD_LOCATION, id + ".jpg")
	return dir
}

//function listContainer() {
	//if (LOCAL_STORAGE) {
		//const dir = path.resolve('../', process.env.LOCAL_STORAGE_LOCATION)
		//debug(`reading folder contents from: ${dir}`)
		//return fsp.readdir(dir)
	//}
	//// if OVH remote storage...
	//function getListPromise() {
		//return new Promise((resolve, reject) =>
			//containerOVH.getFileList("/" + process.env.CONTAINER_NAME, (err, data) => {
				//if (err !== null) reject(err)
				//else resolve(data)
			//}))
	//}
	//return getOVHToken(containerOVH).then(() => getListPromise())
//}

//function getOVHToken(container) {
	//return new Promise((resolve, reject) => container.getToken((err, data) => {
		//if (err !== null) reject(err)
		//else resolve(data)
	//}))
//}
