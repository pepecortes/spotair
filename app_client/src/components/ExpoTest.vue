<template lang="pug">
	div
		h1 test de Exposition
		expo-form(
			:photos='photos',
			v-model='selected',
			@input='inputChange',
			:fileLocation='fileLocation',
		)
</template>

<script>
import ExpoForm from './ExpoForm.vue'

export default {
	
	components: {
		'expo-form': ExpoForm
	},
	
	data() {
		return {
			photos: [],
			selected: null,
			fileLocation: process.env.THUMBNAIL_LOCATION,
		}
	},	
		
	beforeMount() {
		const vm = this
		this.axios.get(`photos/`)
			.then(response => vm.photos = response.data)
			.catch(err => console.error("error " + err))
	},

	methods: {
		
		inputChange(event) {
			console.log("value " + JSON.stringify(this.selected))
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
