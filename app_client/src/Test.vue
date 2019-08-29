<template lang="pug">
	div
		b-button(v-on:click='test') TEST
		b-button(v-on:click='test2') TEST2
		photo-data-edit(
			ref='TEST',
			v-model='photo',
		)
</template>

<script>
import PhotoDataEdit from './components/PhotoDataEdit.vue'

export default {
	
	data() {
		return {
			photo: {},
		}
	},
	
	components: {
		'photo-data-edit': PhotoDataEdit,
	},
	
	methods: {
		
		test() {
			this.axios.get("/photos/12")
				.then(response => this.photo = response.data)
				.catch(err => console.error(err))
		},
		
		test2() {
			console.log("this: " + JSON.stringify(this.photo.photographe))
			//console.log("KOKO: " + this.$refs.TEST.KOKO)
		},
		
	},
	
}

</script>

<style lang="scss">
</style>
