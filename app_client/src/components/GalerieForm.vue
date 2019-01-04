<template lang="pug">
	extends BaseForm.pug
	
	block input
		b-form-group(
			label="Sortie associative",
			label-for="isspotair",
			:invalid-feedback="formData.invalid.isspotair",
			:state="checkValidityState($v.formData.isspotair)"
		)
			b-form-checkbox(
				id="isspotair",
				v-model="formData.isspotair",
				:state="checkValidityState($v.formData.isspotair)"

			)
			
		b-form-group(
			label="Commentaire",
			label-for="commentaire",
			:invalid-feedback="formData.invalid.commentaire",
			:state="checkValidityState($v.formData.commentaire)"
		)
			b-form-input(
				id="commentaire",
				type="text",
				v-model.trim="formData.commentaire",
				:state="checkValidityState($v.formData.commentaire)"
			)
			
		b-form-group(
			label="Annee",
			label-for="annee",
			:invalid-feedback="formData.invalid.annee",
			:state="checkValidityState($v.formData.anneeid)"
		)
			v-select(
				id="annee",
				:options="anneeOptions",
				label="text",
				v-model="formData.annee",
				:state="checkValidityState($v.formData.anneeid)"
			)
				span(slot="no options") Aucun résultat
				
		b-form-group(
			label="Theme",
			label-for="theme",
			:invalid-feedback="formData.invalid.theme",
			:state="checkValidityState($v.formData.themeid)"
		)
			v-select(
				id="theme",
				:options="themeOptions",
				label="text",
				v-model="formData.theme",
				:state="checkValidityState($v.formData.themeid)"
			)
				span(slot="no options") Aucun résultat
				
		b-form-group(
			label="Aérodrome",
			label-for="aerodrome",
			:invalid-feedback="formData.invalid.aerodrome",
			:state="checkValidityState($v.formData.aerodromeid)"
		)
			v-select(
				id="aerodrome",
				:options="aerodromeOptions",
				label="text",
				v-model="formData.aerodrome",
				:state="checkValidityState($v.formData.aerodromeid)"
			)
				span(slot="no options") Aucun résultat
</template>

<script>
import BaseForm from './BaseForm.vue'
import { required } from "vuelidate/lib/validators"
import { axiosErrorToString } from '../lib/common'

export default {
	
	extends: BaseForm,
	
	data () {
		return {
			model: "galerie",
			validations: {
				isspotair: {required},
				commentaire: {},
				anneeid: {required},
				themeid: {required},
				aerodromeid: {required},
			},
			anneeOptions: null,
		}
	},
	
	mounted() {
		this.getAnneeOptions()
		this.getThemeOptions()
		this.getAerodromeOptions()
	},
	
	methods: {
		
		//getOptions(boundVariable, api) {
			//var vm = this;
			//var url = process.env.API_URL + api
			//this.axios.get(url)
				//.then(response => boundVariable = response.data)
				//.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))			
		//},
		
		getAnneeOptions() {
			var vm = this;
			var url = process.env.API_URL + "annees"
			this.axios.get(url)
				.then(response => vm.anneeOptions = response.data)
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
		
		getThemeOptions() {
			var vm = this;
			var url = process.env.API_URL + "themes"
			this.axios.get(url)
				.then(response => vm.themeOptions = response.data)
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
		
		getAerodromeOptions() {
			var vm = this;
			var url = process.env.API_URL + "aerodromes"
			this.axios.get(url)
				.then(response => vm.aerodromeOptions = response.data)
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
	}
	
}
</script>
