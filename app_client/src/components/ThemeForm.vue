<template lang="pug">

div#galerieForm
	base-form(
		ref="baseForm",
		:api="api",
		v-on:selection="dataSelected",
		v-on:update="clickMe",
		v-on:remove="remove", 
		v-on:add="add", 
		v-on:reset="reset",
	)
		template(slot="inputs")
			b-form-group(
				label="Theme",
				label-for="theme",
				:invalid-feedback="formData.invalid.theme",
				:state="checkValidityState($v.formData.theme)"
			)
				b-form-input(
					id="theme",
					type="text",
					v-model.trim="formData.theme",
					:state="checkValidityState($v.formData.theme)"
				)

</template>

<script>
import BaseForm from './BaseForm.vue'
import { validationMixin } from 'vuelidate'
import { required } from "vuelidate/lib/validators"
import { confirmDialog, axiosErrorToString } from '../lib/common'
import pluralize from 'pluralize'

export default {
	
	components: {
		'base-form': BaseForm
	},
	
	data () {
		return {
			model: "theme",
			formData: {invalid:{}},
		}
	},
	
	computed: {
		models () {return pluralize(this.model)},
		api () {return this.models},
		apiURL () {return process.env.API_URL + this.api + "/"}
	},
	
	methods: {
		
		dataSelected(selection) {
			this.formData = selection
			this.$v.$reset()
		},
		
		clickMe() {
			console.log("CLIKED")
			console.log("api: " + this.api)
		},
	
		// Return the validity state or null if the input is untouched
		checkValidityState(input) {
			return (input.$dirty)? !input.$invalid : null
		},
		
		// Reset the form to the initial selection
		reset() {
			this.$refs.baseForm.reset()
			this.$v.$reset()
		},
    
    add() {
			var vm = this
      vm.$v.$touch()
      if (vm.$v.$invalid) return
			this.axios.post(vm.apiURL, vm.formData)
				.then(function(response) {
					vm.$refs.baseForm.showAlert("Created: " + response.data.text, "success")
					vm.$refs.baseForm.showSelector()
				})
				.catch(err => vm.alert = {show: true, text: axiosErrorToString(err), type: "danger"})
		},
    
    remove() {
      if (!confirmDialog("confirm removal?")) return
      this.$v.$touch()
      this.$refs.baseForm.remove(this.formData, this.apiURL)
		},
		
	},
	
	mixins: [validationMixin],
	
	validations: {
		formData: {
			theme: {required},
    }
	}
	
}
</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
