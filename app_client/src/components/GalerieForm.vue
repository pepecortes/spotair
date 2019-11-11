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
				v-model="formData.isSpotair",
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
			:state="checkValidityState($v.formData.annee)"
		)
			v-select(
				id="annee",
				:options="anneeOptions",
				label="text",
				v-model="formData.annee",
				:state="checkValidityState($v.formData.annee)"
			)
				span(slot="no options") Aucun résultat
				
		b-form-group(
			label="Theme",
			label-for="theme",
			:invalid-feedback="formData.invalid.theme",
			:state="checkValidityState($v.formData.theme)"
		)
			v-select(
				id="theme",
				:options="themeOptions",
				label="text",
				v-model="formData.theme",
				:state="checkValidityState($v.formData.theme)"
			)
				span(slot="no options") Aucun résultat
				
		b-form-group(
			label="Aérodrome",
			label-for="aerodrome",
			:invalid-feedback="formData.invalid.aerodrome",
			:state="checkValidityState($v.formData.aerodrome)"
		)
			v-select(
				id="aerodrome",
				:options="aerodromeOptions",
				label="text",
				v-model="formData.aerodrome",
				:state="checkValidityState($v.formData.aerodrome)"
			)
				span(slot="no options") Aucun résultat
</template>

<script>
import BaseForm from './BaseForm.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: BaseForm,
	
	data () {
		return {
			model: "galerie",
			validations: {
				isspotair: {},
				commentaire: {},
				annee: {required},
				theme: {required},
				aerodrome: {required},
			},
			anneeOptions: [],
			themeOptions: [],
			aerodromeOptions: [],
		}
	},
	
	mounted() {
		this.getAnneeOptions()
		this.getThemeOptions()
		this.getAerodromeOptions()
	},
	
	methods: {
		
		selectNewForm() {
			this.axios.get(`annees/${this.mutableInitialId}`)
				.then(output => this.newForm({annee: output.data}))
				.catch(() => this.newForm())
		},
		
		getAnneeOptions() {
			var vm = this
			vm.axios.get('annees/')
				.then(response => vm.anneeOptions = response.data)
				.catch(err => vm.showAxiosAlert(err))
		},
		
		getThemeOptions() {
			var vm = this
			vm.axios.get('themes/')
				.then(response => vm.themeOptions = response.data)
				.catch(err => vm.showAxiosAlert(err))
		},
		
		getAerodromeOptions() {
			var vm = this
			vm.axios.get('aerodromes/')
				.then(response => vm.aerodromeOptions = response.data)
				.catch(err => vm.showAxiosAlert(err))
		},
	}
	
}
</script>
