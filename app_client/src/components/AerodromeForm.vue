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
			label="Lieu",
			label-for="lieu",
			:invalid-feedback="formData.invalid.lieu",
			:state="checkValidityState($v.formData.lieu)"
		)
			b-form-input(
				id="lieu",
				type="text",
				v-model.trim="formData.lieu",
				:state="checkValidityState($v.formData.lieu)"
			)
		b-form-group(
			label="Latitude",
			label-for="latitude",
			:invalid-feedback="formData.invalid.latitude",
			:state="checkValidityState($v.formData.latitude)"
		)
			b-form-input(
				id="latitude",
				type="text",
				v-model.trim="formData.latitude",
				:state="checkValidityState($v.formData.latitude)"
			)
		b-form-group(
			label="Longitude",
			label-for="longitude",
			:invalid-feedback="formData.invalid.longitude",
			:state="checkValidityState($v.formData.longitude)"
		)
			b-form-input(
				id="longitude",
				type="text",
				v-model.trim="formData.longitude",
				:state="checkValidityState($v.formData.longitude)"
			)
			
		gmap-input(
			text='LFBO',
			:latitude='formData.latitude',
			:longitude='formData.longitude',
		)
			
</template>

<script>

import BaseForm from './BaseForm.vue'
import { required, decimal, between } from "vuelidate/lib/validators"
import GMapInput from './GMapInput.vue'

// Check that both latitude and longitud are present or neither
const bothCoordinates = (value, vm) => 
	(vm.latitude && vm.longitude) || (!vm.latitude && !vm.longitude);

export default {	
	
	components: {'gmap-input': GMapInput},
	
	extends: BaseForm,
	
	data () {
		return {
			model: "aerodrome",
			validations: {
				nom: {required},
				lieu: {required},
				latitude: {decimal, between: between(-90, 90), bothCoordinates},
				longitude: {decimal, between: between(-180, 180), bothCoordinates},
			},
		}
	},
	
}

</script>
