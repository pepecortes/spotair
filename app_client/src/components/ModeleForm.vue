<template lang="pug">
	extends BaseForm.pug
	
	block input
			
		b-form-group(
			label="Constructeur",
			label-for="constructeur",
			:invalid-feedback="formData.invalid.constructeur",
			:state="checkValidityState($v.formData.constructeur)"
		)
			v-select(
				id="constructeur",
				:options="constructeurOptions",
				label="text",
				v-model="formData.constructeur",
				:state="checkValidityState($v.formData.constructeur)"
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
			
		b-form-group(
			label="Surnom",
			label-for="surnom",
			:invalid-feedback="formData.invalid.surnom",
			:state="checkValidityState($v.formData.surnom)"
		)
			b-form-input(
				id="surnom",
				type="text",
				v-model.trim="formData.surnom",
				:state="checkValidityState($v.formData.surnom)"
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
			model: "modele",
			validations: {
				nom: {required},
				surnom: {},
				constructeur: {required},
			},
			constructeurOptions: null,
		}
	},
	
	mounted() {
		this.getConstructeurOptions()
	},
	
	methods: {
		
		getConstructeurOptions() {
			var vm = this
			vm.axios.get('constructeurs/')
				.then(response => vm.constructeurOptions = response.data)
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
	}
	
}
</script>
