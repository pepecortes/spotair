<template lang="pug">

	div(id="galeries")
		
		div(id="fixedSideNav")
			galerie_browser(v-on:change="changeGalery")
		div(id="unFixedSideNavCompanion")
			galerie_view(:id='galerieId')
			
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
			galerieId: '',
		}
	},
	
	mounted() {
		this.galerieId = (this.$route.params.id)? this.$route.params.id : "latest"
		// if no id given: search latest galleries
	},
	
	methods: {
		
		changeGalery(id) {this.galerieId = id},
		
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
		max-width: 70em;
	} 
}
</style>
