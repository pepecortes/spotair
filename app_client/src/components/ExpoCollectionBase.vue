<template lang="pug">
	include ExpoCollectionBase.pug
</template>

<script>
import ControlExpoCollection from './ControlExpoCollection.vue'
import Carousel from './Carousel.vue'

const _ = require('lodash')

export default {
	
	components: {
		'expo-form': ControlExpoCollection,
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
			blockAdmin: false, 
			// override if you need to add the template admin block
			// example: AdminExpoCollection
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
		align-items: center;
		justify-content: center;
	}
	
	.expobox img {
		margin-right: 0.4em;
		margin-bottom: 0.4em;
    cursor: pointer;
	}
	
</style>
