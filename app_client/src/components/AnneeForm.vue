<template lang="pug">
	extends BaseForm.pug
	
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
import BaseForm from './BaseForm.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: BaseForm,
	
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
