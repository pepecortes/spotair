<template lang="pug">
	extends FormBase.pug
	
	block input
		b-form-group(
			label="Année",
			label-for="annee",
			:invalid-feedback="formData.invalid.annee",
			:state="checkValidityState($v.formData.annee)"
		)
			b-form-input(
				id="annee",
				type="text",
				v-model.trim="formData.annee",
				:state="checkValidityState($v.formData.annee)"
			)
</template>

<script>
import FormBase from './FormBase.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: FormBase,
	
	data () {
		return {
			model: "annee",
			validations: {
				annee: {required}
			},
		}
	}
	
}
</script>
