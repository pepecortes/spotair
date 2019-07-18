/**
 * @function
 * @desc Replace the javascript confirm() function by your own dialog box.
 * (notice that, for the time being, we just use the javascript confirm function
 * @param {string} msg - The message to display in the dialog
 * @returns {boolean} True if the user pressed OK. False otherwise 
 */
export function confirmDialog(msg) {
	return confirm(msg)
}


/**
 * @function
 * @desc Convert a photo model into an element ready to be inserted into a picture slider
 * @param {Object} photo
 * @returns {Object} Object with all the fields needed to feed the slider
 */
export function photoToImgData(photo) {
	var imgData = {}
	const urls = pictureURLs(photo)
	imgData.src = urls.picture
	imgData.thumbnail = urls.thumbnail
	imgData.w = photo.width
	imgData.h = photo.height
	return imgData
}

/**
 * @function
 * @desc Return the URLs pointing to the photo
 * @param {Object} photo
 * @returns {Object} {picture:, thumbail:}
 */
export function pictureURLs(photo) {
	var urls = {}
	urls.picture = `${process.env.STORAGE_URL}pictures/${photo.id}.jpg`
	urls.thumbnail = `${process.env.STORAGE_URL}thumbnails/${photo.id}.jpg`
	return urls
}

/**
 * @function centeredSlice
 * @desc Slice the array returning a copy symmetrically centered on
 * the given element. Consider the given array as circular
 * @param {Integer} center	-	index to be the center of the new array
 * @param {Integer} radius	- number of elements to take, both left and right
 * @returns {Array} A copy of the original array
 */
export function centeredSlice(array, center=0, radius=1) {

	function concatNTimes(array, n, output = []) {
		if (n <= 0) return output
		const x = output.concat(array)
		return concatNTimes(array, n-1, x)
	}
	
	radius = Math.abs(radius)
	const l = array.length
	center = center % l
	const n_float = _.max([(radius-center)/l, (radius+center)/l])
	const n = _.ceil(n_float)
	const extendedArray = concatNTimes(array, (2*n + 1))
	let LH = center - radius + n*l
	let RH = center + radius + 1 + n*l
	return extendedArray.slice(LH, RH)
}
 
