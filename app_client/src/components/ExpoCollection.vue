<template lang="pug">
	div
		div(v-if='collectionAvailable', v-show='showThumbs')
			expo-form(
				:photos='thumbnails',
				v-model='photoSelected',
				v-on:input='showThumbs = false',
			)
		div(v-if='collectionAvailable && showCarousel')
			carousel(
				style="width:100%; height:80vh",
				:photos='photos',
				v-model='photoSelected',
				v-on:input='showThumbs = true',
			)
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
		
	},
	
	data() {
		return {
			photoSelected: {},
			showThumbs: true,
			thumbnailLocation: process.env.STORAGE_URL + process.env.THUMBNAIL_LOCATION,
			photoLocation: process.env.STORAGE_URL + process.env.PICTURE_LOCATION,
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
