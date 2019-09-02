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
		photo-data-edit(v-model='photo')
		
		b-button(v-if='allValidated', type="button", variant="outline-success", v-on:click="validateButtonClicked") Valider
		b-button(type="button", variant="outline-danger", v-on:click="rejectButtonClicked") Rejeter
		
</template>

<script>
import { alertMixin } from './AlertMixin'
import PhotoDataEdit from './PhotoDataEdit.vue'


export default {
	
	beforeMount() {
		//var vm = this
		//vm.id = vm.$route.params.id
		//const url = `photouploads/${vm.id}`
		//const fileLocation = process.env.STORAGE_URL + process.env.UPLOAD_LOCATION
		//vm.photoURL =  `${fileLocation}${vm.id}.jpg`
		//vm.axios.get(url)
			//.then(response => {
				//vm.setInitialValue(response.data.jsonData)
				//vm.value.photographe = response.data.photographe
				//vm.value.dateUpload = response.data.createdAt
			//})
			//.catch(err => vm.showAxiosAlert(err, "danger"))
	},
	
	components: {
		'photo-data-edit': PhotoDataEdit,
	},	
	
	data() {
		return {
			id: null,
			value:
				{
					photographe: null, avion: null, appareil: null,
					galerie: null, compagnie: null, aerodrome: null,
					dateUpload: null, commentUpload: null, commentaire: null
				},
			photoURL: null,
		}
	},
	
	mixins: [alertMixin],
	
	methods: {
		
		//setInitialValue(data) {
			//this.$refs.avionValidator.setInitialValue(data.avion)
			//this.$refs.appareilValidator.setInitialValue(data.appareil)
			//this.$refs.galerieValidator.setInitialValue(data.galerie)
			//this.$refs.compagnieValidator.setInitialValue(data.compagnie)
			//this.$refs.aerodromeValidator.setInitialValue(data.aerodrome)
			//this.value.commentUpload = data.commentaire
		//},
			
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
