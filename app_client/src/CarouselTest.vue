<template lang="pug">
	div(ref="carousel", id='carousel', style="width:100vw;height:80vh")
		swiper(:options="swiperOption", ref="mySwiper")
			swiper-slide(v-for='img in items')
				b-img(:src='getImgSrc(img)', v-bind:style='imgStyle(img.w, img.h)')
			
</template>

<script>

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

//TEST
const chance = require('chance').Chance()
const _ = require('lodash')

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
			swiperOption: {autoHeight: false},
			items: [
				//{id:28, w: 2000, h:375},
				//{id:22, w: 800, h:475},
				//{id:11, w: 1000, h:1375},
				//{id:5, w: 850, h:275},
				//{id:38, w: 700, h:675},
				//{id:42, w: 2100, h:800},
			],
		}
	},
	
	computed: {
		swiper() {return this.$refs.mySwiper.swiper},
	},
	
	methods: {		
		
		getLatestPhotos() {
			this.items = this.randomPictures(60)
		},

		randomPictures(n) {
			const ids = _.range(n)
			return ids.map(id => ({id: id, w:2000, h:1500}))
		},
		
		getImgSrc(img) {
			return `https://picsum.photos/${img.w}/${img.h}/?image=${img.id}`
		},
		
		handleResize() {
			this.carouselDimensions = {W: this.$refs.carousel.offsetWidth, H: this.$refs.carousel.offsetHeight}
		},
			
		imgStyle: function(w, h) {
			const {W: W, H: H} = this.carouselDimensions
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
