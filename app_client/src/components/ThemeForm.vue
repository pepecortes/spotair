<template lang="pug">

div#galerieForm
	base-form(api="themes")
		template(slot="inputs", slot-scope="{formData}")
			b-form-group(
				label="Theme",
				label-for="theme",
				:invalid-feedback="formData.invalid.theme",
				:state="checkValidityState($v.theme.theme)"
			)
				b-form-input(
					id="theme",
					type="text",
					v-model.trim="formData.theme",
					:state="checkValidityState($v.theme.theme)"
				)

</template>

<script>
import BaseForm from './BaseForm.vue'
import { validationMixin } from 'vuelidate'
import { required } from "vuelidate/lib/validators"

export default {
	
	components: {
		'base-form': BaseForm
	},
	
	data () {
		return {
		}
	},
	
	methods: {
	
		// Return the validity state or null if the input is untouched
		checkValidityState(input) {
			console.log("CHECKING VALIDITY")
			return (input.$dirty)? !input.$invalid : null
		},
	},
	
	mixins: [validationMixin],
	
	validations: {
		theme: {
			theme: {required},
    }
	}
	
}
</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
