<template lang="pug">
	div(ref="carousel")
		swiper(:options="swiperOptions", ref="mySwiper", v-on:doubleTap='doubleTap', v-on:slideChange='slideChange')
			swiper-slide(v-for='photo in photos')
				b-img(:src='photo.src', v-bind:style='imgStyle(photo)')
		div(class="swiper-button-next")
		div(class="swiper-button-prev")
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
	
	components: {swiper, swiperSlide},
	
	model: {
		prop: 'currentPhoto',
		event: 'slideChange'
	},
	
	props: {
		currentPhoto: {type: Object},
		options: {type: Object},
		
		/**
		 * Pictures data. An array of objects. Each object must have,
		 * at least, the following properties: id, width, height, src
		 * Example: 
		 * {id: 3, width: 1200, height: 800, src: 'https://picsum.photos/id/2/300/200'}}
		 */
		photos: {
			type: Array,
			default: () => []
		},
	},
	
	mounted () {
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
		this.$emit('slideChange', this.photos[this.swiper.params.initialSlide])
	},  
	
	beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  
  watch: {
		currentPhoto: function(val) {
			const i = this.photos.indexOf(val)
			this.swiper.slideTo(i, 0, false)
		}
	},
  
	data() {
		return {
			
			carouselDimensions: {W:0, H:0},
			
			defaultOptions: {				
				lazy: true,
				freeMode: true,
				freeModeSticky: true,
			  navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				grabCursor: true,
				keyboard: {enabled: true},
			},
		}
	},
	
	computed: {
		swiper() {return this.$refs.mySwiper.swiper},
		swiperOptions() {return Object.assign(this.defaultOptions, this.options)},
	},
	
	methods: {
		
		/**
		 * The user wants you to react on the current active photo
		 */
		doubleTap() {
			const activePhotoIndex = this.swiper.activeIndex
			this.$emit('input', this.photos[activePhotoIndex])
		},
		
		slideChange() {
			const activePhotoIndex = this.swiper.activeIndex
			this.$emit('slideChange', this.photos[activePhotoIndex])
		},
		
		handleResize() {
			this.carouselDimensions = {W: this.$refs.carousel.offsetWidth, H: this.$refs.carousel.offsetHeight}
		},
		
		imgStyle(photo) {
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
