<template lang="pug">

	div(id='test')
		
		h1 This is a generic test page
		FaIcon(icon="file", size="2", color="blue")
		FaIcon(icon="facebook-square", size="2", color="blue")
		FaIcon(icon="instagram", size="2", color="blue")

</template>

<script>

import "font-awesome/css/font-awesome.min.css"
import VueFontawesome from 'vue-fontawesome-icon/VueFontawesome.vue'

export default {
	
	components: {
		'FaIcon': VueFontawesome,
	},
	
	
	data() {
		return {
		}
	},
	
	methods: {
			
	},
	
}

</script>

<style lang="scss">
@import '../../styles/custom_variables.scss';


</style>
