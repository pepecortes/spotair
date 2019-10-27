/**
 * Vuejs mixin to manage user authorization
 * You need to add to your template a location for the messages.
 * Includes the following computed variables that you can use to
 * check user credentials:
 * 
 * loggedIn
 * isAdmin
 * isScreener
 * 
 */

module.exports.credentialsMixin = {
	
	name: "credentialsMixin",
	
	beforeMount() {this.getCurrentUser()},	
	
	data () {
		return {user: null}
	},
	
	computed: {
		loggedIn() {return this.user && this.user.id},
		isAdmin() {return this.user && this.user.isAdmin},
		isScreener() {return this.user && this.user.isScreener},
	},
	
	methods: {
		
		getCurrentUser() {
			var vm = this
			vm.axios.get(process.env.WEB_URL + 'profile') 
				// note that the call is NOT an API call
				.then(response => vm.user = response.data)
				.catch(err => this.$bvModal.msgBoxOk("Server error: " + err.message))
		},
		
	},
	
	
}
