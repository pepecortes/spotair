<template lang="pug">

	div(id="fileUpload")
	
		form-wizard(title="", subtitle="")
		
			tab-content(title="test0")
				head-or-tail(ref='koko', head-button-text='Je ne la trouve pas !', tail-button-text='Retour vers sélection')
					template(v-slot:head-slot)
						input(type='text', v-model="alfa")
					template(v-slot:tail-slot)
						input(type='text', v-model="beta")
				b-button(type="button", v-on:click="submitAlfaBeta") SUBMIT
						
			tab-content(title="galerie")
				head-or-tail(head-button-text='Je ne la trouve pas !', tail-button-text='Retour vers sélection')
					template(v-slot:head-slot)
						v-select(
							id="galerie",
							:options="galerieOptions",
							label="text",
							v-model="x"
						)
							span(slot="no options") Aucun résultat
					template(v-slot:tail-slot)
						input(type='text', v-model="y")
			
			tab-content(title="upload", :beforeChange="imageAvailable")
				b-form-file(
					ref="fileinput",
					@change="onFileChange",
					v-model="formData.file",
					:state="Boolean(formData.file)",
					placeholder="Choose a file..."
				)
				b-button(type="button", variant="outline-success", v-on:click="resetButtonClicked") Reset			
				
			tab-content(title="second")
				h1 Second Tab
				b-button(type="button", variant="outline-danger", v-on:click="uploadButtonClicked") Upload
				
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
			formData: {file: null},
			uploadError: null,
			currentStatus: null,
			tmpFileURL: "",
			galerieOptions: [],
			x: null,
			y: null,
			alfa: null,
			beta: null,
			alfavisible: false,
			alfabeta: {nada: "denada"},
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
		}
	},
	
	mounted() {
		this.reset()
		this.getGalerieOptions()
	},
	
	methods: {
		
		submitAlfaBeta() {
			const isHead = this.$refs.koko.onHead
			this.alfabeta = (isHead)? this.alfa : this.beta
			console.log("AFTER SUBMIT " + JSON.stringify(this.alfabeta))
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
		
		getGalerieOptions() {
			var vm = this
			vm.axios.get('galeries/')
				.then(response => vm.galerieOptions = response.data)
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
