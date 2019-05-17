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
const SpotairPict = require('../../app_lib/SpotairPict')

class CopyImage extends SpotairPict {
	
	constructor(id, source, container = new LocalStorage()) {
		super()
		this.id = id
		this.container = container
		this.source = source
		const url = source + this.id + '.jpg'
		return fetch(url)
			.then(res => {res.body.pipe(this); return this})
	}
	
	/** @desc Update the pictures database with the image dimensions */
	async updateDatabase() {
		var p1 = this.dimensions()
		var p2 = db.Photo.findByPk(this.id)
		Promise.all([p1, p2])
			.then(([dimensions, record]) => {
				if (!record) throw Error(`id: ${this.id}. No record in database`)
				record = Object.assign(record, dimensions)
				return record.save()
			})
			.then(record => db.Photo.findByPk(record.id))
			.then(record => this)
	}
	
	/** @desc migrate image and data to spotair
	 * copy img to uploaded
	 * normalize img
	 * copy to pictures
	 * update database
	 * create thumbnail
	 * copy to thumbnails
	 */
	async migrate() {
		const p1 = this.toUploadsFile(this.id, this.container)
		
		const p2 = this.normalize()
			.then(img => img.toPictureFile(this.id, this.container))
			.then(img => img.updateDatabase())
	
		const p3 = this.thumbnail()
			.then(img => img.toThumbnailFile(this.id, this.container))
	
		return Promise.all([p1, p2, p3])
			.then(() => this)
	}
	
	
}

module.exports = CopyImage

