/**
 * SpotairPict class for image processing (extending Sharp)
 * @module /app_lib/SpotairPict
 */ 
const debug = require('debug')('app:lib:SpotairPict')
const Sharp = require('sharp')
const probe = require('probe-image-size')
const imgType = require('./helpers').imgType
const buildLocalPath = require('./helpers').buildLocalPath

const LOCAL_STORAGE = (process.env.STORAGE === "LOCAL")

class SpotairPict extends Sharp {
	
	constructor(buffer) {
		super(buffer)
		this.buffer = buffer
	}

	/** 
	 * @function thumbnail
	 * @desc Resize the given picture to the height defined for thumbnails
	 * @return {SpotairPict} this
	 */
	thumbnail() {
		const resizeDim = {height: parseInt(process.env.THUMBNAIL_HEIGHT_PX)}
		return this.withMetadata().resize(resizeDim)
	}
	
	/** 
	 * @function normalize
	 * @desc Resize the given picture to the maximum dimension defined for spotair pictures
	 * @return {SpotairPict} this
	 */
	normalize() {
		const size = probe.sync(this.buffer)
		const largestDimension = (size.width > size.height)? 'width' : 'height'
		var resizeDim = {}
		resizeDim[largestDimension] = parseInt(process.env.PICTURE_MAX_LENGTH_PX)
		return this.withMetadata().resize(resizeDim)
	}
	
	/** 
	 * @function toPictureFile
	 * @desc Convert to file and save to the spotair Pictures location
	 */
	toPictureFile(id) {
		const target = buildLocalPath(id, imgType.picture)
		return this.toFile(target)
	}
	
	/** 
	 * @function toThumbnailFile
	 * @desc Convert to file and save to the spotair Thumbnails location
	 */
	toThumbnailFile(id) {
		const target = buildLocalPath(id, imgType.thumbnail)
		return this.toFile(target)
	}

}

module.exports = SpotairPict
