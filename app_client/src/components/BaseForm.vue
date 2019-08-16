<template lang="pug">
	include BaseForm.pug
</template>

<script>
import VueSelect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import pluralize from 'pluralize'
import { validationMixin } from 'vuelidate'
import { confirmDialog } from '../lib/common'
import { required } from "vuelidate/lib/validators"
import { alertMixin } from './AlertMixin'

const	localRouter = {"modify": 0, "new": 1,	"fusion": 2}

export default {
	
	components: {
		'v-select': VueSelect
	},
	
	props: {
		initialTab: {
			type: Number,
			default: 0
		},
	}, 
	
	data () {
		return {
			formData: null,
			selectOptions: [],
			selection: null, // the original selection, in case you need to reset
			fusionTarget: null, // self-explanatory
			validations: {}, // overriden by each form validations object
			tabIndex: this.initialTab, // the index of the selected tab (0-based)
			isLoading: false, // while the ajax call is in progress...
		}
	},
	
	watch: {
    // monitor changes on selection
    selection() {this.initForm()}
  },
	
	computed: {
		models () {return pluralize(this.model)},
		apiURL () {return this.models + "/"}
	},
	
	beforeMount () {
		if (this.$route && this.$route.params.tab) this.tabIndex = localRouter[this.$route.params.tab]
		switch(this.tabIndex) {
			case 1:
				this.newClicked()
				break;
			case 2:
				this.fusionClicked()
				break;
			default:
				this.modifyClicked()
		}
	},

	methods: {
	
		// Return the validity state or null if the input is untouched
		checkValidityState(input) {
			return (input.$dirty)? !input.$invalid : null
		},
				
		// Init the form with the given selection and reset validators
		initForm() {
			this.formData = JSON.parse(JSON.stringify(this.selection))
			this.fusionTarget = null
			this.$v.$reset()
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
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		// Get all the available options for the SELECT control
		getSelectOptions(preselected) {
			var vm = this
			vm.selectOptions = []
			vm.selection = null
			vm.isLoading = true
			const partialStep = 5000 // split the api call to 5000 records each time
			
			async function partialQuery(limit, offset) {
				return vm.axios.get(`${vm.apiURL}partial/${limit}/${offset}`)
					.then(response => {
						const result = response.data
						vm.selectOptions.push.apply(vm.selectOptions, result)
						if (result.length < limit) return false
						else return partialQuery(limit, offset + limit)
					})
			}
			
			partialQuery(partialStep, 0)
				.then(() => {
					vm.selection = (preselected)? preselected : vm.selection
					vm.isLoading = false
				})
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},  
    
    removeButtonClicked() {
      if (!confirmDialog("confirmer élimination ?")) return
      this.remove()
		},
    
    addButtonClicked() {
			this.add()
		},
		
		resetButtonClicked() {
			this.reset()
		},
		
		updateButtonClicked() {
      if (!confirmDialog("confirmer modification ?")) return
      this.update()
		},
		
		fusionButtonClicked() {
      if (!confirmDialog("confirmer fusion ?")) return
      this.fusion()
		},
    
    // Reset the form to the initial selection
		reset() {
      this.initForm()
		},
    
    // Remove the data given by its id
    remove() {
			var vm = this
      this.$v.formData.$touch()
			const url = vm.apiURL + vm.formData.id
			vm.axios.delete(url)
				.then(function(response) {
					vm.$emit('record-removed', response.data)
					vm.showAlert("Removed: " + vm.formData.text, "success")
					vm.getSelectOptions()
				})
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		// Add the form data to the database
    add() {
			var vm = this
      vm.$v.formData.$touch()
      if (vm.$v.formData.$invalid) return
			vm.axios.post(vm.apiURL, vm.formData)
				.then(function(response) {
					vm.$emit('record-added', response.data)
					vm.showAlert("Created: " + response.data.text, "success")
					vm.newForm()
				})
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		// Update the form data on the database
		update() {
			var vm = this
      this.$v.formData.$touch()
      if (this.$v.formData.$invalid) return
			const url = vm.apiURL + vm.formData.id
			vm.axios.put(url, vm.formData)
				.then(function(response) {		
					vm.$emit('record-updated', response.data)			
					vm.showAlert("Updated: " + response.data.text, "success")
					vm.getSelectOptions(response.data)
				})
				.catch(err => vm.showAxiosAlert(err, "danger"))
    },
    
    // Fusion: all references to the selection will be changed to the targetFusion
    fusion() {
			var vm = this
      this.$v.fusionTarget.$touch()
      if (this.$v.fusionTarget.$invalid) return
			const url = vm.apiURL + `fusion/source/${vm.formData.id}/destination/${vm.fusionTarget.id}`
			vm.axios.put(url)
				.then(function(response) {
					vm.$emit('record-fusion', response.data)
					vm.showAlert(`Fusion OK: updated ${response.data.updated}, removed: ${vm.formData.text}`, "success")
					vm.getSelectOptions()
				})
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
    
	},
	
	// Mixin for validation. It will not have any effect without definition
	// of a 'validations' object (vuelidate)
	// Mixin for the alert messages
	mixins: [validationMixin, alertMixin],
	
	validations() {
		// Validity checks for the fusion target
		const differentThanSource = (value, vm) => (vm.selection.id != value.id)
		
		return {
			formData: this.validations,
			fusionTarget: { required, differentThanSource }
		}
	}
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
