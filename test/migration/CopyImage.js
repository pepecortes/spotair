/**
 * CopyImage class for accessing one spotair image, process it,
 * make a copy in OVH and store data in the database
 * @module /test/convertDB/CopyImage
 */ 
require('dotenv').config({path: '../../.env'})

const fetch = require('node-fetch')
const Sharp = require('sharp')
const db = require('../../app_api/models/db')
const LocalStorage = require('../../app_lib/LocalStorage')

//const container = new OVH()

class CopyImage {
	
	//static get rootPath() {
		//return `/${process.env.CONTAINER_NAME}/`
	//}
	
	constructor(id, container = new LocalStorage()) {
		this.ID = id
		this.STREAM = null
		this.METADATA = {}
		this.RECORD = {}
		this.container = container
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
		return db.Photo
			.findByPk(me.ID)
			.then(record => {
				if (!record) throw Error(`id: ${me.ID}. No record in database`)
				record = Object.assign(record, update);
				return record.save();
			})
			.then(record => db.Photo.findByPk(record.id))
			.then(record => {
				me.RECORD = record
				console.log(`id: ${me.ID}. Updating done`)
				return me
			})
	}
	
	/** @desc Copy image to OVH */
	async copyToContainer() {
		const me = this
		
		console.log(`id: ${me.ID}. Copy to container`)
		const remotepath = `uploads/${me.ID}.jpg`
		console.log("ME.STREAM " + (me.STREAM == null))
		return me.container.write(me.STREAM, remotepath)
			.then(output => {
				console.log(JSON.stringify(output))
				console.log(`id: ${me.ID}. Copied`)
				return me
			})
	}
	
	
}

module.exports = CopyImage

