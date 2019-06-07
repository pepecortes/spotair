<template lang="pug">
	div(id='cover')
		h1 This is the cover page
		carousel
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
