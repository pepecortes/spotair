<template lang="pug">
	div
		b-button(v-on:click='test') TEST
		expo-collection(
			:photos='photos'
		)
</template>

<script>
import ExpoCollection from './components/ExpoCollection.vue'

export default {
	
	components: {
		'expo-collection': ExpoCollection,
	},
		
	beforeMount() {
		this.axios.get("/photos/recent/1000")
			.then(response => this.photos = response.data)
			.catch(err => console.error(err))
	},
	
	mounted () {

	},
	
	data() {
		return {
			photos: [],
		}
	},
	
	computed: {
	},
	
	methods: {
		
		test() {
			this.axios.get("/photos/recent/1000")
				.then(response => this.photos = response.data.slice(500,600))
				.catch(err => console.error(err))
			}
			
	},
	
}

</script>

<style lang="scss">

</style>
