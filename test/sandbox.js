// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')

// connect database and models
console.log("START TEST")

const exifParser = require('exif-parser')
const path = "./pluto.jpg"

// read img file (partially) just to extract exif + size
//const ministream = fs.createReadStream(path, {end: 65635})
const ministream = fs.readFileSync(path)
var parser = exifParser.create(ministream)
try {
	var result = parser.parse()
	console.log("images size: " + JSON.stringify(result.getImageSize()))
	console.log("result tags: " + JSON.stringify(result.tags))
} catch(err) {
	console.log("error: " + err)
}



// read img file complete

// resize, create thumb, keep exif

// copy to file

// read new file and thumb

// read exif



