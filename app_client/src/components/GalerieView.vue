<template lang="pug">
	div
		div(class="spotair-title text-center")
			h4(v-if='galerie.text') {{ galerie.text }}
			hr
		expo-collection(:collection='photos')
</template>

<script>

import BaseExpoCollection from './BaseExpoCollection.vue'

export default {
	
	components: {
		'expo-collection': BaseExpoCollection,
	},
	
	props: {
		id: [String, Number]
	}, 
	
	data() {
		return {
			photos: [],
			galerie: {},
		}
	},
	
	watch: {
    id(newValue, oldValue) {
			if (!newValue) return
			switch(newValue){
				case  "latest":
					this.getLatest()
					break
				case  "bestof":
					this.getBestOf()
					break
				default:
					this.getGalerie(newValue)
			}
		}
  },
	
	methods: {		
		
		getGalerie(id) {
			this.$loading(true)
			this.axios.get(`photos/byGalerie/${id}`)
				.then(response => {
					if (response.data.length == 0) throw new Error("Aucune photo dans la galerie")
					this.photos = response.data
					this.galerie = this.photos[0].galerie
					this.$loading(false)
				})
				.catch(err => this.$bvModal.msgBoxOk("Server error: " + err.message))
		},
			
		getLatest() {
			this.$loading(true)
			this.axios.get(`photos/recent/200`)
				.then(response => {
					if (response.data.length == 0) throw new Error("Aucune photo dans la galerie")
					this.photos = response.data
					this.galerie = {text: "Dernières photos"}
					this.$loading(false)
				})
				.catch(err => this.$bvModal.msgBoxOk("Server error: " + err.message))
			},
			
		getBestOf() {
			this.$loading(true)
			this.axios.get(`photos/recent/200`)
				.then(response => {
					if (response.data.length == 0) throw new Error("Aucune photo dans la galerie")
					this.photos = response.data
					this.galerie = {text: "Best Of: TBC"}
					this.$loading(false)
				})
				.catch(err => this.$bvModal.msgBoxOk("Server error: " + err.message))
			},
		
		
	},
	
}
</script>

<style lang="scss">
</style>
