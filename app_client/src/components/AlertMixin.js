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
		}
	},
	
}
