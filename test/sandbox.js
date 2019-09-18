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


const id = 54301

photoUploadController._rejectExistingPhoto(id)
	.then(() => db.Photo.findByPk(id, {include: [{all:true, nested:true}]}))
	.then(photo => {
		p1 = photo.deleteAllViews()
		p2 = storageController._deletePicture(id)
		p3 = photo.destroy()
		return Promise.all([p1, p2, p3])
	})
	.then(() => db.updateFTSindex())
	.catch(err => console.log(err))

//db.Photo.findByPk(id, {include: [{all:true, nested:true}]})
	//.then(photo => photo.deleteAllViews())
	//.then(result => console.log(result))
	//.catch(err => console.log(err))







