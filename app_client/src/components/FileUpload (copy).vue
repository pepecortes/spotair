<template lang="pug">

	div(id="fileUpload")
	
		form-wizard(title="", subtitle="", stepSize="xs")
		
			tab-content(title="avion", :beforeChange="leavingAvion")
				head-or-tail(ref='avion')
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
					
				b-button(type="button", v-on:click="submit") SUBMIT	
		
			tab-content(title="review")
				b-list-group
					b-list-group-item(variant="primary") Photographe: {{ photoData.photographe.text }}
					b-list-group-item(v-if="photoData.avion" ) Avion: {{ photoData.avion.text }}
					
				b-button(type="button", v-on:click="submit") SUBMIT	
			
			tab-content(title="photo", :beforeChange="imageAvailable")
				b-form-file(
					ref="fileinput",
					@change="onFileChange",
					v-model="formData.file",
					:state="Boolean(formData.file)",
					placeholder="Choose a file..."
				)
				b-button(type="button", variant="outline-success", v-on:click="resetButtonClicked") Reset		
		
						
			tab-content(title="immat" :beforeChange="leavingAppareil")
				head-or-tail(ref='appareil')
					template(v-slot:head-slot)
						v-select(
							id="immatriculation",
							:options="appareil.options",
							label="text",
							v-model="appareil.head",
						)
					template(v-slot:tail-slot)
						input(type='text', v-model="appareil.tail")
		
			tab-content(title="galerie" :beforeChange="leavingGalerie")
				head-or-tail(ref='galerie')
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
				head-or-tail(ref='compagnie')
					template(v-slot:head-slot)
						v-select(
							id="compagnie",
							:options="compagnie.options",
							label="text",
							v-model="compagnie.head"
						)
					template(v-slot:tail-slot)
						input(type='text', v-model="compagnie.tail")
						
			tab-content(title="lieu" :beforeChange="leavingAerodrome")
				head-or-tail(ref='aerodrome')
					template(v-slot:head-slot)
						v-select(
							id="aerodrome",
							:options="aerodrome.options",
							label="text",
							v-model="aerodrome.head"
						)
					template(v-slot:tail-slot)
						input(type='text', v-model="aerodrome.tail")
						
			tab-content(title="review")
				b-list-group
					b-list-group-item(variant="primary") Photographe: 
					b-list-group-item Avion: kokoloko 1
					
				b-button(type="button", v-on:click="submit") SUBMIT	
				

				
		img(:src="tmpFileURL", style="display: block; width: 500px;")
		
</template>

<script>
import VueSelect from 'vue-select'
import {FormWizard, TabContent} from 'vue-form-wizard'
import HeadOrTail from './HeadOrTail.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3

export default {
	
	components: {
		'form-wizard': FormWizard,
		'tab-content': TabContent,
		'v-select': VueSelect,
		'head-or-tail': HeadOrTail,
	},		
	
	data() {
		return {
			isMounted: false,
			formData: {file: null},
			uploadError: null,
			currentStatus: null,
			tmpFileURL: "",
			galerie: {options: [], head: null, tail: null},
			avion: {options: [], head: null, tail: null},
			appareil: {options: [], head: null, tail: null},
			compagnie: {options: [], head: null, tail: null},
			aerodrome: {options: [], head: null, tail: null},
			currentUser: {photographe: {}},
		}
	},
	
	computed: {
		apiURL () {return "storage/"},
		isInitial() {
			return this.currentStatus === STATUS_INITIAL;
		},
		isSaving() {
			return this.currentStatus === STATUS_SAVING;
		},
		isSuccess() {
			return this.currentStatus === STATUS_SUCCESS;
		},
		isFailed() {
			return this.currentStatus === STATUS_FAILED;
		},
		
		photoData() {
			if (!this.isMounted) return {photographe: "koko"}
			var output = {}
			const photographe = {userId: this.currentUser.photographe}
			const avion = (this.$refs.avion.onHead)? {avion: this.avion.head} : {avionInfo: this.avion.tail}
			//const galerie = (this.$refs.galerie.onHead)? {galerieId: this.galerie.head.id} : {galerieInfo: this.galerie.tail}
			//const avion = (this.$refs.avion.onHead)? {avionId: this.avion.head.id} : {avionInfo: this.avion.tail}
			//const appareil = (this.$refs.appareil.onHead)? {appareilId: this.appareil.head.id} : {appareilInfo: this.appareil.tail}
			//const compagnie = (this.$refs.compagnie.onHead)? {compagnieId: this.compagnie.head.id} : {compagnieInfo: this.compagnie.tail}
			//const aerodrome = (this.$refs.aerodrome.onHead)? {aerodromeId: this.aerodrome.head.id} : {aerodromeInfo: this.aerodrome.tail}

			//Object.assign(output, galerie, avion, appareil, compagnie, aerodrome, user)
			Object.assign(output, avion, photographe)
			return output
		},
		
	},
	
	mounted() {
		this.isMounted = true
		this.reset()
		this.getOptions('avions', this.avion)
		this.getOptions('galeries', this.galerie)
		this.getOptions('compagnies', this.compagnie)
		this.getOptions('aerodromes', this.aerodrome)
		this.axios.get(process.env.WEB_URL + 'profile') 
			.then(response => this.currentUser = response.data)
			.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
	},
	
	methods: {
		
		leavingAvion() {
			if (!this.avion.head && !this.avion.tail) return false
			if (this.appareil.options.length == 0) this.$refs.appareil.goToTail()
			else this.$refs.appareil.goToHead()
			return true
		},
		
		leavingAppareil() {
			if (!this.appareil.head && !this.appareil.tail) return false
			return true
		},
		
		leavingGalerie() {
			if (!this.galerie.head && !this.galerie.tail) return false
			return true
		},
		
		leavingCompagnie() {
			if (!this.compagnie.head && !this.compagnie.tail) return false
			return true
		},
		
		leavingAerodrome() {
			if (!this.aerodrome.head && !this.aerodrome.tail) return false
			return true
		},
		
		avionChanged(selected) {
			const id = (selected)? selected.id : false
			this.getAppareilOptions(id)
		},
		
		submit() {
			console.log("before SUBMITTING " + JSON.stringify(this.photoData))
		},
		
		imageAvailable() {
			return (this.tmpFileURL != "")
		},
		
		onFileChange(e) {
			const file = e.target.files[0]
			if (!file.type.match('image.*')) {this.reset()}
      this.tmpFileURL = URL.createObjectURL(file)
		},
		
		resetButtonClicked () {
			this.reset()
		},
    
		uploadButtonClicked() {
			this.upload()
		},
		
    reset() {
      this.$refs.fileinput.reset()
			this.currentStatus = STATUS_INITIAL
			this.uploadError = null
      this.tmpFileURL = ""
    },
		
		upload() {
			var vm = this
			vm.currentStatus = STATUS_SAVING
			const url = vm.apiURL + "putFile"
			
			var FormData = require('form-data')
			var myform = new FormData()
			myform.append('myfile', vm.formData.file)
			
			//vm.axios.post(url, myform, {headers: {'Content-Type': 'multipart/form-data'}})
				//.then(output => {
					//vm.currentStatus = STATUS_SUCCESS
					//const url = process.env.STORAGE_URL + vm.formData.file.name
					//console.log("URL: " + url)
					////window.location.href = url
				//})
				//.catch(err => {
					//this.currentStatus = STATUS_FAILED;
					//console.log("error: " + err)
				//})
			
		},
		
		getOptions(apicall, variable) {
			var vm = this
			const url = apicall + '/'
			vm.axios.get(url)
				.then(response => variable.options = response.data)
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
		
		getAppareilOptions(avionId=false) {
			// if an avion is given, filter appareil by avion
			var vm = this
			if (!avionId) vm.appareil.options = []
			else vm.axios.get(`appareils/byAvion/${avionId}`)
							.then(response => vm.appareil.options = response.data)
							.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
		
	},

}
	

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
