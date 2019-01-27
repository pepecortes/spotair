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
</template>

<script>

import BaseForm from './BaseForm.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: BaseForm,
	
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
