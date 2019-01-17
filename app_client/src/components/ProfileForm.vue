<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		h3 User profile: {{ user.text }}

</template>

<script>
import { alertMixin } from './AlertMixin'
import { axiosErrorToString } from '../lib/common'

//import BaseForm from './BaseForm.vue'
//import { required, decimal, between } from "vuelidate/lib/validators"

//// Check that both latitude and longitud are present or neither
//const bothCoordinates = (value, vm) => 
	//(vm.latitude && vm.longitude) || (!vm.latitude && !vm.longitude);

export default {
	
	name: "ProfileForm",
	
	// Mixin for the alert messages
	mixins: [alertMixin],
	
	data () {
		return {
			user: {},
			//validations: {
				//nom: {required},
				//lieu: {required},
				//latitude: {decimal, between: between(-90, 90), bothCoordinates},
				//longitude: {decimal, between: between(-180, 180), bothCoordinates},
			//},
		}
	},
	
	mounted () {this.getCurrentUser()},
	
	methods: {
		
		// gets the current logged user by requesting the session data
		getCurrentUser() {
			this.user = {text: "donpepe, cortex"}
			var vm = this
			this.axios.get('/profile')
				.then(response => {vm.user = response.data})
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		}
	},
	
}

</script>
