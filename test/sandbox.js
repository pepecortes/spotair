// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
//const fs = require('fs');
//const fsp = require('fs').promises
//const pickObject = require('lodash').pick;
//const helpers = require('../app_lib/helpers')
//const SpotairPict = require('../app_lib/SpotairPict')
//const Sharp = require('sharp')
const db = require('../app_api/models/db')
const storageController = require('../app_api/controllers/storage.js')
//const probe = require('probe-image-size')

const Photo = db.Photo

console.log("START")

let caption = 'KOKOLOKO'


Photo.findByPk(54348, {include: [{all:true, nested:true}]})
	.then(photo => {
		console.log("type of caption: " + typeof caption)
		caption = (typeof caption === 'string')? caption : photo.caption
		return photo.original
	})
	.then(original => original.id)
	.then(id => storageController._storeImage(id, 54348, caption))
	.then(result => console.log(result))
	







