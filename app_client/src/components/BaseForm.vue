<template lang="pug">
div.baseForm

	b-alert(
		:variant="alert.type",
		dismissible,
		fade,
		:show="alert.show",
		@dismissed="alert.show=false",
	) {{ alert.text }}
	
	div(v-if="!toggleForm")
		v-select(:options="selectOptions", label="text", @input="initForm")
			span(slot="no options") Aucun résultat
		b-button(variant="outline-success", v-on:click="newForm") New
		
	b-form(@submit="update", @reset="reset", v-if="toggleForm")
		b-button(variant="outline-warning" v-on:click="clearForm") X
		
		slot(name="inputs", :formData='formData', :$v='$v', :checkValidityState='checkValidityState')
		
		b-button(type="submit", variant="outline-warning", v-if="!newRecord") Update
		b-button(type="button", variant="outline-danger", v-on:click="remove", v-if="!newRecord") Delete
		b-button(type="button", variant="outline-primary", v-on:click="add", v-if="newRecord") Add
		b-button(type="reset", variant="outline-success") Reset
				
</template>

<script>
import { confirmDialog, axiosErrorToString } from '../lib/common'
import { validationMixin } from 'vuelidate'
import { required, decimal, between } from "vuelidate/lib/validators"
import VueSelect from 'vue-select'

// Check that both latitude and longitud are present or neither
const bothCoordinates = (value, vm) => 
	(vm.latitude && vm.longitude) || (!vm.latitude && !vm.longitude);

export default {
	
	props: {
		api: {
			// path to build the root of API calls (example: "aerodromes")
			default: "",
			type: String
		},
	},
	
	components: {
		'v-select': VueSelect
	},
	
	data () {
		return {
			selectOptions: [],
			formData: null, // the data being edited
			formDataBak: null, // the original selection, in case you need to reset
			alert: {show: false, text: "", type: "warning"},
			toggleForm: false,
			newRecord: false,
			apiPath: process.env.API_URL + this.api,
		}
	},

	created () {this.getSelectOptions()},

	methods: {
		
		// Return the validity state or null if the input is untouched
		checkValidityState(input) {
			return (input.$dirty)? !input.$invalid : null
		},
		
		// Init the form with the given selection. Display controls
		// for update/delete or add depending on the boolean newRecord
		initForm(selection, newRecord = false) {
			if (!selection) return
			this.formData = JSON.parse(JSON.stringify(selection))
			this.formDataBak = JSON.parse(JSON.stringify(selection))
			this.newRecord = newRecord
			this.toggleForm = true
			this.$v.$reset()
		},
		
    // Reset the form values to the initial selection
		reset(evt) {
      this.initForm(this.formDataBak, this.newRecord)
    },
		
		// Hide the form, refresh the selector and display it
		showSelector() {
			this.getSelectOptions()
			this.toggleForm = false
		},
		
		clearForm() {
			this.alert = {show: false, text: "", type: "warning"}
			this.showSelector()
		},
		
		// Create a fresh form ready for adding new data
		newForm() {
			this.formData = {nom: "nom", lieu: "lieu"}
			var vm = this
			this.axios.get(process.env.API_URL + 'aerodromes/fresh')
				.then(response => vm.initForm(response.data, true))
				.catch(err => vm.alert = {show: true, text: JSON.stringify(err), type: "danger"})
		},
		
		getSelectOptions() {
			var vm = this;
			//this.axios.get(process.env.API_URL + 'aerodromes')
			this.axios.get(vm.apiPath)
				.then(response => vm.selectOptions = response.data)
				.catch(err => vm.alert = {show: true, text: axiosErrorToString(err), type: "danger"})
		},
		
		update(evt) {
			var vm = this;
      evt.preventDefault()
      if (!confirmDialog("confirm update?")) return
      vm.$v.$touch()
      if (vm.$v.$invalid) {
				return
			}
			const url = process.env.API_URL + 'aerodromes/' + vm.formData.id
			this.axios.put(url, vm.formData)
				.then(function(response) {
					vm.alert = {
						show: true,
						text: "Updated: " + response.data.text,
						type: "success"
					}
					vm.showSelector()
				})
				.catch(err => vm.alert = {show: true, text: axiosErrorToString(err), type: "danger"})
    },
    
    remove(evt) {
			var vm = this;
      evt.preventDefault()
      if (!confirmDialog("confirm removal?")) return
      vm.$v.$touch()
			const url = process.env.API_URL + 'aerodromes/' + vm.formData.id
			this.axios.delete(url)
				.then(function(response) {
					vm.alert = {
						show: true,
						text: "Removed: " + vm.formData.text,
						type: "success"
					}
					vm.showSelector()
				})
				.catch(err => vm.alert = {show: true, text: axiosErrorToString(err), type: "danger"})
		},
    
    add(evt) {
			var vm = this;
      evt.preventDefault()
      vm.$v.$touch()
      if (vm.$v.$invalid) {
				return
			}
			const url = process.env.API_URL + 'aerodromes/'
			this.axios.post(url, vm.formData)
				.then(function(response) {
					vm.alert = {
						show: true,
						text: "Created: " + response.data.text,
						type: "success"
					}
					vm.showSelector()
				})
				.catch(err => vm.alert = {show: true, text: axiosErrorToString(err), type: "danger"})
		},
		
	},
	
	mixins: [validationMixin],
	
	validations: {
		formData: {
			nom: {required},
			lieu: {required},
			latitude: {decimal, between: between(-90, 90), bothCoordinates},
			longitude: {decimal, between: between(-180, 180), bothCoordinates},
    }
	}
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
