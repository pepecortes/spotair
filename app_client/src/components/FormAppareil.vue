<template lang="pug">
	extends FormBase.pug
	
	block input
			
		b-form-group(
			label="Avion",
			label-for="avion",
			:invalid-feedback="formData.invalid.avion",
			:state="checkValidityState($v.formData.avion)"
		)
			v-select(
				id="avion",
				:options="avionOptions",
				label="text",
				v-model="formData.avion",
				:state="checkValidityState($v.formData.avion)"
			)
				span(slot="no options") Aucun résultat
				
		b-form-group(
			label="Immat",
			label-for="immat",
			:invalid-feedback="formData.invalid.immat",
			:state="checkValidityState($v.formData.immat)"
		)
			b-form-input(
				id="immat",
				type="text",
				v-model.trim="formData.immat",
				:state="checkValidityState($v.formData.immat)"
			)
				
		b-form-group(
			label="Serial",
			label-for="serial",
			:invalid-feedback="formData.invalid.serial",
			:state="checkValidityState($v.formData.serial)"
		)
			b-form-input(
				id="serial",
				type="text",
				v-model.trim="formData.serial",
				:state="checkValidityState($v.formData.serial)"
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
import FormBase from './FormBase.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: FormBase,
	
	data () {
		return {
			model: "appareil",
			validations: {
				immat: {},
				serial: {},
				commentaire: {},
				avion: {required},
			},
			avionOptions: [],
		}
	},
	
	mounted() {
		this.getAvionOptions()
	},
	
	methods: {
		
		selectNewForm() {
			this.axios.get(`avions/${this.mutableInitialId}`)
				.then(output => this.newForm({avion: output.data}))
				.catch(() => this.newForm())
		},
		
		getAvionOptions() {
			var vm = this
			vm.axios.get('avions/')
				.then(response => vm.avionOptions = response.data)
				.catch(err => vm.showAxiosAlert(err))
		},
	}
	
}
</script>
