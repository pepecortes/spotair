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
	
	props: {
		id: {
			type: String,
			default: ''
		},
	}, 
	
	data() {
		return {
			photos: [],
			galerie: {},
		}
	},
	
	watch: {
    id() {this.buildGalerie()}
  },
	
	methods: {		
		
		buildGalerie() {
			this.$loading(true)
			this.axios.get(`photos/byGalerie/${this.id}`)
				.then(response => {
					if (response.data.length == 0) throw new Error("Aucune photo dans la galerie")
					this.photos = response.data
					this.galerie = this.photos[0].galerie
					this.$loading(false)
				})
				// YOU WILL HAVE TO FINISH THIS
				.catch(err => {console.log(err); this.$loading(false)})
			},
		
		
	},
	
}
</script>

<style lang="scss">
</style>
