/**
 * @function
 * @desc Replace the javascript confirm() function by your own dialog box.
 * (notice that, for the time being, we just use the javascript confirm function
 * @param {string} msg - The message to display in the dialog
 * @returns {boolean} True if the user pressed OK. False otherwise 
 */
export function confirmDialog(msg) {
	return confirm(msg)
};
