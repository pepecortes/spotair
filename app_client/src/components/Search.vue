<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		h4(v-if='photosAvailable') Results: {{ searchResults.length}} / Photos: {{ photos.length }} / Thumbs: {{ thumbnails.length }}
		
		div(v-if='photosAvailable', v-show='showExpo')
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
				v-on:input='displayExpo',
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
			searchString: null,
			searchResults: [],
			selected: {},
			showExpo: false,
			thumbnailLocation: process.env.STORAGE_URL + process.env.THUMBNAIL_LOCATION,
			photoLocation: process.env.STORAGE_URL + process.env.PICTURE_LOCATION,
		}
	},
	
	computed: {
		
		photosAvailable() {return !_.isEmpty(this.searchResults)},
		
		showCarousel() {return !this.showExpo},
		
		carouselAvailable() {
			return (this.photosAvailable && !_.isEmpty(this.selected))
		},
		
		photos() {
			if (this.searchResults.length == 0) return []
			return this.searchResults.map(photo => {
				return Object.assign({url: `${this.photoLocation}${photo.id}.jpg`}, photo)
			})
		},
		
		thumbnails() {
			if (this.searchResults.length == 0) return []
			return this.searchResults.map(photo => {
				return Object.assign({url: `${this.thumbnailLocation}${photo.id}.jpg`}, photo)
			})
		},
		
	},
	
	watch: {
		searchString: function(newValue, oldValue) {
      const vm = this
			vm.resetAlert()
      newValue = newValue.replace('%', '')
      const apiCall = `search/fts?q=${newValue}`
			vm.$loading(true)
      vm.axios.get(apiCall)
				.then(response => {
					vm.searchResults = response.data
					if (vm.searchResults.length == 0)	vm.showAlert("Aucun résultat")
					this.showExpo = true
					this.$loading(false)
				})
				.catch(err => {vm.showAxiosAlert(err); this.$loading(false)})	
    },
	},
	
	mounted() {
		this.searchString = this.$route.query.searchString
	},
	
	beforeRouteUpdate (to, from, next) {
		this.searchString = to.query.searchString
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    next()
  },

	methods: {
		
		photoSelected(photo) {
			this.showExpo = false
		},
		
		displayExpo() {
			this.showExpo = true
		},
		
	},
	
}
</script>

<style lang="scss">

</style>
