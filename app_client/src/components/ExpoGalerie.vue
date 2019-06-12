<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		h4(v-if='galerieAvailable') {{ galerie.text }}
		
		div(v-if='galerieAvailable', v-show='showGalerie')
			expo-form(
				:photos='thumbnails',
				v-model='selected',
				v-on:input='photoSelected',
			)
			
		div(v-if='carouselAvailable && showCarousel')
			carousel(
				style="width:100%; height:80vh",
				:photos='photos',
				v-model='selected',
				v-on:input='displayGalerie',
			)
</template>

<script>

import { alertMixin } from './AlertMixin'
import ExpoForm from './ExpoForm.vue'
import Carousel from './Carousel.vue'

const _ = require('lodash')

export default {
	
	components: {
		'expo-form': ExpoForm,
		'carousel': Carousel,
	},
	
	mixins: [alertMixin],
	
	data() {
		return {
			showGalerie: false,
			galerieId: null,
			photos: [],
			thumbnails: [],
			galerie: {},
			selected: {},
			thumbnailLocation: process.env.STORAGE_URL + process.env.THUMBNAIL_LOCATION,
			photoLocation: process.env.STORAGE_URL + process.env.PICTURE_LOCATION,
		}
	},
	
	computed: {
		showCarousel() {return !this.showGalerie},
		galerieAvailable() {return !_.isEmpty(this.galerie)},
		carouselAvailable() {
			return (this.galerieAvailable && !_.isEmpty(this.selected))
		},
	},
		
	beforeMount() {
		this.galerieId = this.$route.params.id
		this.buildGalerie(this.galerieId)
	},

	methods: {
		
		addURL: function(fileLocation) {
			return (photo) => photo.url = `${fileLocation}${photo.id}.jpg`
		},
		
		buildGalerie(galerieId) {
			const vm = this
			vm.axios.get(`photos/byGalerie/${galerieId}`)
				.then(response => {
					if (response.data.length == 0) throw new Error("Aucune photo dans la galerie")
					vm.photos = _.cloneDeep(response.data)
					vm.thumbnails = _.cloneDeep(response.data)
					vm.photos.map(this.addURL(vm.photoLocation))
					vm.thumbnails.map(this.addURL(vm.thumbnailLocation))
					vm.galerie = vm.photos[0].galerie
					vm.showGalerie = true
				})
				.catch(err => vm.showAxiosAlert(err))			
		},
		
		photoSelected(photo) {
			this.showGalerie = false
		},
		
		displayGalerie() {
			this.showGalerie = true
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
