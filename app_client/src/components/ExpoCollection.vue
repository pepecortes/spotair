<template lang="pug">
	div
		div(f-if: 'collectionAvailable', v-show='showThumbs')
			expo-form(
				:photos='thumbnails',
				v-model='thumbSelected',
			)
			
</template>

<script>
import ExpoForm from './ExpoForm.vue'
import Carousel from './Carousel.vue'

const _ = require('lodash')
const TRANSFER_SIZE = 50
// Number of items to load each time

export default {
	
	components: {
		'expo-form': ExpoForm,
		'carousel': Carousel,
	},
	
	props: {
		
		collection: {
			type: Array,
			default: () => []
		},
		
	},
	
	data() {
		return {
			thumbSelected: {},
			thumbnailLocation: process.env.STORAGE_URL + process.env.THUMBNAIL_LOCATION,
			photoLocation: process.env.STORAGE_URL + process.env.PICTURE_LOCATION,
		}
	},
	
	watch: {
		collection: function(newValue, oldValue) {
			//console.log(`ExpoCollection has photos: ${newValue.length}`) 
			//console.log(`photosAvailable: ${this.photosAvailable}`) 
			//console.log(`thumbnails: ${this.thumbnails.length}`) 
		},
	},
	
	computed: {
		collectionAvailable() {return !_.isEmpty(this.collection)},
		
		showThumbs() {return _.isEmpty(this.thumbSelected)},
		
		showCarousel() {return !this.showThumbs},
		
		//carouselAvailable() {
			//return (this.collectionAvailable && !_.isEmpty(this.selected))
		//},
		
		thumbnails() {
			if (!this.collectionAvailable) return []
			return this.collection.map(photo => {
				return Object.assign({url: `${this.thumbnailLocation}${photo.id}.jpg`}, photo)
			})
		},
		
	},
	
	//beforeMount() {},
	
	mounted() {
		// attach the scroll monitoring
		window.addEventListener('scroll', this.scrolling)
	},
	
	//beforeDestroy() {
		//window.removeEventListener('scroll', this.scrolling)
	//},
	
	methods: {
		
		//initPhotos() {
			//this.loadedPhotos = []
			//this.bufferPhotos = this.photos.map(photo => Object.assign({}, photo))
			//// clone photos into bufferPhotos
			//this.transfer([this.bufferPhotos, this.loadedPhotos, TRANSFER_SIZE])
			//document.body.scrollTop = document.documentElement.scrollTop = 0
		//},
		
		//clicked: function(photo) {
			//this.mutableValue = photo
			//this.$emit('input', photo)
		//},

		//transfer: function([input, output, count]) {
			//// transfer pictures from the buffer into the visible pictures
			//if (count <= 0 || input.length <= 0) return [input, output, count]
			//output.push(input.shift())
			//this.transfer([input, output, count-1])
		//},
		
		//scrolling: _.throttle(function() {
			//// need to lodash.throttle to avoid firing the event too often
			//let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom
			//if (windowRelativeBottom > document.documentElement.clientHeight + 800) return
			//this.loadMore(TRANSFER_SIZE)
			//}, 1000, {'trailing': false}),
			
		//loadMore: function(n) {
			//this.transfer([this.bufferPhotos, this.loadedPhotos, n])
		//}
		
	},
	
}
</script>

<style lang="scss">

	.expobox {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: flex-start;
	}
	
	.expobox img {
		margin-right: 0.4em;
		margin-bottom: 0.4em;
    cursor: pointer;
	}
	
</style>
