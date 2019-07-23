<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		h4 {{ galerie.text }}
		
		expo-collection(:collection='photos')
		
</template>

<script>

import { alertMixin } from './AlertMixin'
import ExpoCollection from './ExpoCollection.vue'

export default {
	
	components: {
		'expo-collection': ExpoCollection,
	},
	
	mixins: [alertMixin],
	
	data() {
		return {
			galerieId: null,
			photos: [],
			galerie: {},
		}
	},
	
	beforeMount() {
		this.galerieId = this.$route.params.id
		this.buildGalerie(this.galerieId)
	},

	methods: {
		
		buildGalerie(galerieId) {
			const vm = this
			vm.$loading(true)
			vm.axios.get(`photos/byGalerie/${galerieId}`)
				.then(response => {
					if (response.data.length == 0) throw new Error("Aucune photo dans la galerie")
					vm.photos = response.data
					vm.galerie = vm.photos[0].galerie
					vm.$loading(false)
				})
				.catch(err => {vm.showAxiosAlert(err); this.$loading(false)})	
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
