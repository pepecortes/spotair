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

//const container = new OVH()

class CopyImage extends SpotairPict {
	
	constructor(id) {
		super()
		this.id = id
		const url = `http://spotair.org/repupload/original/${this.id}.jpg`
		return fetch(url)
			.then(res => {res.body.pipe(this); return this})
			//.then(res => res.body.pipe(this))
			//.then(() => this.metadata())
			//.then(data => {this._metadata = data; return this})
	}
	
	/** @desc Update the pictures database with the image dimensions */
	async updateDatabase() {
		console.log(`id: ${this.id}. Updating database`)
		var p1 = this.dimensions()
		var p2 = db.Photo.findByPk(this.id)
		Promise.all([p1, p2])
			.then(([dimensions, record]) => {
				if (!record) throw Error(`id: ${this.id}. No record in database`)
				record = Object.assign(record, dimensions)
				return record.save()
			})
			.then(record => db.Photo.findByPk(record.id))
			.then(record => {
				console.log(`id: ${this.id}. Updating done`)
				return this
			})
	}
	
	///** @desc Copy image to OVH */
	//async copyToContainer(container = new LocalStorage()) {
		//console.log(`id: ${me.ID}. Copy to container`)
		//const remotepath = `uploads/${this.id}.jpg`

		//return container.write(me.STREAM, remotepath)
			//.then(output => {
				//console.log(JSON.stringify(output))
				//console.log(`id: ${me.ID}. Copied`)
				//return me
			//})
	//}
	
	
}

module.exports = CopyImage

