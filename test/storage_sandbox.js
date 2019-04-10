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

var LOCAL_STORAGE = (process.env.STORAGE === "LOCAL")
//LOCAL_STORAGE = false

var OVHStorage = require('node-ovh-storage')
var configOVH = {
	username:	process.env.OVH_USERNAME,
	password:	process.env.OVH_PASSWORD,
	authURL:	process.env.OVH_AUTH_URL,
  tenantId: process.env.OVH_TENTANT_ID,
  region: 	process.env.OVH_REGION
}
const containerOVH = new OVHStorage(configOVH)


// connect database and models
console.log("START TEST: " + LOCAL_STORAGE)
//listContainer()
	//.then(output => console.log(output))
	//.catch(err => console.log("ERROR: " + err))
console.log("path " + readUploadedImage(1))


function readUploadedImage(id) {
	console.log("READING IMAGE " + id)
	const dir = path.resolve('../', process.env.LOCAL_STORAGE_LOCATION, process.env.UPLOAD_LOCATION, id + ".jpg")
	return dir
}

function listContainer() {
	if (LOCAL_STORAGE) {
		const dir = path.resolve('../', process.env.LOCAL_STORAGE_LOCATION)
		debug(`reading folder contents from: ${dir}`)
		return fsp.readdir(dir)
	}
	// if OVH remote storage...
	function getListPromise() {
		return new Promise((resolve, reject) =>
			containerOVH.getFileList("/" + process.env.CONTAINER_NAME, (err, data) => {
				if (err !== null) reject(err)
				else resolve(data)
			}))
	}
	return getOVHToken(containerOVH).then(() => getListPromise())
}

function getOVHToken(container) {
	return new Promise((resolve, reject) => container.getToken((err, data) => {
		if (err !== null) reject(err)
		else resolve(data)
	}))
}
