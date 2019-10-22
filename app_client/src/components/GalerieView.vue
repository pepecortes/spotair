<template lang="pug">
	div
		h4 {{ galerie.text }}
		expo-collection(:collection='photos')
</template>

<script>

import BaseExpoCollection from './BaseExpoCollection.vue'

export default {
	
	components: {
		'expo-collection': BaseExpoCollection,
	},
	
	data() {
		return {
			photos: [],
		}
	},
	
	methods: {
		
		
	},
	
}
</script>

<style lang="scss">
</style>
