<template lang="pug">
	extends BaseForm.pug
	
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
		b-form-group(
			label="Flotille",
			label-for="flotille",
			:invalid-feedback="formData.invalid.flotille",
			:state="checkValidityState($v.formData.flotille)"
		)
			b-form-input(
				id="flotille",
				type="text",
				v-model.trim="formData.flotille",
				:state="checkValidityState($v.formData.flotille)"
			)
</template>

<script>

import BaseForm from './BaseForm.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: BaseForm,
	
	data () {
		return {
			model: "compagnie",
			validations: {
				nom: {required},
			},
		}
	},
	
}

</script>
