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
	
		// Reset the  password: NOT YET IMPLEMENTED
		resetPassword() {
			alert("NOT IMPLEMENTED")
		},
	}
	
}
</script>
