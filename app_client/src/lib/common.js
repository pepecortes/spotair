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

/**
 * @function
 * @desc Axios error handling: returns the message that has to be presented to the client after an unsuccesful axios http call (see https://github.com/axios/axios)
 * @param {object} error - The error object catched by during an axios call
 * @returns {string} The message ready to be presented to the client
 */
export function axiosErrorToString(error) {
	var output = ""
	if (error.response) {
		// The request was made and the server responded with a status code that falls out of the range of 2xx
		output = error.response.data
  } else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
    output = error.request
	} else {
		// Something happened in setting up the request that triggered an Error
		output = error.message
	}
	return JSON.stringify(output)
}
 
