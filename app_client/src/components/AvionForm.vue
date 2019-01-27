<template lang="pug">
	extends BaseForm.pug
	
	block input
			
		b-form-group(
			label="Modele",
			label-for="modele",
			:invalid-feedback="formData.invalid.modele",
			:state="checkValidityState($v.formData.modele)"
		)
			v-select(
				id="modele",
				:options="modeleOptions",
				label="text",
				v-model="formData.modele",
				:state="checkValidityState($v.formData.modele)"
			)
				span(slot="no options") Aucun résultat
				
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
import { axiosErrorToString } from '../lib/common'

export default {
	
	extends: BaseForm,
	
	data () {
		return {
			model: "avion",
			validations: {
				nom: {required},
				modele: {required},
			},
			modeleOptions: null,
		}
	},
	
	mounted() {
		this.getModeleOptions()
	},
	
	methods: {
		
		getModeleOptions() {
			var vm = this
			vm.axios.get('modeles/')
				.then(response => vm.modeleOptions = response.data)
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
	}
	
}
</script>
