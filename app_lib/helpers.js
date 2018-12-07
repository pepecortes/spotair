/**
 * Common helpers functions
 * @module /app_lib/helpers
 */

/**
 * Builds an object out of another by picking only the selected properties 
 * @param {Object} object - The input object
 * @param {string[]} arrayOfProperties - The array of the properties you want to pick up
 * @returns {Object} Returns an object containing the selected properties only
 * @example
 * pickObject({a: 1, b: 2, c: 3}, ['a', 'b']) = {a: 1, b: 2}
 */
module.exports.pickObject = function(object, arrayOfProperties) {
	var output = {};
	for (const p of arrayOfProperties) {
		if (object[p]) output[p] = object[p];
	}
	return output;
}
