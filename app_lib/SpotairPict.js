/**
 * SpotairPict class for image processing (extending Sharp)
 * @module /app_lib/SpotairPict
 */ 
const debug = require('debug')('app:lib:SpotairPict')
const Sharp = require('sharp')
const fetch = require('node-fetch')
const OVH = require('./OVH')
const LocalStorage = require('./LocalStorage')
const stream = require('stream')
const probe = require('probe-image-size')

const container = (process.env.STORAGE === "LOCAL")? new LocalStorage() : new OVH()

class SpotairPict extends Sharp {
	
	constructor(buffer) {
		if (buffer) super(buffer)
		else super()
		this.buffer = buffer
	}
	
	async readFromURL(url) {
		const me = this
		return fetch(url)
			.then(res => {res.body.pipe(me); return me})
	}

	/** 
	 * @function thumbnail
	 * @desc Resize the given picture to the height defined for thumbnails
	 * @return {SpotairPict} resized picture with updated metadata
	 */
	async thumbnail() {
		const resizeDim = {height: parseInt(process.env.THUMBNAIL_HEIGHT_PX)}
		return this._resize(resizeDim)
	}
	
	/** 
	 * @function normalize
	 * @desc Resize the given picture to the maximum dimension defined for spotair pictures
	 * @return {SpotairPict} resized picture with updated metadata
	 */
	async normalize() {
		return this.metadata()
			.then(data => (data.width > data.height)? 'width' : 'height')
			.then(largestDimension => {
				var resizeDim = {}
				resizeDim[largestDimension] = parseInt(process.env.PICTURE_MAX_LENGTH_PX)
				return resizeDim
			})
			.then(resizeDim => this._resize(resizeDim))
	}
	
	/**
	 * @desc Blend a watermark into this image
	 */
	async watermark() {
		const waterImg = {input: 'spotair_logo.jpg'} 
		return this.metadata()
			.then(data => {
				waterImg.top = data.height - 80
				waterImg.left = data.width - 257
				return this.withMetadata().composite([waterImg])
		  })
		  .then(img => img.toBuffer())
		  .then(buffer => new SpotairPict(buffer))
	}
	
	/**
	 * @function a Sharp resize function that ensures that metadata is
	 * correctly considered (in particular height and width)
	 */
	async _resize(dim) {
		const resized = this.withMetadata().resize(dim)
		return resized.toBuffer().then(buffer => new SpotairPict(buffer))
	}
	
	/** 
	 * @function size
	 * @desc Returns the dimensions of the image after probing it (instead of metadata)
	 * @return {Promise} {height: px, width: px}
	 */
	async dimensions() {
		return probe(this)
	}

	/** 
	 * @function toPictureFile
	 * @desc Convert to file and save to the spotair Pictures location
	 * @param {Integer} id - used to name the output picture
	 * @param {Container} forceContainer - to use a different container than the environment set
	 * @returns {SpotairPict} This object
	 */
	toPictureFile(id, forceContainer = false) {
		const cont = (forceContainer)? forceContainer : container
		return this.toBuffer()
			.then(buffer => cont.writePicture(buffer, id))
			.then(() => this)
	}
	
	/** 
	 * @function toThumbnailFile
	 * @desc Convert to file and save to the spotair Thumbnails location
	 */
	toThumbnailFile(id, forceContainer = false) {
		const cont = (forceContainer)? forceContainer : container
		return this.toBuffer()
			.then(buffer => cont.writeThumbnail(buffer, id))
			.then(() => this)
	}
	
	/** 
	 * @function toUploadsFile
	 * @desc Convert to file and save to the spotair Uploads location
	 */
	toUploadsFile(id, forceContainer = false) {
		const cont = (forceContainer)? forceContainer : container
		return this.toBuffer()
			.then(buffer => cont.writeUploaded(buffer, id))
			.then(() => this)
	}

}

module.exports = SpotairPict
