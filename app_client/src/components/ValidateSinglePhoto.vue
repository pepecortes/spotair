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
		
		p(v-if='value.photographe') Photographe: {{ value.photographe.text }}
		p(v-if='value.dateUpload') Uploaded: {{ value.dateUpload }}
		
		validator-input(
			ref='avionValidator',
			apiCall="avions",
			v-model='value.avion',
			title="Avion",
			:adminForm='admin.avion',
			:state='!$v.value.avion.$invalid',
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

		validator-input(
			ref='aerodromeValidator',
			apiCall="aerodromes",
			v-model='value.aerodrome',
			title="Lieu",
			:adminForm='admin.aerodrome',
			:state='!$v.value.aerodrome.$invalid',
		)
		
		b-button(v-if='allValidated', type="button", variant="outline-success", v-on:click="validateButtonClicked") Validate
		
</template>

<script>
import { alertMixin } from './AlertMixin'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import ValidatorInput from './ValidatorInput.vue'

import AvionForm from './AvionForm.vue'
import AppareilForm from './AppareilForm.vue'
import GalerieForm from './GalerieForm.vue'
import CompagnieForm from './CompagnieForm.vue'
import AerodromeForm from './AerodromeForm.vue'

export default {
	
	//TBC: how do you deal with Avion? (only Appareil is copied to
	//the db...
	
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
		'validator-input': ValidatorInput,
	},	
	
	data() {
		return {
			id: null,
			value:
				{
					photographe: null, avion: null, appareil: null,
					galerie: null, compagnie: null, aerodrome: null,
					dateUpload: null
				},
			admin: {avion: AvionForm, appareil: AppareilForm, galerie: GalerieForm, compagnie: CompagnieForm, aerodrome: AerodromeForm},
			compagnie: null,
			uploadedFileURL: null,
		}
	},
	
	computed: {
		
		allValidated() {
			return !(
				this.$v.value.avion.$invalid
				|| this.$v.value.appareil.$invalid
				|| this.$v.value.galerie.$invalid
				|| this.$v.value.compagnie.$invalid
				|| this.$v.value.aerodrome.$invalid
			)
		},
		
	},
	
	mixins: [validationMixin, alertMixin],
	
	methods: {		
		
		avionChanged(selected) {
			console.log("avion changed " + JSON.stringify(selected))
			//const id = (selected)? selected.id : false
			//this.getAppareilOptions(id)
		},
		
		setInitialValue(data) {
			this.$refs.avionValidator.setInitialValue(data.avion)
			this.$refs.appareilValidator.setInitialValue(data.appareil)
			this.$refs.galerieValidator.setInitialValue(data.galerie)
			this.$refs.compagnieValidator.setInitialValue(data.compagnie)
			this.$refs.aerodromeValidator.setInitialValue(data.aerodrome)
		},
			
		validateButtonClicked() {
			// TBC: commentaire
			
			var vm = this
			var createdId
			vm.$v.value.$touch()
      if (vm.$v.value.$invalid) return
			vm.axios.post(`photos/validateUpload/${vm.id}`, vm.value)
				.then(response => console.log(JSON.stringify(response.data)))
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
			
	},
	
	validations() {
		return {value: 
			{
				avion: {required},
				appareil: {required},
				galerie: {required},
				compagnie: {required},
				aerodrome: {required}
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
