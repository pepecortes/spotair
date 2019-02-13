<template lang="pug">
	div(id='cover')
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false"
			) {{ alert.text }}
		h1 This is the cover page
		vue-picture-swipe(:items="items")
</template>

<script>

import VuePictureSwipe from 'vue-picture-swipe'
import { axiosErrorToString } from '../lib/common'
import { alertMixin } from './AlertMixin'

export default {
	
	components: {
		'vue-picture-swipe': VuePictureSwipe
	},
	
	mixins: [alertMixin],

	mounted () {this.getLatestPhotos()},
	
	data() {
		return {
			items: [{
				src: 'http://via.placeholder.com/600x400',
				thumbnail: 'http://via.placeholder.com/64x64',
				w: 600,
				h: 400,
				alt: 'some numbers on a grey background' // optional alt attribute for thumbnail image
			}],
		}
	},
	
	methods: {
		
		getLatestPhotos() {
			var vm = this
			this.axios.get('/photos/recent')
				.then(response => {console.dir(response.data)})
				.catch(err => {console.error(err.toString());vm.showAlert(axiosErrorToString(err), "danger")})
			
			
			//vm.items = [{
				//src: 'http://via.placeholder.com/600x400',
				//thumbnail: 'http://via.placeholder.com/64x64',
				//w: 600,
				//h: 400,
				//alt: 'some numbers on a grey background' // optional alt attribute for thumbnail image
			//},
			//{
				//src: 'http://via.placeholder.com/1200x900',
				//thumbnail: 'http://via.placeholder.com/64x64',
				//w: 1200,
				//h: 900
			//}]
		},
		
	},
	
}
	
	//data () {
		//return {
			//formData: null,
			//selectOptions: [],
			//selection: null, // the original selection, in case you need to reset
			//fusionTarget: null, // self-explanatory
			//validations: {}, // overriden by each form validations object
		//}
	//},
	
	//watch: {
    //// monitor changes on selection
    //selection() {this.initForm()}
  //},
	
	//computed: {
		//models () {return pluralize(this.model)},
		//apiURL () {return this.models + "/"}
	//},

	//mounted () {this.getSelectOptions()},

	//methods: {
	
		//// Return the validity state or null if the input is untouched
		//checkValidityState(input) {
			//return (input.$dirty)? !input.$invalid : null
		//},
				
		//// Init the form with the given selection and reset validators
		//initForm() {
			//this.formData = JSON.parse(JSON.stringify(this.selection))
			//this.fusionTarget = null
			//this.$v.$reset()
		//},
		
		//newClicked() {
			//this.selection = null
			//this.newForm()
		//},
		
		//modifyClicked() {
			//this.getSelectOptions()
		//},
		
		//fusionClicked() {
			//this.getSelectOptions()
		//},
		
		//// Create a fresh form ready for adding new data
		//newForm() {
			//var vm = this
			//this.axios.get(vm.apiURL + 'fresh')
				//.then(response => {vm.selection = response.data})
				//.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		//},
		
		//// Get all the available options for the SELECT control
		//getSelectOptions(preselected) {
			//var vm = this
			//this.axios.get(vm.apiURL)
				//.then((response) => {
					//vm.selectOptions = response.data
					//vm.selection = (preselected)? preselected : null
				//})
				//.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		//},  
    
    //removeButtonClicked() {
      //if (!confirmDialog("confirmer élimination ?")) return
      //this.remove()
		//},
    
    //addButtonClicked() {
			//this.add()
		//},
		
		//resetButtonClicked() {
			//this.reset()
		//},
		
		//updateButtonClicked() {
      //if (!confirmDialog("confirmer modification ?")) return
      //this.update()
		//},
		
		//fusionButtonClicked() {
      //if (!confirmDialog("confirmer fusion ?")) return
      //this.fusion()
		//},
    
    //// Reset the form to the initial selection
		//reset() {
      //this.initForm()
		//},
    
    //// Remove the data given by its id
    //remove() {
			//var vm = this
      //this.$v.formData.$touch()
			//const url = vm.apiURL + vm.formData.id
			//vm.axios.delete(url)
				//.then(function(response) {
					//vm.showAlert("Removed: " + vm.formData.text, "success")
					//vm.getSelectOptions()
				//})
				//.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		//},
		
		//// Add the form data to the database
    //add() {
			//var vm = this
      //vm.$v.formData.$touch()
      //if (vm.$v.formData.$invalid) return
			//vm.axios.post(vm.apiURL, vm.formData)
				//.then(function(response) {
					//vm.showAlert("Created: " + response.data.text, "success")
					//vm.newForm()
				//})
				//.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		//},
		
		//// Update the form data on the database
		//update() {
			//var vm = this
      //this.$v.formData.$touch()
      //if (this.$v.formData.$invalid) return
			//const url = vm.apiURL + vm.formData.id
			//vm.axios.put(url, vm.formData)
				//.then(function(response) {					
					//vm.showAlert("Updated: " + response.data.text, "success")
					//vm.getSelectOptions(response.data)
				//})
				//.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
    //},
    
    //// Fusion: all references to the selection will be changed to the targetFusion
    //fusion() {
			//var vm = this
      //this.$v.fusionTarget.$touch()
      //if (this.$v.fusionTarget.$invalid) return
			//const url = vm.apiURL + `fusion/source/${vm.formData.id}/destination/${vm.fusionTarget.id}`
			//vm.axios.put(url)
				//.then(function(response) {
					//vm.showAlert(`Fusion OK: updated ${response.data.updated}, removed: ${vm.formData.text}`, "success")
					//vm.getSelectOptions()
				//})
				//.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		//},
    
	//},
	
	//// Mixin for validation. It will not have any effect without definition
	//// of a 'validations' object (vuelidate)
	//// Mixin for the alert messages
	//mixins: [validationMixin, alertMixin],
	
	//validations() {
		//// Validity checks for the fusion target
		//const differentThanSource = (value, vm) => (vm.selection.id != value.id)
		
		//return {
			//formData: this.validations,
			//fusionTarget: { required, differentThanSource }
		//}
	//}

</script>

<style lang="scss">

</style>
