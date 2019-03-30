<template lang="pug">
	extends BaseForm.pug
	
	block input
			
		b-form-group(
			label="Photographe",
			label-for="photographe",
			:invalid-feedback="formData.invalid.photographe",
			:state="checkValidityState($v.formData.photographe)"
		)
			v-select(
				id="photographe",
				:options="photographeOptions",
				label="text",
				v-model="formData.photographe",
				:state="checkValidityState($v.formData.photographe)"
			)
				span(slot="no options") Aucun résultat
				
		b-form-group(
			label="Compagnie",
			label-for="compagnie",
			:invalid-feedback="formData.invalid.compagnie",
			:state="checkValidityState($v.formData.compagnie)"
		)
			v-select(
				id="compagnie",
				:options="compagnieOptions",
				label="text",
				v-model="formData.compagnie",
				:state="checkValidityState($v.formData.compagnie)"
			)
				span(slot="no options") Aucun résultat
				
		b-form-group(
			label="Appareil",
			label-for="appareil",
			:invalid-feedback="formData.invalid.appareil",
			:state="checkValidityState($v.formData.appareil)"
		)
			v-select(
				id="appareil",
				:options="appareilOptions",
				label="text",
				v-model="formData.appareil",
				:state="checkValidityState($v.formData.appareil)"
			)
				span(slot="no options") Aucun résultat
				
		b-form-group(
			label="Galerie",
			label-for="galerie",
			:invalid-feedback="formData.invalid.galerie",
			:state="checkValidityState($v.formData.galerie)"
		)
			v-select(
				id="galerie",
				:options="galerieOptions",
				label="text",
				v-model="formData.galerie",
				:state="checkValidityState($v.formData.galerie)"
			)
				span(slot="no options") Aucun résultat
				
		b-form-group(
			label="Validation",
			label-for="validation",
			:invalid-feedback="formData.invalid.validation",
			:state="checkValidityState($v.formData.validation)"
		)
			b-form-checkbox(
				id="validation",
				v-model="formData.validation",
				:state="checkValidityState($v.formData.validation)"
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
				
</template>

<script>
import BaseForm from './BaseForm.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: BaseForm,
	
	data () {
		return {
			model: "photo",
			validations: {
				validation: {},
				commentaire: {},
				photographe: {required},
				compagnie: {required},
				appareil: {required},
				galerie: {required},
			},
			photographeOptions: [],
			compagnieOptions: [],
			appareilOptions: [],
			galerieOptions: [],
		}
	},
	
	mounted() {
		this.getPhotographeOptions()
		this.getCompagnieOptions()
		this.getAppareilOptions()
		this.getGalerieOptions()
	},
	
	methods: {
		
		getPhotographeOptions() {
			var vm = this
			vm.axios.get('photographes/')
				.then(response => vm.photographeOptions = response.data)
				.catch(err => vm.showAxiosAlert(err))
		},
		
		getCompagnieOptions() {
			var vm = this
			vm.axios.get('compagnies/')
				.then(response => vm.compagnieOptions = response.data)
				.catch(err => vm.showAxiosAlert(err))
		},
		
		getAppareilOptions() {
			var vm = this
			vm.axios.get('appareils/')
				.then(response => vm.appareilOptions = response.data)
				.catch(err => vm.showAxiosAlert(err))
		},
		
		getGalerieOptions() {
			var vm = this
			vm.axios.get('galeries/')
				.then(response => vm.galerieOptions = response.data)
				.catch(err => vm.showAxiosAlert(err))
		},
		
	}
	
}
</script>
