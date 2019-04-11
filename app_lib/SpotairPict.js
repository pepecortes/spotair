/**
 * SpotairPict class for image processing (extending Sharp)
 * @module /app_lib/SpotairPict
 */ 
const debug = require('debug')('app:lib:SpotairPict')
const Sharp = require('sharp')
const probe = require('probe-image-size')
const imgType = require('./helpers').imgType
const buildLocalPath = require('./helpers').buildLocalPath
const buildOVHPath = require('./helpers').buildOVHPath

const LOCAL_STORAGE = (process.env.STORAGE === "LOCAL")


// TBC DRY: ALL this is already on storage.js--------------------------
var OVHStorage = require('node-ovh-storage')
var configOVH = {
	username:	process.env.OVH_USERNAME,
	password:	process.env.OVH_PASSWORD,
	authURL:	process.env.OVH_AUTH_URL,
  tenantId: process.env.OVH_TENTANT_ID,
  region: 	process.env.OVH_REGION
}
const containerOVH = new OVHStorage(configOVH)
function getOVHToken(container) {
	return new Promise((resolve, reject) => container.getToken((err, data) => {
		if (err !== null) reject(err)
		else resolve(data)
	}))
}
// support function: converts containerOVH.putStream into a promise
function putFilePromise(stream, target) {
	return new Promise((resolve, reject) =>
		containerOVH.putStream(stream, target, (err, data) => {
			if (err !== null) reject(err)
			else resolve(data)
		}))
}
//----------------------------------------------------------------------

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
		if (LOCAL_STORAGE) {
			const target = buildLocalPath(id, imgType.thumbnail)
			return this.toFile(target)
		}
		// TBC: HOW CAN i return the size of the created image?
		const target = buildOVHPath(id, imgType.thumbnail)
		return getOVHToken(containerOVH)
			.then(() => Promise.all([
																this.metadata(),
																putFilePromise(this, target)
															]))
	}

}

module.exports = SpotairPict
