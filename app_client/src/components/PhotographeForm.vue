<template lang="pug">
	extends BaseForm.pug
	
	block input
		b-form-group(
			label="Prénom",
			label-for="prenom",
			:invalid-feedback="formData.invalid.prenom",
			:state="checkValidityState($v.formData.prenom)"
		)
			b-form-input(
				id="prenom",
				type="text",
				v-model.trim="formData.prenom",
				:state="checkValidityState($v.formData.prenom)"
			)
		b-form-group(
			label="Nom",
			label-for="nom",
			:invalid-feedback="formData.invalid.nom",
			:state="checkValidityState($v.formData.nom)"
		)
			b-form-input(
				id="nom",
				type="text",
				v-model.trim="formData.nom",
				:state="checkValidityState($v.formData.nom)"
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
			label="Admin",
			label-for="isAdmin"
		)
			b-form-checkbox(
				id="isAdmin",
				v-model="formData.isAdmin"
			)
			
		b-button(type="button", variant="outline-danger", v-on:click="resetPassword") Reset password
</template>

<script>
import BaseForm from './BaseForm.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: BaseForm,
	
	data () {
		return {
			model: "photographe",
			validations: {
				nom: {required},
				prenom: {required},
				mail: {required}
			},
		}
	},
	
	methods: {
	
		// Reset the  password to the DEFAULT one
		resetPassword() {
			var vm = this
			const id = vm.formData.id
			const password = process.env.MEMBRES_DEFAULT_PASSWORD
			vm.axios.put("photographes/setPassword/" + id, {password: password})
				.then(function(response) {
					vm.showAlert("Mot de passe réinitialisé", "success")
				})
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
			},
		},
	}
	
</script>
