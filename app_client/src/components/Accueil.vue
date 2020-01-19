<template lang="pug">
	div(id='cover')

		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		b-container(class='nous_sommes text-center')
			h2 Nous sommes Spot'Air
			p Passionnés d'aéronautique et de photographie
		
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
			options: {autoplay: {delay: 3500, disableOnInteraction: false}},
			fileLocation: process.env.STORAGE_URL + process.env.PICTURE_LOCATION
		}
	},
	
	methods: {
		
		photoSelected(photo) {
			const galerieId = photo.galerie.id
			this.$router.push({ path: `/galeries/${galerieId}` })
		},
		
		photoToCarouselData(photo) {
			var output = photo
			output.url = `${this.fileLocation}${photo.id}.jpg`
			return output
		},
		
		getLatestPhotos() {
			const vm = this
			this.axios.get('/photos/recent/')
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
@import '../styles/custom_variables.scss';

.nous_sommes {
	font-family: 'PT Serif Caption';
}

.nous_sommes > p {
	font-size: 1.3em;
	font-style: italic;
	color: $color-secondary-1-4;
}

</style>
