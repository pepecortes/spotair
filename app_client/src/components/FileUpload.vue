<template lang="pug">

	div(id="fileUpload")
		b-form-file(
			ref="fileinput",
			v-model="formData.file",
			:state="Boolean(formData.file)",
			placeholder="Choose a file..."
		)
		div(class="mt-3") Selected files:  {{formData.file && formData.file.name}}
		div(class="mt-3") Status:  {{currentStatus}}
		b-button(type="button", variant="outline-danger", v-on:click="uploadButtonClicked") Upload
		b-button(type="button", variant="outline-success", v-on:click="resetButtonClicked") Reset
		
</template>

<script>
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3

export default {
		
	data() {
		return {
			//file: null,
			formData: {file: null},
			uploadError: null,
			currentStatus: null,
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
    },
		
		upload() {
			var vm = this
			vm.currentStatus = STATUS_SAVING
      //this.$v.formData.$touch()
			const url = vm.apiURL + "putFile"
			
			var FormData = require('form-data')
			var myform = new FormData()
			myform.append('alfa', 'ḱoko')
			myform.append('myfile', vm.formData.file)
			
			vm.axios.post(url, myform, {headers: {'Content-Type': 'multipart/form-data'}})
				.then(output => {
					vm.currentStatus = STATUS_SUCCESS
					console.log("success " + JSON.stringify(output.data))
				})
				.catch(err => {
					this.currentStatus = STATUS_FAILED;
					console.log("error: " + err)
				})
			
		},
		
	},

}
	

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
