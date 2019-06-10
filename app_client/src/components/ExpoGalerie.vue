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
				:photos='thumbnails',
				v-model='selected',
				@input='inputChange',
			)
			
		div(v-if='carouselActive')
			carousel(
				style="width:100%; height:80vh",
				:photos='photos',
				v-model='selected',
			)
</template>

<script>

import { alertMixin } from './AlertMixin'
import ExpoForm from './ExpoForm.vue'
import Carousel from './Carousel.vue'

export default {
	
	components: {
		'expo-form': ExpoForm,
		'carousel': Carousel,
	},
	
	mixins: [alertMixin],
	
	data() {
		return {
			galerieActive: false,
			carouselActive: false,
			id: null,
			photos: [],
			thumbnails: [],
			galerie: {},
			selected: null,
			thumbnailLocation: process.env.STORAGE_URL + process.env.THUMBNAIL_LOCATION,
			photoLocation: process.env.STORAGE_URL + process.env.PICTURE_LOCATION,
		}
	},	
		
	beforeMount() {
		this.id = this.$route.params.id
		this.getGaleriePhotos(this.id)
	},

	methods: {
		
		photoToGalerieData(fileLocation) {return function(photo) {
			var output = photo
			output.url = `${fileLocation}${photo.id}.jpg`
			return output
		}},
		
		getGaleriePhotos(galerieId) {
			const vm = this
			vm.axios.get(`photos/byGalerie/${galerieId}`)
				.then(response => {
					if (response.data.length == 0) throw new Error("Aucune photo dans la galerie")
					var photos = JSON.parse(JSON.stringify(response.data))
					var thumbnails = JSON.parse(JSON.stringify(response.data))
					vm.photos = photos.map(this.photoToGalerieData(vm.photoLocation))
					vm.thumbnails = thumbnails.map(this.photoToGalerieData(vm.thumbnailLocation))
					vm.galerie = vm.photos[0].galerie
					vm.galerieActive = true
				})
				.catch(err => vm.showAxiosAlert(err))			
		},
		
		// TEST
		// DOES NOT WORK: how to go to the selected photo in the carousel?
		inputChange(event) {
			console.log("event "+ JSON.stringify(event))
			this.selected = this.photos[5]
			this.galerieActive = false
			this.carouselActive = true
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
