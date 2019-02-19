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
			tab-content(title="second")
				h1 Second Tab
				b-button(type="button", variant="outline-danger", v-on:click="uploadButtonClicked") Upload
				
		img(:src="tmpFileURL", style="display: block; width: 500px;")
		
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3

export default {
	
	components: {
		'form-wizard': FormWizard,
		'tab-content': TabContent,
	},		
	
	data() {
		return {
			formData: {file: null},
			uploadError: null,
			currentStatus: null,
			tmpFileURL: "",
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
		
	},

}
	

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
