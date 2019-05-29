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
		this.photo = null
		
		const url = source + this.id + '.jpg'
		return db.Photo.findByPk(this.id, {include: [{all:true, nested:true}]})
			.then(instance => {
				if (!instance) throw new Error(`No record in database`)
				else this.photo = instance
			})
			.then(() => fetch(url))
			.then(res => {res.body.pipe(this); return this})
	}
	
	/** @desc Update the photos database with the given dimensions */
	async updateDatabase(dim) {
		this.photo.height = dim.height
		this.photo.width = dim.width
		return this.photo.save()
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
		
		const p2 = this.toBuffer()
			.then(buffer => new SpotairPict(buffer))
			.then(img => img.normalize())
			.then(img => img.watermark(this.photo.caption))
			.then(img => Promise.all([img.dimensions(), img.toPictureFile(this.id, this.container)]))
			.then(([dim, x]) => this.updateDatabase(dim))
	
		const p3 = this.toBuffer()
			.then(buffer => new SpotairPict(buffer))
			.then(img => img.thumbnail())
			.then(img => img.toThumbnailFile(this.id, this.container))
	
		return Promise.all([p1, p2, p3])
			.then(() => this)
	}
	
}

module.exports = CopyImage

