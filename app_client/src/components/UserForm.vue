<template lang="pug">
	extends BaseForm.pug
	
	
	block input
	
		b-button(@click='test') TEST
		b-button(@click='display') DATA
			
		b-form-group(
			label="Photographe",
			label-for="photographe",
			:invalid-feedback="formData.invalid.photographe",
			:state="checkValidityState($v.formData.photographe)"
		)
			v-select(
				id="photographe",
				:options="photographeOptions",
				label="text",
				v-model="formData.photographe",
				:state="checkValidityState($v.formData.photographe)"
			)
				span(slot="no options") Aucun résultat
				
		b-form-group(
			label="TEST",
			label-for="testSelect",
		)
			v-select(
				id="testSelect",
				:options="[1,2,3]",
			)
				
		b-form-group(
			label="Email",
			label-for="mail",
			:invalid-feedback="formData.invalid.mail",
			:state="checkValidityState($v.formData.mail)"
		)
			b-form-input(
				id="mail",
				type="email",
				v-model.trim="formData.mail",
				:state="checkValidityState($v.formData.mail)"
			)
		b-form-group(
			label="Group",
			label-for="group"
		)
			b-form-select(
				id="group",
				v-model="formData.group",
				:options="groupOptions",
				size="sm",
			)
			
	block additionalModifyActions
		b-button(type="button", variant="outline-danger", v-on:click="resetPassword") Reset password
			
</template>

<script>
import BaseForm from './BaseForm.vue'
import { required, email } from "vuelidate/lib/validators"

export default {
	
	extends: BaseForm,
	
	data () {
		return {
			model: "user",
			validations: {
				photographe: {required},
				mail: {required, email}
			},
			photographeOptions: [],
			groupOptions: [
				{value: 0, text: 'Photographe'},
				{value: 1, text: 'Administrateur'},
				{value: 2, text: 'Screener'},
			],
		}
	},
	
	beforeMount() {
		this.getPhotographeOptions()
	},
		
	methods: {
		
		test() {
			this.formData.mail = "kaka@koko.es"
			this.formData.photographe = this.photographeOptions[4]
		},
		
		display() {
			console.log(JSON.stringify(this.formData))
		},
		
		//// Return the validity state or null if the input is untouched
		//checkValidityState(input) {
			//console.log(`CHECKING  ${input.$dirty} / ${input.$invalid}`)
			//return (input.$dirty)? !input.$invalid : null
		//},
		
		getPhotographeOptions() {
			this.axios.get('photographes/')
				.then(response => this.photographeOptions = response.data)
				
				////TEST
				//.then(() => {
					//console.log("FORMDATA " + JSON.stringify(this.formData))
					//this.formData.photographe = {}
					//this.formData.photographe = "KQKQVQK"
					//console.log("FORMDATA " + JSON.stringify(this.formData))
				//})
				//.then(() => console.log("preselected: " + this.preselectedId))
				//.then(() => this.formData.photographe = this.photographeOptions.find(e => (e.id == 15)))
				//.then(() => this.formData.photographe = null)
				
				
				.catch(err => this.showAxiosAlert(err))
		},
	
		// Reset the  password to the DEFAULT one
		resetPassword() {
			var vm = this
			const id = vm.formData.id
			const password = process.env.MEMBRES_DEFAULT_PASSWORD
			vm.axios.put("users/setPassword/" + id, {password: password})
				.then(function(response) {
					vm.showAlert("Mot de passe réinitialisé", "success")
				})
				.catch(err => vm.showAxiosAlert(err))
			},
		},
	}
	
</script>
