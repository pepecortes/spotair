<template lang="pug">
	div(ref="carousel", id='carousel', style="background-color:gray;width:1000px;height:500px")
		button(@click="clickedButton") Click Me!
		swiper(:options="swiperOption", ref="mySwiper")
			swiper-slide()
				b-img(
					src="https://picsum.photos/2000/375/?image=28",
					v-bind:style="imgStyle(2000, 375)"
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
		W(newW) {
			console.log(`W: ${newW}`)
		},
	},
	
	mounted () {
		
		//this.clickedButton()
		
		//this.carouselWidth = this.$refs.mySwiper.$el.offsetWidth
		//this.W = this.$refs.carousel.offsetWidth
		//this.H = this.$refs.carousel.offsetHeight
		
		//console.log(this.containerDimension)
		//console.log({W: this.W, H: this.H})
		
		//this.$nextTick(() => {
			//window.addEventListener('resize', () => {
				//this.aspectRatio = (window.innerWidth / window.innerHeight)
				//console.log("aspectRatio : " + this.aspectRatio)
			//})
    //})
	},
	
	data() {
		return {
			
			W: 0,
			H: 0,
			
			test: {width: '50%'},
			
			swiperOption: {
				autoHeight: false,
			},
		}
	},
	
	computed: {
		
		containerDimension() {
			return {W: this.$refs.carousel.offsetWidth, H: this.$refs.carousel.offsetHeight}
			//if (this.$refs.carousel)
				//return {W: this.$refs.carousel.offsetWidth, H: this.$refs.carousel.offsetHeight}
			//else return {W:0, H:0}
		},
		
		swiper() {
			return this.$refs.mySwiper.swiper
		},
		
	},
	
	methods: {
		
		clickedButton: function() {
			console.log("CHECK")
			if (!this.$refs.carousel) return
			const dim = this.containerDimension
			const H = dim.H
			const W = dim.W
			const r = W/H
			const pTop = (W/2) * (H/W - 375/2000)
			this.test = {paddingTop: pTop + 'px', width: '100%'}
			//this.test = {width: '100%'}
		},
			
		imgStyle: function(w, h) {
			return this.test
			//const dim = this.containerDimension
			//const H = dim.H
			//const W = dim.W
			//const r = W/H
			//const pTop = (W/2) * ((1/r) - h/w)
			////console.log(`w: ${w}, h: ${h}, w/h: ${w/h}, ratio: ${this.aspectRatio}, cond: ${((w/h) > this.aspectRatio)}, pTop: ${pTop}`)
			//if (w/h > W/H) return {paddingTop: pTop + 'px', width: '100%'}
			//else return {height: `${H}px`}
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
}

</style>
