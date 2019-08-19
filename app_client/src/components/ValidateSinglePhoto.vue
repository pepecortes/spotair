<template lang="pug">

	div(id="validateSinglePhoto")
	
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		img(:src="uploadedFileURL", width="400") 
		
		p(v-if='value.dateUpload') Uploaded: {{ value.dateUpload }}
		p(v-if='value.photographe') Photographe: {{ value.photographe.text }}
		p(v-if='value.commentUpload') {{ value.commentUpload }}
		
		validator-input(
			ref='avionValidator',
			:hideValidateButton='true',
			apiCall="avions",
			v-model='value.avion',
			title="Avion",
			:adminForm='admin.avion',
			@selector-changed='avionChanged',
		)

		validator-input(
			ref='appareilValidator',
			apiCall="appareils",
			v-model='value.appareil',
			title="Immat",
			:adminForm='admin.appareil',
			:state='!$v.value.appareil.$invalid',
		)

		validator-input(
			ref='aerodromeValidator',
			:hideValidateButton='true',
			apiCall="aerodromes",
			v-model='value.aerodrome',
			title="Lieu",
			:adminForm='admin.aerodrome',
			@selector-changed='aerodromeChanged',
		)

		validator-input(
			ref='galerieValidator',
			apiCall="galeries",
			v-model='value.galerie',
			title="Galerie",
			:adminForm='admin.galerie',
			:state='!$v.value.galerie.$invalid',
		)

		validator-input(
			ref='compagnieValidator',
			apiCall="compagnies",
			v-model='value.compagnie',
			title="Compagnie",
			:adminForm='admin.compagnie',
			:state='!$v.value.compagnie.$invalid',
		)
		
		b-form-textarea(
			id="commentaire",
			placeholder="Commentaire",
			rows="3",
			max-rows="6",
			v-model="value.commentaire"
		)
		
		b-button(v-if='allValidated', type="button", variant="outline-success", v-on:click="validateButtonClicked") Valider
		b-button(type="button", variant="outline-danger", v-on:click="rejectButtonClicked") Rejeter
		
</template>

<script>
import { alertMixin } from './AlertMixin'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import EditorInput from './EditorInput.vue'

import AvionForm from './AvionForm.vue'
import AppareilForm from './AppareilForm.vue'
import GalerieForm from './GalerieForm.vue'
import CompagnieForm from './CompagnieForm.vue'
import AerodromeForm from './AerodromeForm.vue'

export default {
	
	beforeMount() {
		var vm = this
		vm.id = vm.$route.params.id
		const url = `photouploads/${vm.id}`
		const fileLocation = process.env.STORAGE_URL + process.env.UPLOAD_LOCATION
		vm.uploadedFileURL =  `${fileLocation}${vm.id}.jpg`
		vm.axios.get(url)
			.then(response => {
				vm.setInitialValue(response.data.jsonData)
				vm.value.photographe = response.data.photographe
				vm.value.dateUpload = response.data.createdAt
			})
			.catch(err => vm.showAxiosAlert(err, "danger"))
	},
	
	components: {
		'validator-input': EditorInput,
	},	
	
	data() {
		return {
			id: null,
			value:
				{
					photographe: null, avion: null, appareil: null,
					galerie: null, compagnie: null, aerodrome: null,
					dateUpload: null, commentUpload: null, commentaire: null
				},
			admin: {avion: AvionForm, appareil: AppareilForm, galerie: GalerieForm, compagnie: CompagnieForm, aerodrome: AerodromeForm},
			uploadedFileURL: null,
		}
	},
	
	computed: {
		
		allValidated() {
			return !(
				this.$v.value.appareil.$invalid
				|| this.$v.value.galerie.$invalid
				|| this.$v.value.compagnie.$invalid
			)
		},
		
	},
	
	mixins: [validationMixin, alertMixin],
	
	methods: {		
		
		avionChanged(selected) {
			if(!selected || !selected.id) return
			var vm = this
			vm.axios.get(`appareils/byAvion/${selected.id}`)
				.then(response => {
					vm.$refs.appareilValidator.setOptions(response.data)
					vm.$refs.appareilValidator.reset()
				})
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		aerodromeChanged(selected) {
			if(!selected || !selected.id) return
			var vm = this
			vm.axios.get(`galeries/byAerodrome/${selected.id}`)
				.then(response => {
					vm.$refs.galerieValidator.setOptions(response.data)
					vm.$refs.galerieValidator.reset()
				})
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		setInitialValue(data) {
			this.$refs.avionValidator.setInitialValue(data.avion)
			this.$refs.appareilValidator.setInitialValue(data.appareil)
			this.$refs.galerieValidator.setInitialValue(data.galerie)
			this.$refs.compagnieValidator.setInitialValue(data.compagnie)
			this.$refs.aerodromeValidator.setInitialValue(data.aerodrome)
			this.value.commentUpload = data.commentaire
		},
			
		validateButtonClicked() {
			var vm = this
			var createdId
			vm.$v.value.$touch()
      if (vm.$v.value.$invalid) return
			vm.axios.post(`photos/validateUpload/${vm.id}`, vm.value)
				.then(response => console.log(JSON.stringify(response.data)))
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
			
		rejectButtonClicked() {
			this.axios.put(`photoUploads/reject/${this.id}`)
				.then(response => console.log(JSON.stringify(response.data)))
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
			
	},
	
	validations() {
		return {value: 
			{
				appareil: {required},
				galerie: {required},
				compagnie: {required},
			}
		}
	},
	
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
