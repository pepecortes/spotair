// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const fsp = require('fs').promises
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')
const Sharp = require('sharp')

// connect database and models
console.log("START TEST")

const exifParser = require('exif-parser')
const path = "./pluto.jpg"
const pathResized = "./pluto_resized.jpg"
const pathThumb = "./pluto_thumb.jpg"

// read img file (partially) just to extract exif + size

//const buffer = Buffer.alloc(65535)
//fsp.open(path)
	//.then(fd => fd.read(buffer, 0, 65535, 0))
	//.then(reading => {
		//var parser = exifParser.create(reading.buffer)
		//var result = parser.parse()
		//console.log("result: " + JSON.stringify(result))
		//return "OK!"
	//})
	//.catch(err => {console.log("ERROR: " + err)})
	
helpers.jpegMetadata(path)
	.then(data => console.dir(data))
	.catch(err => {console.log("ERROR: " + err)})

// read img file complete
// resize, create thumb, keep exif
	
fsp.readFile(path)
	.then(buffer => new Sharp(buffer).withMetadata().resize(500).toFile(pathResized))
	.catch(err => {console.log("ERROR: " + err)})
	
fsp.readFile(path)
	.then(buffer => new Sharp(buffer).resize(100).toFile(pathThumb))
	.catch(err => {console.log("ERROR: " + err)})




