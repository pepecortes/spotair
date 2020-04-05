<template lang="pug">
	extends FormBase.pug
	
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
import FormBase from './FormBase.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: FormBase,
	
	data () {
		return {
			model: "modele",
			validations: {
				nom: {required},
				surnom: {},
				constructeur: {required},
			},
			constructeurOptions: [],
		}
	},
	
	mounted() {
		this.getConstructeurOptions()
	},
	
	methods: {
		
		selectNewForm() {
			this.axios.get(`constructeurs/${this.mutableInitialId}`)
				.then(output => this.newForm({constructeur: output.data}))
				.catch(() => this.newForm())
		},
		
		getConstructeurOptions() {
			var vm = this
			vm.axios.get('constructeurs/')
				.then(response => vm.constructeurOptions = response.data)
				.catch(err => vm.showAxiosAlert(err))
		},
	}
	
}
</script>
