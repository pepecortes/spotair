<template lang="pug">
	div(id='carouselTest')
		h1 CAROUSEL TEST
			
		div(id='carousel', style="background-color:gray;width:100%;")
			h1 en un lugar de la mancha de cyuyo nombre no quiero acordarme
			swiper(:options="swiperOption", ref="mySwiper")
				swiper-slide()
					b-img(src="https://picsum.photos/1000/375/?image=28")
			
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
	
	mounted () {
		//this.carouselWidth = this.$refs.mySwiper.$el.offsetWidth
		//this.getLatestPhotos()
	},
	
	data() {
		return {
			
			//carouselWidth: 0,
			
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
			
		//imgStyle: function(w, h) {
			//const W = this.carouselWidth
			//const pTop = (W/2) * (0.563 - h/w)
			//if ((w/h) > (16/9)) return {paddingTop: pTop + 'px', width: '100%'}
			//else return {width: 'auto'}
		//},
		
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

</style>
