<template lang="pug">
	div
	
		b-button(block, v-b-toggle.acc1, variant="dark") Dernières galeries
		b-collapse(id="acc1", accordion="my-accordion")
			div(v-for="galerie in recentGaleries")
				b-button(block, variant="light", v-on:click="galerieSelected(galerie)") {{ galerie.text }}
			
		b-button(block, v-b-toggle.acc2, variant="dark") Musées
		b-collapse(id="acc2", accordion="my-accordion")
			div(v-for="galerie in musees")
				b-button(block, variant="light", v-on:click="galerieSelected(galerie)") {{ galerie.text }}
			
		b-button(block, v-b-toggle.collectors, variant="dark") Collectors
		b-collapse(id="collectors", accordion="my-accordion")
			div(v-for="galerie in collectors")
				b-button(block, variant="light", v-on:click="galerieSelected(galerie)") {{ galerie.text }}
				
		b-button(block, v-b-toggle.xxx, variant="dark", v-b-modal.testModal) Test
		b-collapse(id="xxx", accordion="my-accordion")
			b-modal(id="testModal", title="testModal")
				b-form-input(
					v-model='id',
					placeholder="Galerie id",
					v-on:change="$emit('change', id); $bvModal.hide('testModal')",
				)
</template>

<script>
export default {
	
	data () {
		return {
			id: null,
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
		
		inputChange(val) {
			alert(val)
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
