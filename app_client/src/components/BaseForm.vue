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
		
	b-form(v-if="toggleForm")
		b-button(variant="outline-warning" v-on:click="clearForm") X
		
		slot(name="inputs")
		
		b-button(type="button", variant="outline-warning", v-on:click="$emit('update')", v-if="!newRecord") Update
		b-button(type="button", variant="outline-danger", v-on:click="$emit('remove')", v-if="!newRecord") Delete
		b-button(type="button", variant="outline-primary", v-on:click="$emit('add')", v-if="newRecord") Add
		b-button(type="button", variant="outline-success", v-on:click="$emit('reset')") Reset
				
</template>

<script>
import { axiosErrorToString } from '../lib/common'
import VueSelect from 'vue-select'

export default {
	
	props: {
		api: {
			// path to build the root of API calls (example: "aerodromes")
			default: "",
			type: String
		}
	},
	
	components: {
		'v-select': VueSelect
	},
	
	data () {
		return {
			selectOptions: [],
			selection: null, // the original selection, in case you need to reset
			alert: {show: false, text: "", type: "warning"},
			toggleForm: false,
			newRecord: false,
			apiPath: process.env.API_URL + this.api,
		}
	},

	created () {this.getSelectOptions()},

	methods: {
				
		// Init the form with the given selection. Display controls
		// for update/delete or add depending on the boolean newRecord
		initForm(selection, newRecord = false) {
			if (!selection) return
			this.$emit('selection', selection)
			this.selection = JSON.parse(JSON.stringify(selection))
			this.newRecord = newRecord
			this.toggleForm = true
		},
		
		// Hide the form, refresh the selector and display it
		showSelector() {
			this.getSelectOptions()
			this.toggleForm = false
		},
		
		// Displays a form alert/info message 
		showAlert(message="", type="warning") {
			this.alert = {show: true, text: message, type: type}
		},
		
		clearForm() {
			this.alert = {show: false, text: "", type: "warning"}
			this.showSelector()
		},
		
		// Create a fresh form ready for adding new data
		newForm() {
			var vm = this
			this.axios.get(vm.apiPath +'/fresh')
				.then(response => vm.initForm(response.data, true))
				.catch(err => vm.alert = {show: true, text: axiosErrorToString(err), type: "danger"})
		},
		
		getSelectOptions() {
			var vm = this;
			this.axios.get(vm.apiPath)
				.then(response => vm.selectOptions = response.data)
				.catch(err => vm.alert = {show: true, text: axiosErrorToString(err), type: "danger"})
		},    
		
		// Reset the form values to the initial selection
		reset() {
      this.initForm(this.selection, this.newRecord)
    },
    
    remove(formData, apiURL) {
			var vm = this
			const url = apiURL + formData.id
			vm.axios.delete(url)
				.then(function(response) {
					vm.showAlert("Removed: " + formData.text, "success")
					vm.showSelector()
				})
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
		
	}
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
