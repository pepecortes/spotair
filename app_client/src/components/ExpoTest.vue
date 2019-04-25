<template lang="pug">
	div
		h1 test de Exposition
		expo-form(:photos='photos')
</template>

<script>
import ExpoForm from './ExpoForm.vue'

export default {
	
	components: {
		'expo-form': ExpoForm
	},
	
	data() {
		return {
			photos: ["350x200", "250x200", "350x200", "200x200", "250x200", "150x200"]
		}
	},

	methods: {
	},
	
}
</script>

<style lang="scss">
</style>
