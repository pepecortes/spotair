<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		div(v-if='galerieActive')
			h4 {{ galerie.text }}
			expo-form(
				:photos='photos',
				v-model='selected',
				@input='inputChange',
				:fileLocation='fileLocation',
			)
</template>

<script>

import { alertMixin } from './AlertMixin'
import ExpoForm from './ExpoForm.vue'

export default {
	
	components: {
		'expo-form': ExpoForm
	},
	
	mixins: [alertMixin],
	
	data() {
		return {
			galerieActive: false,
			id: null,
			photos: [],
			galerie: {},
			selected: null,
			fileLocation: process.env.STORAGE_URL + process.env.THUMBNAIL_LOCATION
		}
	},	
		
	beforeMount() {
		this.id = this.$route.params.id
		// TEST
		this.id = (this.$route.params.id == null)? 1351 : this.$route.params.id
		this.getGaleriePhotos(this.id)
	},

	methods: {
		
		photoToGalerieData(photo) {
			var output = photo
			output.url = `${this.fileLocation}${photo.id}.jpg`
			return output
		},
		
		getGaleriePhotos(galerieId) {
			const vm = this
			vm.axios.get(`photos/byGalerie/${galerieId}`)
				.then(response => {
					if (response.data.length == 0) throw new Error("Aucune photo dans la galerie")
					vm.photos = response.data.map(this.photoToGalerieData)
					vm.galerie = vm.photos[0].galerie
					vm.galerieActive = true
				})
				.catch(err => vm.showAxiosAlert(err))			
		},
		
		// TEST
		inputChange(event) {
			console.log("value " + JSON.stringify(this.selected))
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
