<template lang="pug">
	extends FormBase.pug
	
	block input
		b-form-group(
			label="Theme",
			label-for="theme",
			:invalid-feedback="formData.invalid.theme",
			:state="checkValidityState($v.formData.theme)"
		)
			b-form-input(
				id="theme",
				type="text",
				v-model.trim="formData.theme",
				:state="checkValidityState($v.formData.theme)"
			)
</template>

<script>
import FormBase from './FormBase.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: FormBase,
	
	data () {
		return {
			model: "theme",
			validations: {
				theme: {required}
			},
		}
	}
	
}
</script>
