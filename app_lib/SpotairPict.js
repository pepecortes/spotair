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
var fs = require('fs')
const { registerFont, createCanvas } = require('canvas')

// Define the watermark height (as a factor of the total image height)
const watermark_height = 0.025

// Create the source logo image as a Sharp object
const logoBuffer = fs.readFileSync(`${process.env.APP_ROOT}app_lib/media/watermark_logo.jpg`)
const watermarkImg = new Sharp(logoBuffer)

// Register font for later use
	//registerFont( 'watermarkFont.ttf', { family: "WatermarkFont" } )

function createWatermarkText(dim, text) {
	const h = (watermark_height * dim.height) | 0 // convert to integer
  var canvas = createCanvas(dim.width, h);
	var ctx = canvas.getContext( '2d' );
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = `${h}px WatermarkFont`
	ctx.fillStyle = '#000000';
	ctx.fillText(text, 10, h)
	return {input: canvas.toBuffer(), top: (dim.height - 80), left: 0}
}

/**
 * @desc Creates the watermark spotair logo. Returns an object like
 * {input: buffer, top: integer, left: integer}
 * that is ready to be 'composited' with the main image
 * The logo height is a fraction of the main image height
 * The logo is resized, so the left location has to be computed to
 * with the new logo width if you want to push it to the far right
 * of the main image
 */
async function createWatermarkLogo(dim) {
	const h = (watermark_height * dim.height) | 0 // convert to integer
	const top = dim.height - h
	const resized = watermarkImg.resize({ height: h })
	return resized.toBuffer({ resolveWithObject: true })
		.then(({data, info}) => ({input: data, top: top, left: (dim.width - info.width)}))
}

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
		return this.metadata()
			.then(data => {
				const x = createWatermarkLogo(data)
				return [x]
			})
			
			//[, createWatermarkText(data, "HOLA KARAKOLA con golf")])
			.then(w => console.log(w))
			.then(w => this.withMetadata().composite(w))
		  .then(img => img.toBuffer())
		  .then(buffer => new SpotairPict(buffer))
		
		
		
		//var text = null
		//var logo = null
		//return this.metadata()
			//.then(data => {
				//text = createWatermarkText(data)
				//return createWatermarkLogo(data)
			//})
			//.then(x => {
				//logo = x				
				//return this.withMetadata().composite([logo, text])
		  //})
		  //.then(img => img.toBuffer())
		  //.then(buffer => new SpotairPict(buffer))
		  
		  
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
