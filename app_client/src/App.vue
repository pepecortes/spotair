<template>
	<div id="app">
		
		<h2>Aerodrome form</h2>		
		
		<div>
		
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
					id="fieldsetNom"
					description="Nom de l'aérodrome"		
					label="Nom de l'aérodrome :"
					label-for="nom"
					:invalid-feedback="aerodrome.invalid.nom"
					:state="checkValidityState($v.aerodrome.nom)"
				>
					<b-form-input
						id="nom"
						v-model.trim="aerodrome.nom"
						type="text"
						:state="checkValidityState($v.aerodrome.nom)"
						placeholder="Nom"
					/>
				</b-form-group>
			
				<b-form-group
					id="fieldsetLieu"
					description="Lieu de l'aérodrome"		
					label="Lieu de l'aérodrome :"
					label-for="lieu"
					:invalid-feedback="aerodrome.invalid.lieu"
					:state="checkValidityState($v.aerodrome.lieu)"
				>
					<b-form-input
						id="lieu"
						v-model.trim="aerodrome.lieu"
						type="text"
						:state="checkValidityState($v.aerodrome.lieu)"
						placeholder="Lieu"
					/>
				</b-form-group>

				<b-button type="submit" variant="outline-warning" v-if="!newRecord">Update</b-button>
				<b-button type="button" variant="outline-danger" v-on:click="remove" v-if="!newRecord">Delete</b-button>
				<b-button type="button" variant="outline-primary" v-on:click="add" v-if="newRecord">Add</b-button>
				<b-button type="reset" variant="outline-success">Reset</b-button>
				
				
			</b-form>
		</div>

    
	</div>
	
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import { confirmDialog } from './lib/common'
import { validationMixin } from 'vuelidate'
import { required } from "vuelidate/lib/validators"
import TodoList from './components/TodoList.vue'
import VueSelect from 'vue-select'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

export default {
	
	components: {
		TodoList,
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
			axios.get(process.env.API_URL + 'aerodromes/fresh')
				.then(response => vm.initForm(response.data, true))
				.catch(err => vm.alert = {show: true, text: JSON.stringify(err), type: "danger"})
		},
		
		getAerodromes() {
			var vm = this;
			axios.get(process.env.API_URL + 'aerodromes')
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
			axios.put(url, vm.aerodrome)
				.then(function(response) {
					vm.alert = {
						show: true,
						text: "Updated: " + response.data.text,
						type: "success"
					}
					vm.showSelector()
				})
				.catch(err => vm.alert = {show: true, text: err, type: "danger"})
    },
    
    remove(evt) {
			var vm = this;
      evt.preventDefault()
      if (!confirmDialog("confirm removal?")) return
      vm.$v.$touch()
			const url = process.env.API_URL + 'aerodromes/' + vm.aerodrome.id
			axios.delete(url)
				.then(function(response) {
					vm.alert = {
						show: true,
						text: "Removed: " + vm.aerodrome.text,
						type: "success"
					}
					vm.showSelector()
				})
				.catch(err => vm.alert = {show: true, text: err, type: "danger"})
		},
    
    add(evt) {
			var vm = this;
      evt.preventDefault()
      vm.$v.$touch()
      if (vm.$v.$invalid) {
				return
			}
			const url = process.env.API_URL + 'aerodromes/'
			axios.post(url, vm.aerodrome)
				.then(function(response) {
					vm.alert = {
						show: true,
						text: "Created: " + response.data.text,
						type: "success"
					}
					vm.showSelector()
				})
				.catch(err => vm.alert = {show: true, text: err, type: "danger"})
		},
		
	},
	
	mixins: [validationMixin],
	
	validations: {
		aerodrome: {
			nom: {
				required 
      },
			lieu: {
				required 
			}
    }
	}
}

</script>

<style lang="scss">
@import './variables.scss';

*, *::before, *::after {
	box-sizing: border-box;
}

#app {
	max-width: 400px;
	margin: 0 auto;
	line-height: 1.4;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: $vue-blue;
}

h1 {
	text-align: center;
}

.formButtons {
	display: inline-flex;
}
</style>
