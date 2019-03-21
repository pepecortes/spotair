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
 
