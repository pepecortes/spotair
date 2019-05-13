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
//const db = require('../app_api/models/db')
//const path = require('path')
//const formidable = require('formidable')
//const SpotairPict = require('../app_lib/SpotairPict')

//const OVH = require('../app_lib/OVH')
//const LocalStorage = require('../app_lib/LocalStorage')

console.log("START TEST")
const Sharp = require('sharp')

const id = 666
const url = `http://spotair.org/repupload/original/${id}.jpg`

Promise.all([
	(new CopyImage(id)),
	(new CopyImage(id)),
	(new CopyImage(id))
])
//var img1 = new CopyImage(id)
	.then(([i1, i2, i3]) => Promise.all([i1.toUploadsFile(id), i2.normalize(), i3.thumbnail()]))
	.then(([uploaded, picture, thumbnail]) => {
		p1 = picture.updateDatabase()
		p2 = picture.toPictureFile(id)
		p3 = thumbnail.toThumbnailFile(id)
		return Promise.all([p1, p2, p3])
	})
	.then(() => console.log("OK"))
	.catch(err => console.log("error " + err))	
	
/**
 * create img
 * copy img to uploaded
 * normalize img
 * copy to pictures
 * update database
 * create thumbnail
 * copy to thumbnails
 * log it
 */


