<template lang="pug">
	div(ref="carousel")
		b-button(pill, variant="outline-secondary", v-show='action') Action defined in Carousel
		swiper(:options="swiperOptions", ref="mySwiper", v-on:doubleTap='doubleTap', v-on:slideChangeTransitionEnd='slideChange')
			swiper-slide(v-for='slide in viewSlides', v-bind:key='slide.id')
				b-img(:src='slide.url', v-bind:style='imgStyle(slide)')
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { centeredSlice } from '../lib/common'

const RANGE = 5
// The size of the view port (viewSlides): keeping it reduced should
// improve usability

export default {
	
	components: {swiper, swiperSlide},
	
	props: {
		value: {type: Object},
		options: {type: Object},
		action: {type: Boolean, default: false},
		
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
  
	data() {
		return {
			
			carouselDimensions: {W:0, H:0},
			
			bufferSlides: null,
			viewSlides: null,
			displayedSlide: null,
			
			defaultOptions: {
				freeMode: false,
				initialSlide: RANGE,
				lazy: true,
				grabCursor: true,
				keyboard: {enabled: true},
				mousewheel: true,
			},
		}
	},
	
	computed: {
		
		swiper() {return this.$refs.mySwiper.swiper},
		
		swiperOptions() {return Object.assign(this.defaultOptions, this.options)},
		
		// Define the characteristics of the viewSlides dimension
		visibleRange() {return (this.bufferSlides.length >= 2*RANGE+1)? RANGE : Math.floor(this.bufferSlides.length/2)},
		centralIndex() {return Math.floor(this.viewSlides.length / 2)},
		
	},
	
	beforeMount() {
		this.bufferSlides = this.photos.map(photo => Object.assign({}, photo))
		this.viewSlides = centeredSlice(this.bufferSlides, 0, this.visibleRange)
		this.displayedSlide = this.viewSlides[this.centralIndex]
	},
	
	mounted () {
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
		if (this.value.id) {
			this.centerAroundPhotoId(this.value.id)
			this.updateDisplayedSlide()
		}
	},
	
	beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
	
	methods: {
		
		updateDisplayedSlide() {
			// Synchro the information of the currently displayed slide
			this.displayedSlide = this.viewSlides[this.swiper.realIndex]
			// Emit event to inform that a new slide is displayed
			this.$emit('slide-updated', this.displayedSlide)
		},
		
		centerAroundPhotoId(idPhoto=false) {
			const index = (idPhoto)? this.bufferSlides.findIndex(e => (e.id == idPhoto)) : 0
			this.viewSlides = centeredSlice(this.bufferSlides, index, this.visibleRange)
			this.swiper.slideTo(this.centralIndex, 0, false)
		},
		
		/**
		 * The user wants you to react on the current active photo
		 */
		doubleTap() {
			const activePhotoIndex = this.swiper.activeIndex
			// HERE IS WHERE VALUE GETS UPDATED!!!
			this.$emit('input', this.viewSlides[activePhotoIndex])
		},
		
		nearBoundaries() {
			// Return true if the carousel is reaching the boundaries of the viewSlides
			const minLeft = 1
			const maxRight = this.viewSlides.length - 2
			try {return (this.swiper.realIndex >= maxRight) || (this.swiper.realIndex <= minLeft)}
			catch(e) {return false}
		},
		
		slideChange() {
			// If reaching boundaries of the viewSlides, recenter
			this.updateDisplayedSlide()
			if (this.nearBoundaries()) this.centerAroundPhotoId(this.displayedSlide.id)
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
