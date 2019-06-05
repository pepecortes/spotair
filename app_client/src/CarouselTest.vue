<template lang="pug">
	div(id='carousel', style="background-color:gray;width:100%;")
		swiper(:options="swiperOption", ref="mySwiper")
			swiper-slide()
				b-img(
					src="https://picsum.photos/1000/375/?image=28",
					v-bind:style="imgStyle(1000, 375)"
				)
			swiper-slide()
				b-img(src="https://picsum.photos/800/475/?image=22",
					v-bind:style="imgStyle(800, 475)"
				)
			
</template>

<script>

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

/**
 * CLUE for img dimension
 * div containing the img: text-align center
 * img when w/h > W/H => 
 * 	width = 100%
 * 	padding-top (px) = (W/2) * (1/r -h/w) ex: r = 16/9
 */

export default {
	
	components: {    
		swiper,
    swiperSlide
	},
	
	watch: {
		aspectRatio(newRatio) {
			console.log(`ratio: ${newRatio}`)
		},
	},
	
	beforeCreate() {
		this.aspectRatio = window.innerWidth / window.innerHeight
	},
	
	mounted () {
		
		this.$nextTick(() => {
			window.addEventListener('resize', () => {
				this.aspectRatio = (window.innerWidth / window.innerHeight)
			})
    })
    
		
		//this.carouselWidth = this.$refs.mySwiper.$el.offsetWidth
		//this.carouselHeight = this.$refs.mySwiper.$el.offsetHeight
		//console.log({w: this.carouselWidth, h: this.carouselHeight})
		//this.getLatestPhotos()
	},
	
	data() {
		return {
			
			aspectRatio: 1000,
			
			swiperOption: {
				autoHeight: false,
			},
			
			//items: [
				//{id:0, caption:'caption0', text:'text0', src:`http://via.placeholder.com/100x100?text=start`},
				//{id:1, caption:'caption1', text:'text1', src:`http://via.placeholder.com/100x100?text=1`},
			//],
			//activeCarousel: true,
			//slide: 1,
		}
	},
	
	computed: {
		
		swiper() {
			return this.$refs.mySwiper.swiper
		},
		
	},
	
	methods: {
			
		imgStyle: function(w, h) {
			const W = this.carouselWidth
			const pTop = (W/2) * ((1/this.aspectRatio) - h/w)
			if ((w/h) > this.aspectRatio) return {paddingTop: pTop + 'px', width: '100%'}
			else return {width: 'auto'}
		},
		
		//getLatestPhotos() {
			
			//var vm = this
			
      ////vm.swiper.slideTo(1, 1000, false)
      
			////vm.items = [
				////{id:0, caption:'caption0', text:'text0', src:`http://via.placeholder.com/400x400?text=start`},
				////{id:1, caption:'caption1', text:'text1', src:`http://via.placeholder.com/400x400?text=1`},
			////]
			
			//vm.activeCarousel = true
			////this.axios.get('/photos/recent')
				////.then(response =>  vm.items = response.data.map(photoToImgData))
				////.catch(err => vm.showAxiosAlert(err))
		//},
		
	},
	
}

</script>

<style lang="scss">

img {
	width: 100%;
}

</style>
