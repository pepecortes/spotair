/**
 * SpotairPict class for image processing (extending Sharp)
 * @module /app_lib/SpotairPict
 */ 
const debug = require('debug')('app:lib:SpotairPict')
const Sharp = require('sharp')
const probe = require('probe-image-size')
const imgType = require('./helpers').imgType
const buildLocalPath = require('./helpers').buildLocalPath
const exifParser = require('exif-parser')

const OVH = require('./OVH')

var containerOVH
const LOCAL_STORAGE = (process.env.STORAGE === "LOCAL")
if (!LOCAL_STORAGE) containerOVH = new OVH()

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
	 * @function size
	 * @desc Returns the dimensions of the image
	 * @return {Object} {height: px, width: px}
	 */
	dimensions() {
		return this.toBuffer().then(buffer => exifParser.create(buffer).parse().getImageSize())
	}

	/** 
	 * @function toPictureFile
	 * @desc Convert to file and save to the spotair Pictures location
	 * @param {Integer} id - used to name the output picture
	 * @returns {Object} Containing the size of the output picture
	 */
	toPictureFile(id) {
		if (LOCAL_STORAGE) {
			const target = buildLocalPath(id, imgType.picture)
			return this.toFile(target)
		}
		// OVH storage
		// TBC------------------------
		const p1 = this.dimensions()
		const p2 = containerOVH.writePicture(this, id)
		return Promise.all([p1, p2]).then(([r1, r2]) => r1)
	}
	
	/** 
	 * @function toThumbnailFile
	 * @desc Convert to file and save to the spotair Thumbnails location
	 */
	toThumbnailFile(id) {
		if (LOCAL_STORAGE) {
			const target = buildLocalPath(id, imgType.thumbnail)
			return this.toFile(target)
		}
		// OVH storage
		return containerOVH.writeThumbnail(this, id)
	}

}

module.exports = SpotairPict
