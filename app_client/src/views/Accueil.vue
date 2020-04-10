<template lang="pug">

	div#cover

		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		b-container.nous_sommes.text-center(v-show="!silent")
			h2 Nous sommes Spot'Air
			p Passionnés d'aéronautique et de photographie
		
		b-container(fluid)
			b-row
				b-col(order-lg="2", lg="8")
					carousel#carousel(
						v-if='carouselActive',
						:options='options',
						:photos='photos',
						v-model='photo',
						v-on:input='photoSelected',
					)
					p.disclaimer(v-show="!silent") Association Spot'Air, Blagnac (31). Les photos de ce site ne sont pas libres de droits.
				b-col.text-center(order-lg="3", lg="2")
					div(v-show='!silent')
						p.secondary-header.text-center
						a.partenaires-logo(href="https://www.welove.aero/fr", target="_blank")
							img(:src="mediaURL + 'logo_we_love_aero.svg'", alt="logo", style="padding:0.5em;width:150px;")
						a.partenaires-logo(href="http://cap-aero.com", target="_blank")
							img(:src="mediaURL + 'logo_cap_aero.png'", alt="logo", style="padding:0.5em;width:150px;")
						a.partenaires-logo(href="http://www.numeriphot.com/", target="_blank")
							img(:src="mediaURL + 'logo_numeriphot.png'", alt="logo", style="padding:0.5em;width:150px;")
				b-col#lesNews(order-lg="1", lg="2")
					div(v-show='!silent')
						p.secondary-header.text-center Les News
						timeline(id="jcortesocana", sourceType="profile", :options="{ tweetLimit: '6', chrome: 'noborders noscrollbar transparent noheader' }")
						
</template>

<script>

import { Timeline } from 'vue-tweet-embed'
import { BIcon, BIconChevronUp, BIconChevronDown } from 'bootstrap-vue'
import { alertMixin } from '../mixins/Alert'
import carousel from '../components/Carousel.vue'

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
			fileLocation: process.env.STORAGE_URL + process.env.PICTURE_LOCATION,
			mediaURL: `${process.env.ASSETS_URL}icons/`,
		}
	},
	
	props: {
		silent: Boolean,
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

.secondary-header {
	font-family: 'PT Serif Caption';
	font-size: 1.3em;
	font-weight: bold;
}

.nous_sommes > p {
	font-style: italic;
	color: $color-secondary-1-4;
}

@media only screen and (min-width: 576px) and (max-width: 991px){
	
	#lesNews {
		margin: auto;
		width: 50%;
	}
	
}

@media only screen and (min-width: 992px) {
	
	#lesNews {
		overflow: auto;
		height: 78vh;
	}
	
}


#carousel {
	width: 100%;
	height: 76vh;
}

.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
		display: none;
}

.partenaires-logo {
	margin: auto;
}

.disclaimer {
	font-size: x-small;
	text-align: center;
	padding: 1.2rem;
}

</style>
