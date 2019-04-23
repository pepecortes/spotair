<template lang="pug">

	div(id='cover')
		
		h1 This is the test for Masonry

		dummy(text="30")
		
		masonry(:cols="6", :gutter="15")
			div
				p hola
			div
				p adios
		
</template>

<script>

import Masonry from 'vue-masonry-css'
import VueDummy from 'vue-dummy'

export default {
	
	components: {
		'masonry': Masonry,
		'dummy': VueDummy
	},
	
	data() {
		return {
			items: [],
		}
	},
	
}

</script>

<style lang="scss">

</style>
