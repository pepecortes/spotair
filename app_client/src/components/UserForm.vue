<template lang="pug">
	extends BaseForm.pug
	
	block input
			
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
	
	mounted() {
		this.getPhotographeOptions()
	},
	
	methods: {
		
		getPhotographeOptions() {
			var vm = this
			vm.axios.get('photographes/')
				.then(response => vm.photographeOptions = response.data)
				.catch(err => vm.showAxiosAlert(err))
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
