<template lang="pug">
	div
		b-button(v-focus, v-on:click='test') TEST
		b-button(v-on:click='test2') TEST2
</template>

<script>
//import PhotoDataEdit from './components/PhotoDataEdit.vue'

export default {
	
	
	components: {
		//'photo-data-edit': PhotoDataEdit,
	},
	
	methods: {
		
		test() {
			//this.axios.get("/photos/54260")
				//.then(response => this.photo = response.data)
				//.catch(err => console.error(err))
		},
		
		test2() {
			//console.log("photographe: " + JSON.stringify(this.photo.photographe))
			//console.log("compagnie: " + JSON.stringify(this.photo.compagnie))
			//console.log("photo: " + JSON.stringify(this.photo))
		},
		
	},
	
}

</script>

<style lang="scss">
</style>
