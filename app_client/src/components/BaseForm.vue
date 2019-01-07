<template lang="pug">
	include BaseForm.pug
</template>

<script>
import VueSelect from 'vue-select'
import pluralize from 'pluralize'
import { validationMixin } from 'vuelidate'
import { confirmDialog, axiosErrorToString } from '../lib/common'

export default {
	
	components: {
		'v-select': VueSelect
	},
	
	data () {
		return {
			formData: null,
			selectOptions: [],
			selection: null, // the original selection, in case you need to reset
			alert: {show: false, text: "", type: "warning"},
			validations: {}, // overriden by each form validations object
		}
	},
	
	watch: {
    // monitor changes on selection
    selection() {this.initForm()}
  },
	
	computed: {
		models () {return pluralize(this.model)},
		api () {return this.models},
		apiURL () {return process.env.API_URL + this.api + "/"}
	},

	mounted () {this.getSelectOptions()},

	methods: {
	
		// Return the validity state or null if the input is untouched
		checkValidityState(input) {
			return (input.$dirty)? !input.$invalid : null
		},
		
				
		// Init the form with the given selection and reset validators
		initForm() {
			this.formData = JSON.parse(JSON.stringify(this.selection))
			this.$v.$reset()
		},
		
		// Displays a form alert/info message 
		showAlert(message="", type="warning") {
			this.alert = {show: true, text: message, type: type}
		},
		
		newClicked() {
			this.selection = null
			this.newForm()
		},
		
		modifyClicked() {
			this.getSelectOptions()
		},
		
		fusionClicked() {
			this.getSelectOptions()
		},
		
		// Create a fresh form ready for adding new data
		newForm() {
			var vm = this
			this.axios.get(vm.apiURL + 'fresh')
				.then(response => {vm.selection = response.data})
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
		
		// Get all the available options for the SELECT control
		getSelectOptions() {
			var vm = this;
			vm.selection = null
			this.axios.get(vm.apiURL)
				.then(response => vm.selectOptions = response.data)
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},  
    
    removeButtonClicked() {
      if (!confirmDialog("confirm removal?")) return
      this.remove()
		},
    
    addButtonClicked() {
			this.add()
		},
		
		resetButtonClicked() {
			this.reset()
		},
		
		updateButtonClicked() {
      if (!confirmDialog("confirm update?")) return
      this.update()
		},
    
    // Reset the form to the initial selection
		reset() {
      this.initForm()
		},
    
    // Remove the data given by its id
    remove() {
			var vm = this
      this.$v.$touch()
			const url = vm.apiURL + vm.formData.id
			vm.axios.delete(url)
				.then(function(response) {
					vm.showAlert("Removed: " + vm.formData.text, "success")
					vm.getSelectOptions()
				})
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
		
		// Add the form data to the database
    add() {
			var vm = this
      this.$v.$touch()
      if (this.$v.$invalid) return
			vm.axios.post(vm.apiURL, vm.formData)
				.then(function(response) {
					vm.showAlert("Created: " + response.data.text, "success")
				})
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
		
		// Update the form data on the database
		update() {
			var vm = this
      this.$v.$touch()
      if (this.$v.$invalid) return
			const url = vm.apiURL + vm.formData.id
			vm.axios.put(url, vm.formData)
				.then(function(response) {					
					vm.showAlert("Updated: " + response.data.text, "success")
				})
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
    },
		
	},
	
	// Mixin for validation. It will not have any effect without definition
	// of a 'validations' object (vuelidate)
	mixins: [validationMixin],
	
	validations() {
		return {
			formData: this.validations
		}
	}
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
