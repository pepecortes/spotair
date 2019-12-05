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
			
		p LATITUDE: {{ formData.latitude }} / LONGITUDE: {{ formData.longitude }}
			
		gmap-input(
			:text='formData.nom + " " + formData.lieu',
			v-model='gps',
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
				lieu: {},
				latitude: {decimal, between: between(-90, 90), bothCoordinates},
				longitude: {decimal, between: between(-180, 180), bothCoordinates},
			},
		}
	},
	
	computed: {
		
		gps: {
				get: function() {
					if (!this.formData) return {}
					return {latitude: this.formData.latitude, longitude: this.formData.longitude}
				},
				set: function(val) {
						this.formData.latitude = val.latitude
						this.formData.longitude = val.longitude
					//if ((this.formData.latitude == 0) && (this.formData.longitude == 0)) {
						//this.formData.latitude = null
						//this.formData.latitude = null
					//} else {
						//this.formData.latitude = val.latitude
						//this.formData.longitude = val.longitude
					//}
				},
		},
			
	},
	
}

</script>
