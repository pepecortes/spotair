<template lang="pug">
	include BaseForm.pug
</template>

<script>import Vue from 'vue'
import { BFormGroup	} from 'bootstrap-vue'
import CustomVueMultiselect from "./CustomVueMultiselect.vue" 
import pluralize from 'pluralize'
import { validationMixin } from 'vuelidate'
import { confirmDialog } from '../lib/common'
import { required } from "vuelidate/lib/validators"
import { alertMixin } from './AlertMixin'

const	localRouter = {"modify": 0, "new": 1,	"fusion": 2}

Vue.component('b-form-group', {
	extends: BFormGroup,
	props: {
		'label-cols-sm': {
			type: String,
			default: "3"
		},
		'label-cols-lg': {
			type: String,
			default: "2"
		},
		'label-align-sm': {
			type: String,
			default: "right"
		},
	}
})

export default {
	
	components: {
		'v-select': CustomVueMultiselect
	},
	
	props: {
		
		initialTab: {
			// The index of the selected tab (see localRouter)
			type: Number,
			default: 0
		},
		
		initialId: {
			// Preselected id for "modify" and "fusion"
			type: Number,
			default: null
		},
		
	}, 
	
	data () {
		return {
			
			mutableInitialId: this.initialId,
			mutableInitialTab: this.initialTab,
			
			formData: {}, // the fields that will be modified by the each "block input" (see BaseForm.pug)
			selectOptions: [],
			selection: null,
			fusionTarget: null, // self-explanatory
			validations: {}, // overriden by each form validations object
			isLoading: false, // while the ajax call is in progress...
		}
	},
	
	watch: {
    selection() {this.initForm()}
  },
	
	computed: {
		models () {return pluralize(this.model)},
		apiURL () {return this.models + "/"}
	},
	
	beforeMount () {
		if (this.$route) {
			if (this.$route.params.tab) this.mutableInitialTab = localRouter[this.$route.params.tab]
			if (this.$route.params.id) this.mutableInitialId = this.$route.params.id
		}
		switch(this.mutableInitialTab) {
			case 1:
				this.selectNewForm()
				break;
			case 2:
				this.selectFusionForm()
				break;
			default:
				this.selectModifyForm()
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
		
		selectNewForm() {
			this.newForm()
		},
		
		selectModifyForm() {
			this.getSelectOptions(this.mutableInitialId)
		},
		
		selectFusionForm() {
			this.getSelectOptions(this.mutableInitialId)
		},
		
		// Create a fresh form ready for adding new data
		newForm(preselectedObject = {}) {
			this.axios.get(this.apiURL + 'fresh')
				.then(response => this.selection = Object.assign(response.data, preselectedObject))
				.catch(err => this.showAxiosAlert(err, "danger"))
		},
		
		// Get all the available options for the SELECT control
		getSelectOptions(preselected, reload = false) {
			if (!reload && this.selectOptions.length > 0) return
			var vm = this
			vm.selectOptions = []
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
			
			async function getPreselection(id) {
				if (!id) return null
				return vm.axios.get(`${vm.apiURL}${id}`)
					.then(response => response.data)
			}
			
			partialQuery(partialStep, 0)
				.then(() => getPreselection(preselected))
				.then(record => {if (record) vm.selection = record})
				.then(() => vm.isLoading = false)
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},  
    
    removeButtonClicked() {
      if (!confirmDialog("confirmer élimination ?")) return
      this.remove()
		},
    
    addButtonClicked() {
      if (!confirmDialog("confirmer nouveau ?")) return
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
@import '../styles/custom_variables.scss';

.selector {
	margin-bottom: 1.6rem;
}

.btn-group {
	padding-top: 1rem;
}

.tab-content {
	padding-top: 30px;
	padding-bottom: 30px;
	padding-left: 60px;
	padding-right: 60px;
	border-style: solid;
	border-width: 1px;
	border-color: $gray-300;
	border-top-color: transparent;
	border-bottom-left-radius: 0.25rem;
	border-bottom-right-radius: 0.25rem;
}

</style>
