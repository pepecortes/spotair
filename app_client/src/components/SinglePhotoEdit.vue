<template lang="pug">
	div(id="SinglePhotoEdit")
	
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		img(:src="photoURL", width="400")
		photo-data-edit(:id='id')
		
		b-button(type="button", variant="outline-success", v-on:click="validateButtonClicked") Valider
		b-button(type="button", variant="outline-danger", v-on:click="rejectButtonClicked") Rejeter
</template>

<script>
import { alertMixin } from './AlertMixin'
import PhotoDataEdit from './PhotoDataEdit.vue'

export default {
	
	props: {
		id: {
			type: String,
			default: null
		},
	},
	
	beforeMount() {
		var vm = this
		const url = `photos/${vm.id}`
		const fileLocation = process.env.STORAGE_URL + process.env.PICTURE_LOCATION
		vm.photoURL =  `${fileLocation}${vm.id}.jpg`
	},
	
	components: {
		'photo-data-edit': PhotoDataEdit,
	},	
	
	data() {
		return {
			photo: null,
			photoURL: null,
		}
	},
	
	mixins: [alertMixin],
	
	methods: {
			
		validateButtonClicked() {
			var vm = this
			var createdId
			vm.$v.value.$touch()
      if (vm.$v.value.$invalid) return
			vm.axios.post(`photos/validateUpload/${vm.id}`, vm.value)
				.then(response => console.log(JSON.stringify(response.data)))
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
			
		rejectButtonClicked() {
			this.axios.put(`photoUploads/reject/${this.id}`)
				.then(response => console.log(JSON.stringify(response.data)))
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
