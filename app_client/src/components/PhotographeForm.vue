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
			label-for="email",
			:invalid-feedback="formData.invalid.email",
			:state="checkValidityState($v.formData.email)"
		)
			b-form-input(
				id="email",
				type="text",
				v-model.trim="formData.email",
				:state="checkValidityState($v.formData.email)"
			)
		b-form-group(
			label="Mot de passe",
			label-for="password",
			:invalid-feedback="formData.invalid.password",
			:state="checkValidityState($v.formData.password)"
		)
			b-form-input(
				id="password",
				type="text",
				v-model.trim="formData.password",
				:state="checkValidityState($v.formData.password)"
			)
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
				mail: {required},
				password: {required},
			},
		}
	}
	
}
</script>
