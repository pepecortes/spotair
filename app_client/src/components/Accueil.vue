<template lang="pug">

	div#cover

		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		b-container.nous_sommes.text-center
			h2 Nous sommes Spot'Air
			p Passionnés d'aéronautique et de photographie
		
		b-container(fluid)
			b-row
				b-col(cols="2")
				b-col(cols="8")
					carousel(
						v-if='carouselActive',
						:options='options',
						:photos='photos',
						v-model='photo',
						v-on:input='photoSelected',
						style="width:100%; height:80vh"
					)
				b-col(cols="2")
					div(v-b-toggle.tweetFeed, style="float: right")
						b-icon.when-opened(icon="chevron-up")
						b-icon.when-closed(icon="chevron-down")
					b-collapse#tweetFeed(visible)
						timeline(id="jcortesocana", sourceType="profile", :options="{ tweetLimit: '6' }")
						
</template>

<script>

import { Timeline } from 'vue-tweet-embed'
import { BIcon, BIconChevronUp, BIconChevronDown } from 'bootstrap-vue'
import { alertMixin } from './AlertMixin'
import carousel from './Carousel.vue'

export default {
	
	components: {
		BIcon,
    BIconChevronUp,
    BIconChevronDown,
    carousel,
    'timeline': Timeline,
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

.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
		display: none;
}

</style>
