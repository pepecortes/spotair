<template lang="pug">
	div(ref="carousel", id='carousel', style="width:100vw;height:80vh")
		swiper(:options="swiperOption", ref="mySwiper")
			swiper-slide(v-for='photo in items', v-bind:key='photo.id')
				b-img(:src='getImgSrc(photo)', v-bind:style='imgStyle(photo)')
		div(class="swiper-button-next")
		div(class="swiper-button-prev")
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

/** 
 * TEST
 * const chance = require('chance').Chance()
 * const _ = require('lodash')
 * `https://picsum.photos/${img.w}/${img.h}/?image=${img.id}`
 */

export default {
	
	components: {    
		swiper,
    swiperSlide
	},
	
	mounted () {
		this.getLatestPhotos()
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
	},  
	
	beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
	
	data() {
		return {
			carouselDimensions: {W:0, H:0},
			
			swiperOption: {
					lazy: true,
					freeMode: true,
					freeModeSticky: true,
				  navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					grabCursor: true,
					keyboard: {enabled: true},
					autoplay: {
						delay: 2500,
						disableOnInteraction: true,
					},
			},
			
			items: [],
		}
	},
	
	computed: {
		swiper() {return this.$refs.mySwiper.swiper},
	},
	
	methods: {
		
		//addTestImages() {
			//console.log("adding images")
			//const moreImages = this.randomPictures(10)
			//this.items.push.apply(this.items, moreImages)
		//},
		
		getLatestPhotos() {
			const vm = this
			this.axios.get('/photos/recent')
				.then(response =>  vm.items = response.data)
				//.catch(err => vm.showAxiosAlert(err))
		},

		randomPictures(n) {
			const ids = _.range(n)
			return ids.map(id => ({
				id: chance.integer({min: 0, max: 1000}),
				w: chance.integer({min: 1000, max: 2500}),
				h: chance.integer({min: 500, max: 1500})
			}))
		},
		
		getImgSrc(photo) {
			const fileLocation = process.env.STORAGE_URL + process.env.PICTURE_LOCATION
			return  `${fileLocation}${photo.id}.jpg`
		},
		
		handleResize() {
			this.carouselDimensions = {W: this.$refs.carousel.offsetWidth, H: this.$refs.carousel.offsetHeight}
		},
		
		imgStyle: function(photo) {
			const {W: W, H: H} = this.carouselDimensions
			const w = photo.width
			const h = photo.height
			const pTop = (W/2) * ((H/W) - h/w)
			if (w/h > W/H) return {paddingTop: pTop + 'px', width: '100%'}
			else return {height: `${H}px`}
		},
		
	},
	
}

</script>

<style lang="scss">

.swiper-slide {
	text-align: center;
}

</style>
