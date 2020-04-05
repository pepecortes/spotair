<template lang="pug">
	extends FormBase.pug
	
	block input
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
</template>

<script>

import FormBase from './FormBase.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: FormBase,
	
	data () {
		return {
			model: "constructeur",
			validations: {
				nom: {required},
			},
		}
	},
	
}

</script>
