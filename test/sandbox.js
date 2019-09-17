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
const photoController = require('../app_api/controllers/photos.js')

console.log("START")


db.updateFTSindex()

//const id = 40000
//var photo = null
	
//db.Photo.findByPk(id, {include: [{all:true, nested:true}]})
	//.then(result => {photo = result; return result})
	//.then(photo => photo.likes)
	//.then(likes => likes.map(like => like.destroy()))


//storageController._deletePicture(id)
		//.then(result => console.log(result))







