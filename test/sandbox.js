// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const fsp = require('fs').promises
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')
const SpotairPict = require('../app_lib/SpotairPict')
const Sharp = require('sharp')
const db = require('../app_api/models/db')
const probe = require('probe-image-size')

// connect database and models
console.log("START TEST")

//function cycle([input, output, count]) {
	//if (count <= 0 || input.length <= 0) return [input, output, count]
	//output.push(input.shift())
	//cycle([input, output, count-1])
//}

//const A = [1,2,3]
//const B = [3,4,5]

//console.log([A,B])
//cycle([A,B,6])
//console.log([A,B])

//const chance = require('chance').Chance()
//var w = chance.integer({ min: 100, max: 350 })
//var dim = `http://via.placeholder.com/${w}x200`
//console.log(`chance: ${dim}`)

//function createPlaceholder() {
	//const w = chance.integer({ min: 100, max: 350 })
	//return {url: `http://via.placeholder.com/${w}x200`}
//}

//var x = _.times(20, createPlaceholder)
//console.log(x)

const path = "./pluto.jpg"
const pathResized = "./pluto_resized.jpg"
//fsp.readFile(path)
	//.then(buffer => {
		//const x = new SpotairPict(buffer)
		//x.thumbnail().toThumbnailFile('thumb')
		////x.normalize().toPictureFile('pic')
	//})
	////.then(outputBuffer => fsp.writeFile('./output.jpg', outputBuffer))
	//.catch(err => console.log("Error: " + err))


fsp.readFile(path)
	.then(buffer => (new SpotairPict(buffer)).normalize())
	.then(img => img.dimensions())
	.then(data => console.log(data))
	//.then(img => {console.log("img is Sharp " + (img instanceof Sharp)); return img})
	//.then(img => img.toFile(pathResized))
	//.then(result => console.log(JSON.stringify(result)))
	//.catch(err => {console.log("ERROR: " + err)})

//const exifParser = require('exif-parser')
//const pathThumb = "./pluto_thumb.jpg"

//var x = helpers.jpegMetadataSync(path)
//console.dir(x)

//// read img file (partially) just to extract exif + size
//helpers.jpegMetadata(path)
	//.then(data => console.dir(data))
	//.catch(err => {console.log("ERROR: " + err)})

//// resize file, keep exif	
//fsp.readFile(path)
	//.then(buffer => new Sharp(buffer).withMetadata().resize(500).toFile(pathResized))
	//.catch(err => {console.log("ERROR: " + err)})
	
//// resize file (make thumbnail)
//fsp.readFile(path)
	//.then(buffer => new Sharp(buffer).resize(100).toFile(pathThumb))
	//.catch(err => {console.log("ERROR: " + err)})


//const fetch = require('node-fetch')

//fetch('http://localhost:3000/api/photos/recent')
    //.then(res => res.json())
    //.then(json => console.log(json.map(photoToImgData)))
    
    //.catch(err => console.error(err))

//function photoToImgData(photo) {
	//var imgData = {}
	//imgData.src = `http://localhost:3000/localStorage/pictures/${photo.id}.jpg`
	//imgData.w = photo.width
	//imgData.h = photo.height
	//imgData.thumbnail = `http://localhost:3000/localStorage/thumbnails/${photo.id}.jpg`
	//return imgData
//}

//return

//var probe = require('probe-image-size')
//const url = "https://img.over-blog-kiwi.com/0/93/85/50/20140510/ob_4165d8_sid-vicious-04.jpg"
//probe(url).then(result => {
  //console.log(result)
 //})
	
//function toItem(photo) {
	//return {
		//src: 'http://localhost:3000/localStorage/picts/' + photo.id + '.jpg',
		//thumbnail: 'http://localhost:3000/localStorage/thumbs/' + photo.id + '.jpg',
		//w: 600,
		//h: 400,
	//}
//}
