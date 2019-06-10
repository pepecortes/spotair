<template lang="pug">
	div(id='cover')

		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		button(v-on:click="goto") goto
		p value: {{ photo.id }}
		
		carousel(
			v-if='carouselActive',
			:options='options',
			:photos='photos',
			v-model='photo',
			v-on:input='photoSelected',
			style="width:100%; height:80vh"
		)
</template>

<script>

import { alertMixin } from './AlertMixin'
import carousel from './Carousel.vue'

export default {
	
	components: {
    carousel
	},
	
	mixins: [alertMixin],

	beforeMount () {
		this.getLatestPhotos()
	},
	
	data() {
		return {
			carouselActive: false,
			photos: [],
			photo: {},
			options: {
				autoplay: {delay: 3500, disableOnInteraction: true},
			},
			fileLocation: process.env.STORAGE_URL + process.env.PICTURE_LOCATION
		}
	},
	
	methods: {
		
		// TEST
		goto() {
			this.photo = this.photos[5]
		},
		
		photoSelected(photo) {
			console.log('photo Selected ' + photo.id)
		},
		
		photoToCarouselData(photo) {
			var output = photo
			output.url = `${this.fileLocation}${photo.id}.jpg`
			return output
		},
		
		getLatestPhotos() {
			const vm = this
			this.axios.get('/photos/recent')
				.then(response =>  {
					vm.photos = response.data.map(this.photoToCarouselData)
					vm.carouselActive = true
				})
				.catch(err => vm.showAxiosAlert(err))
		},
			
	},
	
}

</script>

<style lang="scss">

</style>
