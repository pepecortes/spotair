<template lang="pug">

	div(id="fileUpload")
	
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
	
		form-wizard(ref="formWizard", title="", subtitle="", stepSize="xs", finishButtonText="Submit", @on-complete="onComplete")
			
			tab-content(title="photo", :beforeChange="imageAvailable")
				b-form-file(
					ref="fileinput",
					@change="onFileChange",
					v-model="filex",
					:state="acceptableImage",
					placeholder="Choose a file..."
				)
				b-button(type="button", variant="outline-success", v-on:click="resetFile") Reset


			tab-content(title="avion", :beforeChange="leavingAvion")
				head-or-tail(v-model="avion.headSelected")
					template(v-slot:head-slot)
						v-select(
							id="avion",
							:options="avion.options",
							label="text",
							v-model="avion.head",
							@input="avionChanged",
						)
					template(v-slot:tail-slot)
						input(type='text', v-model="avion.tail")
					
			tab-content(title="immat" :beforeChange="leavingAppareil")
				head-or-tail(v-model="appareil.headSelected")
					template(v-slot:head-slot)
						v-select(
							id="immatriculation",
							:options="appareil.options",
							label="text",
							v-model="appareil.head",
						)
					template(v-slot:tail-slot)
						input(type='text', v-model="appareil.tail")

			tab-content(title="lieu" :beforeChange="leavingAerodrome")
				head-or-tail(v-model="aerodrome.headSelected")
					template(v-slot:head-slot)
						v-select(
							id="aerodrome",
							:options="aerodrome.options",
							label="text",
							v-model="aerodrome.head",
							@input="aerodromeChanged",
						)
					template(v-slot:tail-slot)
						input(type='text', v-model="aerodrome.tail")
						
			tab-content(title="galerie" :beforeChange="leavingGalerie")
				head-or-tail(v-model="galerie.headSelected")
					template(v-slot:head-slot)
						v-select(
							id="galerie",
							:options="galerie.options",
							label="text",
							v-model="galerie.head"
						)
					template(v-slot:tail-slot)
						input(type='text', v-model="galerie.tail")
						
			tab-content(title="exploitant" :beforeChange="leavingCompagnie")
				head-or-tail(v-model="compagnie.headSelected")
					template(v-slot:head-slot)
						v-select(
							id="compagnie",
							:options="compagnie.options",
							label="text",
							v-model="compagnie.head"
						)
					template(v-slot:tail-slot)
						input(type='text', v-model="compagnie.tail")
			
			tab-content(title="commentaire")
				b-form-textarea(
					id="commentaire",
					rows="3",
					max-rows="6",
					v-model="commentaire"
				)

			tab-content(title="review")
				b-list-group
					b-list-group-item(variant="primary") Photographe: {{ photographe.text }}
					b-list-group-item(v-if="photoData.avion") Avion: {{ photoData.avion.text }}
					b-list-group-item(v-if="photoData.appareil") Appareil: {{ photoData.appareil.text }}
					b-list-group-item(v-if="photoData.compagnie") Compagnie: {{ photoData.compagnie.text }}
					b-list-group-item(v-if="photoData.aerodrome") Aerodrome: {{ photoData.aerodrome.text }}
					b-list-group-item(v-if="photoData.galerie") Galerie: {{ photoData.galerie.text }}
					b-list-group-item(v-if="photoData.commentaire") {{ photoData.commentaire }}
					
		img(:src="tmpFileURL", width="500") 
			
		
</template>

<script>
import VueSelect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import {FormWizard, TabContent} from 'vue-form-wizard'
import HeadOrTail from './HeadOrTail.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { alertMixin } from './AlertMixin'

export default {
	
	components: {
		'form-wizard': FormWizard,
		'tab-content': TabContent,
		'v-select': VueSelect,
		'head-or-tail': HeadOrTail,
	},		
	
	data() {
		return {
			filex: null,
			acceptableImage: null,
			tmpFileURL: "",
			photographe: {},
			avion: {options: [], headSelected: true, head: null, tail: null},
			appareil: {options: [], headSelected: true, head: null, tail: null},
			compagnie: {options: [], headSelected: true, head: null, tail: null},
			aerodrome: {options: [], headSelected: true, head: null, tail: null},
			galerie: {options: [], headSelected: true, head: null, tail: null},
			commentaire: "",
		}
	},
	
	computed: {
		
		photoData() {
			var output = {}
			output.avion = this.extractData(this.avion)
			output.appareil = this.extractData(this.appareil)
			output.compagnie = this.extractData(this.compagnie)
			output.aerodrome = this.extractData(this.aerodrome)
			output.galerie = this.extractData(this.galerie)
			output.commentaire = this.commentaire
			return output
		},
		
	},
	
	mounted() {
		this.resetFile()
		this.getOptions('avions', this.avion)
		this.getOptions('galeries', this.galerie)
		this.getOptions('compagnies', this.compagnie)
		this.getOptions('aerodromes', this.aerodrome)
		this.axios.get(process.env.WEB_URL + 'profile') 
			.then(response => this.photographe = response.data.photographe)
			.catch(err => vm.showAxiosAlert(err, "danger"))
	},	
	
	mixins: [alertMixin],
	
	methods: {
		
		extractData(dataObject) {
			// extract data that will be entered in photoData	
			// example of dataObject: this.avion
			if (!dataObject.head && !dataObject.tail) return
			var output = {}
			if (dataObject.headSelected) {
				output.id = dataObject.head.id
				output.text = dataObject.head.text
			} else {
				output.text = dataObject.tail
			}
			return output
		},
		
		leavingAvion() {
			if (!this.photoData.avion) return false
			if (this.appareil.options.length == 0) this.appareil.headSelected = false
			else this.appareil.headSelected = true
			return true
		},

		leavingAerodrome()  {
			if (!this.photoData.aerodrome) return false
			if (this.galerie.options.length == 0) this.galerie.headSelected = false
			else this.galerie.headSelected = true
			return true
		},
		
		leavingAppareil() {return (this.photoData.appareil != null)},
		leavingCompagnie() {return (this.photoData.compagnie != null)},
		leavingGalerie() {return (this.photoData.galerie != null)},
		
		avionChanged(selected) {
			const id = (selected)? selected.id : false
			this.getAppareilOptions(id)
		},
		
		aerodromeChanged(selected) {
			const id = (selected)? selected.id : false
			this.getGalerieOptions(id)
		},
		
		getOptions(apicall, variable) {
			var vm = this
			const url = apicall + '/'
			vm.axios.get(url)
				.then(response => variable.options = response.data)
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		getAppareilOptions(avionId=false) {
			// reset appareil
			// if an avion is given, set appareil options filtered by avion
			var vm = this
			vm.appareil = {options: [], headSelected: true, head: null, tail: null}
			if (!avionId) return
			else vm.axios.get(`appareils/byAvion/${avionId}`)
				.then(response => vm.appareil.options = response.data)
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		getGalerieOptions(aerodromeId=false) {
			// reset galerie
			// if an aerodrome is given, set galerie options filtered by aerodrome
			var vm = this
			vm.galerie = {options: [], headSelected: true, head: null, tail: null}
			if (!aerodromeId) return
			else vm.axios.get(`galeries/byAerodrome/${aerodromeId}`)
				.then(response => vm.galerie.options = response.data)
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		imageAvailable() {return (this.tmpFileURL != "")},
		
		onFileChange: function(e) {
			this.acceptableImage = null
			const file = e.target.files[0]
			if (!file.type.match('image.*')) {
				this.acceptableImage = false
				this.resetFile()
				return
			}
			this.acceptableImage = true
      this.tmpFileURL = URL.createObjectURL(file)
		},
		
    resetFile() {
      this.$refs.fileinput.reset()
      this.tmpFileURL = ""
    },
    
    resetForm() {
			this.resetFile()
			this.$refs.formWizard.reset()
		},
		
		onComplete() {
			var vm = this
			var data = {jsonData: vm.photoData, photographe: vm.photographe}
			const FormData = require('form-data')
			var fileData = new FormData()
			let headers = {'Authorization': `Bearer ${process.env.JWT_API_KEY}`}
			// POST to API is restricted: use a key
			vm.axios.post("photouploads/", data, {'headers': headers})
				.then(output => output.data.id)
				.then(id => {
					const filename = `${id}.jpg`
					fileData.append('file', vm.filex, filename)
					fileData.append('path', process.env.UPLOAD_LOCATION)
					headers['Content-Type'] = 'multipart/form-data'
					return vm.axios.post("storage/putFile/", fileData, {'headers': headers})
				})
				.then(output => {
					vm.showAlert("Photo envoyée pour validation", "success")
					vm.resetForm()
				})
				.catch(err => vm.showAxiosAlert(err, "danger"))
		}, 
		
	},
	
}
	

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
