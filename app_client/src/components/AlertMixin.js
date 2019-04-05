/**
 * Vuejs mixin to manage feedback messages
 * You need to add to your template a location for the messages.
 * Example:
 * 
 * 		b-alert(
 *			:variant="alert.type",
 *			dismissible,
 *			fade,
 *			:show="alert.show",
 * 			@dismissed="alert.show=false"
 *		) {{ alert.text }}
 * 
 */
 
/**
 * @function
 * @desc Axios error handling: returns the message that has to be presented to the client after an unsuccesful axios http call (see https://github.com/axios/axios)
 * @param {object} error - The error object catched by during an axios call
 * @returns {string} The message ready to be presented to the client
 */
function axiosErrorToString(error) {
	var output = ""
	if (error.response) {
		// The request was made and the server responded with a status code that falls out of the range of 2xx		
		output = error.response.data
  } else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
    output = "Server error: no response"
	} else {
		// Something happened in setting up the request that triggered an Error
		output = error.message
	}
	return JSON.stringify(output)
}

module.exports.alertMixin = {
	
	name: "alertMixin",
	
	data() {
		return {
			alert: {show: false, text: "", type: "warning"}
		}
	},
	
	methods: {
		
		// Displays a form alert/info message 
		showAlert(message="", type="warning") {
			this.alert = {show: true, text: message, type: type}
		},
		
		resetAlert() {
			this.alert = {show: false, text: "", type: "warning"}
		},
		
		showAxiosAlert(err, type="danger") {
			this.showAlert(axiosErrorToString(err), type)
		},
		
	},
	
}
