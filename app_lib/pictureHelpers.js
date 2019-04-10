/**
 * Common helpers functions related to image processing
 * @module /app_lib/pictureHelpers
 */ 
const debug = require('debug')('app:lib:imageHelpers')
const Sharp = require('sharp')
const probe = require('probe-image-size')

var exports = {};

class SpotairPict extends Sharp {
	
	constructor(buffer) {
		super(buffer)
		this.buffer = buffer
	}

	thumbnail() {
		var resizeDim = {height: process.env.THUMBNAIL_HEIGHT_PX}
		return this.withMetadata().resize({height: 200})
	}
	
	normalize() {
		const size = probe.sync(bufferInput)
		const largestDimension = (size.width > size.height)? 'width' : 'height'
		var resizeDim = {}
		resizeDim[largestDimension] = maxLength
		const bufferOutput = new Sharp(bufferInput)
												.withMetadata()
												.resize(resizeDim)
												.toBuffer()
		return bufferOutput
	}

}

exports.SpotairPict = SpotairPict

/** 
 * @function normalizePicture
 * @desc Resize the given picture to the maximum dimension defined for spotair pictures
 * @param {Buffer} bufferInput
 * @param {Integer} maxLength - max number of px for the output (width or height)
 * @return {Buffer} bufferOutput
 */
exports.normalizePicture = async function(bufferInput, maxLength = process.env.PICTURE_MAX_LENGTH_PX) {
	const size = probe.sync(bufferInput)
	const largestDimension = (size.width > size.height)? 'width' : 'height'
	var resizeDim = {}
	resizeDim[largestDimension] = maxLength
	const bufferOutput = new Sharp(bufferInput)
											.withMetadata()
											.resize(resizeDim)
											.toBuffer()
	return bufferOutput
}

/** 
 * @function createThumbnail
 * @desc Resize the given picture to the height defined for thumbnails
 * @param {Buffer} bufferInput
 * @return {Buffer} bufferOutput
 */
exports.createThumbnail = async function(bufferInput) {
	var resizeDim = {height: process.env.THUMBNAIL_HEIGHT_PX}
	debug("resizeDim " + JSON.stringify(resizeDim))
	const bufferOutput = new Sharp(bufferInput)
											.withMetadata()
											.resize({height: 200})
											.toBuffer()
	return bufferOutput
}

module.exports = exports
