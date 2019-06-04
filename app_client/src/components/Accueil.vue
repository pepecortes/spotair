<template lang="pug">
	div(id='cover')

		h1 This is the cover page
		
		swiper(:options="swiperOption", ref="mySwiper")
		
			swiper-slide()
				div(class='test')
					b-img(src="https://picsum.photos/1000/375/?image=28")
			swiper-slide()
				div(class='test')
					b-img(src="https://picsum.photos/1200/675/?image=47")
			swiper-slide()
				div(class='test')
					b-img(src="https://picsum.photos/1000/675/?image=23")
			swiper-slide()
				div(class='test')
					b-img(src="https://picsum.photos/1100/275/?image=25")
			
		h1 This is the end

</template>

<script>

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { photoToImgData } from '../lib/common'
import { alertMixin } from './AlertMixin'

// TEST
const chance = require('chance').Chance()
const _ = require('lodash')

		
//function getImgSource(w,h,text) {
	////console.log("adding item " + k)	
	////const w = chance.integer({ min: 200, max: 800 })
	////const h = chance.integer({ min: 200, max: 800 })
	//return `http://via.placeholder.com/${w}x${h}?text=${text}`
//}

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
	
	//mixins: [alertMixin],

	mounted () {this.getLatestPhotos()},
	
	data() {
		return {
			
			swiperOption: {
				autoHeight: false,
				
			},
			
			items: [
				{id:0, caption:'caption0', text:'text0', src:`http://via.placeholder.com/100x100?text=start`},
				{id:1, caption:'caption1', text:'text1', src:`http://via.placeholder.com/100x100?text=1`},
			],
			activeCarousel: true,
			slide: 1,
		}
	},
	
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper
		},
	},
	
	methods: {
		
		check(payload) {
			console.log(JSON.stringify(payload) + "  " + this.items.length)
			if (payload.currentSlide >= (this.items.length - 2)) {
				this.items.push(this.counter)
				this.counter + this.counter + 1
				console.log("new lenght " + this.items.length)
			}
		},
		
		getLatestPhotos() {
			
			var vm = this
			
      //vm.swiper.slideTo(1, 1000, false)
      
			//vm.items = [
				//{id:0, caption:'caption0', text:'text0', src:`http://via.placeholder.com/400x400?text=start`},
				//{id:1, caption:'caption1', text:'text1', src:`http://via.placeholder.com/400x400?text=1`},
			//]
			
			vm.activeCarousel = true
			//this.axios.get('/photos/recent')
				//.then(response =>  vm.items = response.data.map(photoToImgData))
				//.catch(err => vm.showAxiosAlert(err))
		},
		
	},
	
}

</script>

<style lang="scss">
imgx {
	width: 100%;
}

.test {
	text-align: center;
	background-color: black;
}

</style>
