<template>
	<div id="aerodromeForm">
		
		  <b-alert
				:variant="alert.type"
				dismissible
				fade
				:show="alert.show"
				@dismissed="alert.show=false">
				{{ alert.text }}
			</b-alert>
		
			<div v-if="!toggleForm">
				<v-select 
					:options=aerodromes
					label="text"
					@input="initForm"
				>
					<span slot="no-options">Aucun résultat</span>
				</v-select>
				<b-button variant="outline-success" v-on:click="newForm">New</b-button>
			</div>
    	
			<b-form @submit="update" @reset="reset" v-if="toggleForm">
			
				<b-button variant="outline-warning" v-on:click="clearForm">X</b-button>
				
				<b-form-group
					label="Nom"
					label-for="nom"
					:invalid-feedback="aerodrome.invalid.nom"
					:state="checkValidityState($v.aerodrome.nom)"
				>
					<b-form-input
						id="nom"
						v-model.trim="aerodrome.nom"
						type="text"
						:state="checkValidityState($v.aerodrome.nom)"
					/>
				</b-form-group>
			
				<b-form-group
					label="Lieu"	
					label-for="lieu"
					:invalid-feedback="aerodrome.invalid.lieu"
					:state="checkValidityState($v.aerodrome.lieu)"
				>
					<b-form-input
						id="lieu"
						v-model.trim="aerodrome.lieu"
						type="text"
						:state="checkValidityState($v.aerodrome.lieu)"
					/>
				</b-form-group>
				
				<b-form-group		
					label="Latitude"
					label-for="latitude"
					description="Entre -90 et +90"
					:invalid-feedback="aerodrome.invalid.latitude"
					:state="checkValidityState($v.aerodrome.latitude)"
				>
					<b-form-input
						id="latitude"
						v-model.number="aerodrome.latitude"
						type="text"
						:state="checkValidityState($v.aerodrome.latitude)"
					/>
				</b-form-group>
				
				<b-form-group		
					label="Longitude"
					label-for="longitude"
					description="Entre -180 et +180"
					:invalid-feedback="aerodrome.invalid.longitude"
					:state="checkValidityState($v.aerodrome.longitude)"
				>
					<b-form-input
						id="longitude"
						v-model.number="aerodrome.longitude"
						type="text"
						:state="checkValidityState($v.aerodrome.longitude)"
					/>
				</b-form-group>

				<b-button type="submit" variant="outline-warning" v-if="!newRecord">Update</b-button>
				<b-button type="button" variant="outline-danger" v-on:click="remove" v-if="!newRecord">Delete</b-button>
				<b-button type="button" variant="outline-primary" v-on:click="add" v-if="newRecord">Add</b-button>
				<b-button type="reset" variant="outline-success">Reset</b-button>

			</b-form>  
	</div>
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
	
	components: {
		'v-select': VueSelect
	},
	
	data () {
		return {
			aerodromes: [],
			aerodrome: null, // the aerodrome being edited
			aerodromeBak: null, // the original selection, in case you need to reset
			alert: {show: false, text: "", type: "warning"},
			toggleForm: false,
			newRecord: false,
		}
	},

	created: function() {this.getAerodromes()},

	methods: {
		
		// Return the validity state or null if the input is untouched
		checkValidityState(input) {
			return (input.$dirty)? !input.$invalid : null
		},
		
		// Init the form with the given selection. Display controls
		// for update/delete or add depending on the boolean newRecord
		initForm(selection, newRecord = false) {
			if (!selection) return
			this.aerodrome = JSON.parse(JSON.stringify(selection))
			this.aerodromeBak = JSON.parse(JSON.stringify(selection))
			this.newRecord = newRecord
			this.toggleForm = true
			this.$v.$reset()
		},
		
    // Reset the form values to the initial selection
		reset(evt) {
      this.initForm(this.aerodromeBak, this.newRecord)
    },
		
		// Hide the form, refresh the selector and display it
		showSelector() {
			this.getAerodromes()
			this.toggleForm = false
		},
		
		clearForm() {
			this.alert = {show: false, text: "", type: "warning"}
			this.showSelector()
		},
		
		// Create a fresh form ready for adding new data
		newForm() {
			this.aerodrome = {nom: "nom", lieu: "lieu"}
			var vm = this
			this.axios.get(process.env.API_URL + 'aerodromes/fresh')
				.then(response => vm.initForm(response.data, true))
				.catch(err => vm.alert = {show: true, text: JSON.stringify(err), type: "danger"})
		},
		
		getAerodromes() {
			var vm = this;
			this.axios.get(process.env.API_URL + 'aerodromes')
				.then(function(response){vm.aerodromes = response.data})
				.catch(err => vm.alert = {show: true, text: err, type: "danger"})
		},
		
		update(evt) {
			var vm = this;
      evt.preventDefault()
      if (!confirmDialog("confirm update?")) return
      vm.$v.$touch()
      if (vm.$v.$invalid) {
				return
			}
			const url = process.env.API_URL + 'aerodromes/' + vm.aerodrome.id
			this.axios.put(url, vm.aerodrome)
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
			const url = process.env.API_URL + 'aerodromes/' + vm.aerodrome.id
			this.axios.delete(url)
				.then(function(response) {
					vm.alert = {
						show: true,
						text: "Removed: " + vm.aerodrome.text,
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
			this.axios.post(url, vm.aerodrome)
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
		aerodrome: {
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
