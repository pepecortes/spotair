/**
 * Common constants
 * @module /app_lib/constants
 */

var exports = {};

/**
 * @constant
 * @desc describe several image types
 */
const imgType = {
	picture: 0,
	upload: 1,
	thumbnail: 2,	
}
exports.imgType = imgType

/**
 * @constant
 * @desc describe several search types
 */
const SearchType = {
	FTS: 0,
	ID: 1,
	RECENT: 2,
	RECENT_MODIFIED: 3,
}
exports.SearchType = SearchType

module.exports = exports;
