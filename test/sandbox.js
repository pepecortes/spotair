// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const fsp = require('fs').promises
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')
const Sharp = require('sharp')
const db = require('../app_api/models/db')

// connect database and models
console.log("START TEST")

db.Photo.findById(2)
	.then(photo => {photo.addView = 10; return photo.save()})
	.catch(err => console.error(err.toString()))

//const exifParser = require('exif-parser')
//const path = "./pluto.jpg"
//const pathResized = "./pluto_resized.jpg"
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

//db.Photo.findAll({
									//limit: 50,
									//order:[['dateValidation', 'DESC']],
									//include: [{all:true, nested:true}]
									//})
	//.then(records => {
		//const items = records.map(photo => toItem(photo))
		//console.dir(items)
	//})
	//.catch(err => console.error(err.toString()))
	
//function toItem(photo) {
	//return {
		//src: 'http://localhost:3000/localStorage/picts/' + photo.id + '.jpg',
		//thumbnail: 'http://localhost:3000/localStorage/thumbs/' + photo.id + '.jpg',
		//w: 600,
		//h: 400,
	//}
//}
