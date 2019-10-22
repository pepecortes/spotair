<template lang="pug">
	div
	
		div(id="fixedSideNav")
			galerie_browser

		div(id="unFixedSideNavCompanion")
			h4 GALERIE: {{ galerie.text }}
		
</template>

<script>

import GalerieBrowser from './GalerieBrowser.vue'
import GalerieView from './GalerieView.vue'

export default {
	
	components: {
		'galerie_browser': GalerieBrowser,
		'galerie_view': GalerieView,
	},
	
	
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
				// YOU WILL HAVE TO FINISH THIS
				.catch(err => {console.log(err); this.$loading(false)})	
		},
		
	},
	
}
</script>

<style lang="scss">
/* Make the side nav fixed and scrollable */

@media (min-width: 992px) {
	#fixedSideNav {
		position: fixed;
		overflow-y: auto;
		height: 90%;
		width: 20%;
	}
	
	#unFixedSideNavCompanion {
		margin-left: 20%;
		width: auto;
	} 
}
</style>
