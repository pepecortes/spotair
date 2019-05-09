/**
 * CopyImage class for accessing one spotair image, process it,
 * make a copy in OVH and store data in the database
 * @module /test/convertDB/CopyImage
 */ 
require('dotenv').config({path: '../../.env'})

const fetch = require('node-fetch')
const Sharp = require('sharp')
const db = require('../../app_api/models/db')
const OVH = require('../../app_lib/OVH')

const container = new OVH()

class CopyImage {
	
	//static get rootPath() {
		//return `/${process.env.CONTAINER_NAME}/`
	//}
	
	constructor(id) {
		this.ID = id
		this.STREAM = null
		this.METADATA = {}
		this.RECORD = {}
		//super(config)
	}
	
	/**  @desc Read image from url. Extract metadata */
	async readImage() {
		const me = this
		const sharp = new Sharp()
		const url = `http://spotair.org/repupload/original/${this.ID}.jpg`
		console.log(`id: ${me.ID}. Reading URL: ${url}`)
		return fetch(url)
			.then(res => {
				if (!res.ok) throw Error(`id: ${me.ID}. RESPONSE NOK for URL: ${url}`)
				me.STREAM = res.body
				me.STREAM.pipe(sharp)
				return sharp.metadata()
			})
			.then(metadata => {
				me.METADATA = metadata
				console.log(`id: ${me.ID}. Reading done`)
				return me
			})
	}
	
	/** @desc Update the pictures database with the image metadata */
	async updateDatabase() {
		const me = this
		console.log(`id: ${me.ID}. Updating database`)
		const update = me.METADATA
		db.Photo
			.findByPk(me.ID)
			.then(record => {
				record = Object.assign(record, update);
				return record.save();
			})
			.then(record => db.Photo.findByPk(record.id))
			.then(record => {
				me.RECORD = record
				console.log(`id: ${me.ID}. Updating done`)
				return me
			})
		return me
	}
	
	/** @desc Copy image to OVH */
	async copyToOVH() {
		const me = this
		return me
	}
	
	
}
	

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

//console.log("START TEST")
//console.log("path " + readUploadedImage(1))

////const container = new LocalStorage()
//const containerOVH = new OVH()
//const containerLocal = new LocalStorage()
////var buffer = fs.readFileSync(readUploadedImage(1))
////const filepath = "/pictures/koko.jpg"
//containerOVH.readUploaded("10")
	//.then(buffer => new SpotairPict(buffer).thumbnail().toThumbnailFile("666"))
	////.then(spotairpict => containerLocal.writeThumbnail(spotairpict, 666))
	////.then(spotairpict => containerOVH.writeThumbnail(spotairpict, 666))
	////.then(buffer => debug("result is buffer " + (buffer instanceof Buffer)))
	//.then(output => console.log(JSON.stringify(output)))
	//.catch(err => console.log("error " + err))	
	

	
	
//function readUploadedImage(id) {
	//console.log("READING IMAGE " + id)
	//const dir = path.resolve('../', process.env.LOCAL_STORAGE_LOCATION, process.env.UPLOAD_LOCATION, id + ".jpg")
	//return dir
//}

module.exports = CopyImage

