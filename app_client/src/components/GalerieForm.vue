<template lang="pug">
	extends BaseForm.pug
	
	block input
		b-form-group(
			label="Theme",
			label-for="theme",

		)
			b-form-input(
				id="theme",
				type="text",

			)
</template>

<script>
import BaseForm from './BaseForm.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: BaseForm,
	
	data () {
		return {
			model: "galerie",
			validations: {theme: {required},},
		}
	}
	
}
</script>
