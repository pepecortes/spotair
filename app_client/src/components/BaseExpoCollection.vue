<template lang="pug">
	include BaseExpoCollection.pug
</template>

<script>
import ExpoForm from './ExpoForm.vue'
import Carousel from './Carousel.vue'

const _ = require('lodash')

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
		
		thumbnailLocation: {
			type: String,
			default: process.env.STORAGE_URL + process.env.THUMBNAIL_LOCATION,
		},
		
		photoLocation: {
			type: String,
			default: process.env.STORAGE_URL + process.env.PICTURE_LOCATION,
		},
		
	},
	
	data() {
		return {
			photoSelected: {},
			currentPhoto: {},
			showThumbs: true,
		}
	},
	
	computed: {
		
		collectionAvailable() {return !_.isEmpty(this.collection)},
		
		showCarousel() {return !this.showThumbs},
		
		thumbnails() {
			if (!this.collectionAvailable) return []
			return this.collection.map(photo => {
				return Object.assign({url: `${this.thumbnailLocation}${photo.id}.jpg`}, photo)
			})
		},
		
		photos() {
			if (!this.collectionAvailable) return []
			return this.collection.map(photo => {
				return Object.assign({url: `${this.photoLocation}${photo.id}.jpg`}, photo)
			})
		},
		
	},
		
	watch: {
		collection: function() {this.showThumbs = true},
	},
	
	methods: {
		slideUpdatedEvent(slide) {this.currentPhoto = slide},
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
