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

var x = helpers.jpegMetadataSync(path)
console.dir(x)

// read img file (partially) just to extract exif + size
helpers.jpegMetadata(path)
	.then(data => console.dir(data))
	.catch(err => {console.log("ERROR: " + err)})

// resize file, keep exif	
fsp.readFile(path)
	.then(buffer => new Sharp(buffer).withMetadata().resize(500).toFile(pathResized))
	.catch(err => {console.log("ERROR: " + err)})
	
// resize file (make thumbnail)
fsp.readFile(path)
	.then(buffer => new Sharp(buffer).resize(100).toFile(pathThumb))
	.catch(err => {console.log("ERROR: " + err)})


