<template lang="pug">

	div(id="fileUpload")
	
		form-wizard(title="", subtitle="")
		
			tab-content(title="upload", :beforeChange="imageAvailable")
				b-form-file(
					ref="fileinput",
					@change="onFileChange",
					v-model="formData.file",
					:state="Boolean(formData.file)",
					placeholder="Choose a file..."
				)
				b-button(type="button", variant="outline-success", v-on:click="resetButtonClicked") Reset
				
			tab-content(title="galerie", :beforeChange="imageAvailable")
			
				b-button(v-b-toggle="'collapse2'" class="m-1") Je ne la trouve pas !
			
				b-collapse(id="collapse2")
					p Je ne la trouve pas !
			 
				b-collapse(visible id="collapse2")
					b-form-group(
						label="Galerie",
						label-for="galerie"
					)
						v-select(
							id="galerie",
							:options="galerieOptions",
							label="text",
						)
							span(slot="no options") Aucun résultat				
				
			tab-content(title="second")
				h1 Second Tab
				b-button(type="button", variant="outline-danger", v-on:click="uploadButtonClicked") Upload
				
		img(:src="tmpFileURL", style="display: block; width: 500px;")
		
</template>

<script>
import VueSelect from 'vue-select'
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3

export default {
	
	components: {
		'form-wizard': FormWizard,
		'tab-content': TabContent,
		'v-select': VueSelect,
	},		
	
	data() {
		return {
			formData: {file: null},
			uploadError: null,
			currentStatus: null,
			tmpFileURL: "",
			galerieOptions: [],
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
