<template lang="pug">
	div
		b-button(v-on:click='test') TEST
		b-button(v-on:click='test2') TEST2
		expo-collection(
			:collection='photos',
		)
</template>

<script>
import ExpoCollection from './components/ExpoCollection.vue'

export default {
	
	components: {
		'expo-collection': ExpoCollection,
	},
		
	//beforeMount() {
		//this.axios.get("/photos/recent/1000")
			//.then(response => {this.photos = response.data; this.photoSelected = response.data[1]})
			//.catch(err => console.error(err))
	//},
	
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
			this.axios.get("/test")
				.then(response => alert(`data length: ${response.data.length}, element 3000: ${response.data[3000]}`))
				.catch(err => console.error(err))
		},
		
		test2() {
			var data = {ids: [1,2,3,4,5,6]}
			this.axios.post("/photos/byIds", data)
				.then(response => console.log(JSON.stringify(response.data)))
				.catch(err => console.error(err))
		},
		
	}
	
}

</script>

<style lang="scss">

</style>
