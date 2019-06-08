<template lang="pug">
	div(ref="carousel")
		swiper(:options="swiperOptions", ref="mySwiper")
			swiper-slide(v-for='photo in items')
				b-img(:src='getImgSrc(photo)', v-bind:style='imgStyle(photo)')
		div(class="swiper-button-next")
		div(class="swiper-button-prev")
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
	
	components: {swiper, swiperSlide},
	
	props: {
		
		options: {type: Object},
		
		photos: {
			type: Array,
			default: () => []
		},
	},
	
	beforeMount() {
		this.loadedPhotos = this.photos
	},
	
	mounted () {
		this.getLatestPhotos()
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
	},  
	
	beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
	
	data() {
		return {
			loadedPhotos: [],
			items: [],
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
		
		getLatestPhotos() {
			const vm = this
			this.axios.get('/photos/recent')
				.then(response =>  vm.items = response.data)
				//.catch(err => vm.showAxiosAlert(err))
		},
		
		getImgSrc(photo) {
			const fileLocation = process.env.STORAGE_URL + process.env.PICTURE_LOCATION
			return  `${fileLocation}${photo.id}.jpg`
		},
		
	},
	
}

</script>

<style lang="scss">

.swiper-slide {
	text-align: center;
}

</style>
