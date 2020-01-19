<template lang="pug">

	div(id='galeryBrowser')
	
		b-button(block, v-b-toggle.latest, variant="light", v-on:click="$emit('change', 'latest')") Dernières photos
		b-collapse(id="latest", accordion="my-accordion")
	
		b-button(block, v-b-toggle.acc1, variant="light") Dernières galeries
		b-collapse(id="acc1", accordion="my-accordion")
			div(class="subMenu", v-for="galerie in recentGaleries")
				b-button(block, variant="light", v-on:click="galerieSelected(galerie)") {{ galerie.text }}
				
		b-button(block, v-b-toggle.all, variant="light", v-b-modal.allGaleries) Toutes les galeries
		b-collapse(id="all", accordion="my-accordion")
			b-modal(id="allGaleries", title="Toutes les galeries")
				galerie_select(v-on:input="$emit('change', $event); $bvModal.hide('allGaleries')")
				
		b-button(block, v-b-toggle.assoc, variant="light", v-b-modal.assocGaleries) Sorties associatives
		b-collapse(id="assoc", accordion="my-accordion")
			b-modal(id="assocGaleries", title="Sorties associatives")
				galerie_select(
					isSpotair=true,
					v-on:input="$emit('change', $event); $bvModal.hide('assocGaleries')",
				)
			
		b-button(block, v-b-toggle.acc2, variant="light") Musées
		b-collapse(id="acc2", accordion="my-accordion")
			div(class="subMenu", v-for="galerie in musees")
				b-button(block, variant="light", v-on:click="galerieSelected(galerie)") {{ galerie.text }}
			
		b-button(block, v-b-toggle.collectors, variant="light") Collectors
		b-collapse(id="collectors", accordion="my-accordion")
			div(class="subMenu", v-for="galerie in collectors")
				b-button(block, variant="light", v-on:click="galerieSelected(galerie)") {{ galerie.text }}

</template>

<script>

import GalerieSelectForm from './GalerieSelectForm.vue'

export default {
	
	components: {
		'galerie_select': GalerieSelectForm,
	},
	
	data () {
		return {
			recentGaleries: [],
			musees: [],
			collectors: [],
		}
	},
		
	beforeMount() {
		this.$loading(true)
		const p1 = this.loadRecentGaleries()
		const p2 = this.loadMusees()
		const p3 = this.loadCollectors()
		Promise.all([p1, p2, p3])
			.then(() => this.$loading(false))
			.catch(err => this.$bvModal.msgBoxOk("Server error: " + err.message))
	},
	
	methods: {
		
		galerieSelected(galerie) {
			this.$emit('change', galerie.id)
		},
		
		
		loadRecentGaleries() {
			return this.axios.get(`galeries/recent/`)
				.then(response => this.recentGaleries = response.data)
		},
		
		loadMusees() {
			return this.axios.get(`galeries/musees`)
				.then(response => this.musees = response.data)
		},
		
		loadCollectors() {
			return this.axios.get(`galeries/collectors`)
				.then(response => this.collectors = response.data)
		},

	}
	
}
</script>

<style lang="scss">
@import '../styles/custom_variables.scss';

#galeryBrowser {
	margin-left: 2em;
	margin-top: 0em;
}

#galeryBrowser > button {
	font-weight: bold;
	padding: 0;
	text-align: left !important;
}

.subMenu > button {
	text-align: left;
	padding: 0;
	font-size: 0.9rem;
	padding-right: 2.5em;
	margin-left: 2em;
	text-indent: -1em;
}

</style>
