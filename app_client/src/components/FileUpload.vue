<template lang="pug">

	div(id="fileUpload")
	
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
	
		b-container
		
			form-wizard(
				ref="formWizard",
				title="PICTADD",
				subtitle="télechargement de photos pour validation",
				stepSize="xs",
				:color="tabColor", :errorColor="errorTabColor",
				@on-complete="onComplete"
			)
			
				template(slot="next")
					b-button(type="button", variant="outline-success")
						b-icon(icon="arrow-right")
				template(slot="prev")
					b-button(type="button", variant="outline-success")
						b-icon(icon="arrow-left")
				template(slot="finish")
					b-button(type="button", variant="success")
						b-icon(icon="check")
				
				tab-content(title="photo", :beforeChange="imageAvailable")
					b-input-group
						b-button(type="button", squared, variant="gray-300", v-on:click="resetFile")
							b-icon(icon="x")
						b-form-file(
							ref="fileinput",
							@change="onFileChange",
							v-model="filex",
							:state="acceptableImage",
							browse-text="Choisir",
							placeholder="Télécharger une photo...",
							v-on:input='nextTab(true)',
							autofocus,
						)

				tab-content(title="avion", :beforeChange="leavingAvion")
					head-or-tail(v-model="avion.headSelected", @toggle="toggle(avion)")
						template(v-slot:head-slot)
							v-select(
								id="avion",
								:options="avion.options",
								label="text",
								v-model="avion.head",
								v-on:input='afterAvionSelected(avion.head)',
							)
						template(v-slot:tail-slot)
							b-form-input(type='text', placeholder="Renseignez...", v-model="avion.tail", v-on:keyup.enter='nextTab(avion.tail)')
							
				tab-content(title="immat" :beforeChange="leavingAppareil")
					head-or-tail(v-model="appareil.headSelected", @toggle="toggle(appareil)")
						template(v-slot:head-slot)
							v-select(
								id="immatriculation",
								:options="appareil.options",
								label="text",
								v-model="appareil.head",
								v-on:input='nextTab(appareil.head)',
							)
						template(v-slot:tail-slot)
							b-form-input(type='text', placeholder="Renseignez...", v-model="appareil.tail", v-on:keyup.enter='nextTab(appareil.tail)')

				tab-content(title="lieu" :beforeChange="leavingAerodrome")
					head-or-tail(v-model="aerodrome.headSelected", @toggle="toggle(aerodrome)")
						template(v-slot:head-slot)
							v-select(
								id="aerodrome",
								:options="aerodrome.options",
								label="text",
								v-model="aerodrome.head",
								v-on:input='afterAerodromeSelected(aerodrome.head)',
							)
						template(v-slot:tail-slot)
							b-form-input(type='text', placeholder="Renseignez...", v-model="aerodrome.tail", v-on:keyup.enter='nextTab(aerodrome.tail)')
							
				tab-content(title="galerie" :beforeChange="leavingGalerie")
					head-or-tail(v-model="galerie.headSelected", @toggle="toggle(galerie)")
						template(v-slot:head-slot)
							v-select(
								id="galerie",
								:options="galerie.options",
								label="text",
								v-model="galerie.head",
								v-on:input='nextTab(galerie.head)',
							)
						template(v-slot:tail-slot)
							b-form-input(type='text', placeholder="Renseignez...", v-model="galerie.tail", v-on:keyup.enter='nextTab(galerie.tail)')
							
				tab-content(title="exploitant" :beforeChange="leavingCompagnie")
					head-or-tail(v-model="compagnie.headSelected", @toggle="toggle(compagnie)")
						template(v-slot:head-slot)
							v-select(
								id="compagnie",
								:options="compagnie.options",
								label="text",
								v-model="compagnie.head",
								v-on:input='nextTab(compagnie.head)',
							)
						template(v-slot:tail-slot)
							b-form-input(type='text', placeholder="Renseignez...", v-model="compagnie.tail", v-on:keyup.enter='nextTab(compagnie.tail)')
				
				tab-content(title="commentaire")
					b-form-textarea(
						id="commentaire",
						rows="3",
						max-rows="6",
						v-model="commentUpload",
						placeholder="Entrez votre commentaire",
						trim,
					)

				tab-content(title="review")
					b-list-group
						b-list-group-item(variant="primary") Photographe: {{ photographe.text }}
						b-list-group-item(v-if="photoData.avion") Avion: {{ photoData.avion.text }}
						b-list-group-item(v-if="photoData.appareil") Appareil: {{ photoData.appareil.text }}
						b-list-group-item(v-if="photoData.compagnie") Compagnie: {{ photoData.compagnie.text }}
						b-list-group-item(v-if="photoData.aerodrome") Aerodrome: {{ photoData.aerodrome.text }}
						b-list-group-item(v-if="photoData.galerie") Galerie: {{ photoData.galerie.text }}
						b-list-group-item(v-if="photoData.commentUpload") {{ photoData.commentUpload }}
						
			b-img(:src="tmpFileURL", rounded, center, fluid)
		
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import HeadOrTail from './HeadOrTail.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { alertMixin } from './AlertMixin'
import { BIcon, BIconArrowRight, BIconArrowLeft, BIconX, BIconCheck } from 'bootstrap-vue'
import colors from '../styles/colors.scss'

import CustomVueMultiselect from "./CustomVueMultiselect.vue" 

export default {
	
	components: {
    'v-select': CustomVueMultiselect,
		'form-wizard': FormWizard,
		'tab-content': TabContent,
		'head-or-tail': HeadOrTail,
		BIcon,
    BIconArrowRight,
    BIconArrowLeft,
    BIconX,
    BIconCheck,
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
			commentUpload: "",
			tabColor: colors.success,
			errorTabColor: colors.danger,
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
			output.commentUpload = this.commentUpload
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
	
	watch: {
		avion: {
			handler(avion) {
				if (!avion.head) this.appareil = {options: [], headSelected: true, head: null, tail: null}
			},
			deep: true
		},
		aerodrome: {
			handler(aerodrome) {
				if (!aerodrome.head) this.galerie = {options: [], headSelected: true, head: null, tail: null}
			},
			deep: true
		},
	},

	methods: {
		
		afterAvionSelected(selection) {
			this.appareil = {options: [], headSelected: true, head: null, tail: null}
			if (!selection) return
			this.axios.get(`appareils/byAvion/${selection.id}`)
				.then(response => this.appareil.options = response.data)
				.then(() => this.$refs.formWizard.nextTab())
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		afterAerodromeSelected(selection) {
			this.galerie = {options: [], headSelected: true, head: null, tail: null}
			if (!selection) return
			this.axios.get(`galeries/byAerodrome/${selection.id}`)
				.then(response => this.galerie.options = response.data)
				.then(() => this.$refs.formWizard.nextTab())
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		nextTab(data) {
			// If user entered data, go to next tab
			if (!data) return
			this.$refs.formWizard.nextTab()
		},
		
		toggle(data) {
			// If toggle between head and tail, erase the previous selection
			if (data.headSelected) data.tail = null
			else data.head = null
		},
		
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
		
		getOptions(apicall, variable) {
			var vm = this
			const url = apicall + '/'
			vm.axios.get(url)
				.then(response => variable.options = response.data)
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

</style>
