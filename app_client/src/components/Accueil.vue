<template lang="pug">
	div(id='cover')
		h1 This is the cover page
		carousel(
			:options='options',
			style="width:100%; height:80vh"
		)
</template>

<script>

import { alertMixin } from './AlertMixin'
import carousel from './Carousel.vue'

export default {
	
	components: {
    carousel
	},
	
	mixins: [alertMixin],

	mounted () {
		
	},
	
	data() {
		return {
			options: {					
				autoplay: {delay: 2500, disableOnInteraction: true},
			}
		}
	},
	
	computed: {
		
	},
	
	methods: {
			
	},
	
}

</script>

<style lang="scss">

</style>
