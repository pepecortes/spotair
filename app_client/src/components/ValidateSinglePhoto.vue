<template lang="pug">

	div(id="validateSinglePhoto")
	
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		b-form-input(v-model='idPhoto', type='text', placeholder='enter a photo id', @change='idPhotoChanged')
		
		validator-input(:options='avionOptions', v-model='avionSelection')
		
</template>

<script>
//import {FormWizard, TabContent} from 'vue-form-wizard'
//import HeadOrTail from './HeadOrTail.vue'
//import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import ValidatorInput from './ValidatorInput.vue'
import { alertMixin } from './AlertMixin'

export default {
	
	components: {
		'validator-input': ValidatorInput,
		//'form-wizard': FormWizard,
		//'tab-content': TabContent,
		//'head-or-tail': HeadOrTail,
	},		
	
	data() {
		return {
			idPhoto: null,
			avionOptions: ['koko', 'kaka'],
			avionSelection: 'koko',
		}
	},
	
	//computed: {
		
		//photoData() {
			//var output = {}
			//output.avion = this.extractData(this.avion)
			//output.appareil = this.extractData(this.appareil)
			//output.compagnie = this.extractData(this.compagnie)
			//output.aerodrome = this.extractData(this.aerodrome)
			//output.galerie = this.extractData(this.galerie)
			//return output
		//},
		
	//},
	
	mounted() {
		//return
		//this.resetFile()
		this.getOptions('avions')
		//this.getOptions('galeries', this.galerie)
		//this.getOptions('compagnies', this.compagnie)
		//this.getOptions('aerodromes', this.aerodrome)
		//this.axios.get(process.env.WEB_URL + 'profile') 
			//.then(response => this.photographe = response.data.photographe)
			//.catch(err => vm.showAxiosAlert(err, "danger"))
	},	
	
	mixins: [alertMixin],
	
	methods: {
		
		idPhotoChanged(id) {
			console.log("ID: " + id)
		},
		
		//extractData(dataObject) {
			//// extract data that will be entered in photoData	
			//// example of dataObject: this.avion
			//if (!dataObject.head && !dataObject.tail) return
			//var output = {}
			//if (dataObject.headSelected) {
				//output.id = dataObject.head.id
				//output.text = dataObject.head.text
			//} else {
				//output.text = dataObject.tail
			//}
			//return output
		//},
		
		//leavingAvion() {
			//if (!this.photoData.avion) return false
			//if (this.appareil.options.length == 0) this.appareil.headSelected = false
			//else this.appareil.headSelected = true
			//return true
		//},
		
		//leavingAppareil() {return (this.photoData.appareil != null)},
		//leavingCompagnie() {return (this.photoData.compagnie != null)},
		//leavingAerodrome() {return (this.photoData.aerodrome != null)},
		//leavingGalerie() {return (this.photoData.galerie != null)},
		
		//avionChanged(selected) {
			//const id = (selected)? selected.id : false
			//this.getAppareilOptions(id)
		//},
		
		getOptions(apicall, variable) {
			//return
			var vm = this
			const url = apicall + '/'
			vm.axios.get(url)
				.then(response => {
					vm.avionOptions = response.data
					vm.avionSelection = vm.avionOptions[1] // FOR TESTING PURPOSES
				})
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		//getAppareilOptions(avionId=false) {
			//// reset appareil
			//// if an avion is given, set appareil options filtered by avion
			//var vm = this
			//vm.appareil = {options: [], headSelected: true, head: null, tail: null}
			//if (!avionId) return
			//else vm.axios.get(`appareils/byAvion/${avionId}`)
				//.then(response => vm.appareil.options = response.data)
				//.catch(err => vm.showAxiosAlert(err, "danger"))
		//},
		
		//imageAvailable() {return (this.tmpFileURL != "")},
		
		//onFileChange: function(e) {
			//this.acceptableImage = null
			//const file = e.target.files[0]
			//if (!file.type.match('image.*')) {
				//this.acceptableImage = false
				//this.resetFile()
				//return
			//}
			//this.acceptableImage = true
      //this.tmpFileURL = URL.createObjectURL(file)
		//},
		
    //resetFile() {
      //this.$refs.fileinput.reset()
      //this.tmpFileURL = ""
    //},
    
    //resetForm() {
			//this.resetFile()
			//this.$refs.formWizard.reset()
		//},
		
		//onComplete() {
			//var vm = this
			//var data = {jsonData: vm.photoData, photographe: vm.photographe}
			//const FormData = require('form-data')
			//var fileData = new FormData()
			
			//vm.axios.post("photouploads/", data)
				//.then(output => output.data.id)
				//.then(id => {
					//const filename = `${id}.jpg`
					//fileData.append('file', vm.filex, filename)
					//fileData.append('path', process.env.UPLOAD_LOCATION)
					//return vm.axios.post("storage/putFile/", fileData, {headers: {'Content-Type': 'multipart/form-data'}})
				//})
				//.then(output => {
					//vm.showAlert("Photo envoyée pour validation", "success")
					//vm.resetForm()
				//})
				//.catch(err => vm.showAxiosAlert(err, "danger"))
		//}, 
		
	},
	
}
	

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
