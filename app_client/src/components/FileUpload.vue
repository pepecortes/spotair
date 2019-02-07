<template lang="pug">

	div(id="fileUpload")
		b-form-file(
			multiple,
			ref="fileinput",
			v-model="formData.files",
			:state="Boolean(formData.files)",
			placeholder="Choose a file...",
			accept="image/*"
		)
		div(class="mt-3") Selected files:  {{formData.files && formData.files.length}}
		div(class="mt-3") Status:  {{currentStatus}}
		b-button(type="button", variant="outline-danger", v-on:click="uploadButtonClicked") Upload
		b-button(type="button", variant="outline-success", v-on:click="resetButtonClicked") Reset
		
</template>

<script>
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3

export default {
		
	data() {
		return {
			formData: {files: []},
			//files: [],
			uploadError: null,
			currentStatus: null,
			//uploadFieldName: 'photos'
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
			vm.axios.post(url, vm.formData)
				.then(output => {
					vm.currentStatus = STATUS_SUCCESS
					console.log("success " + JSON.stringify(output.data))
				})
				.catch(err => {
					this.currentStatus = STATUS_FAILED;
					console.log("error: " + err)
				})
			

			//upload(formData)
				//.then(x => {
					//this.uploadedFiles = [].concat(x);
					//this.currentStatus = STATUS_SUCCESS;
				//})
				//.catch(err => {
					//this.uploadError = err.response;
					//this.currentStatus = STATUS_FAILED;
				//});
		},
		
	},

}
	

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
