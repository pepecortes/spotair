<template lang="pug">
	div
		b-form-group(
			label="Année",
			label-for="annee",
		)
			v-select(
				id="annee",
				:options="anneeOptions",
				label="text",
				v-model="annee",
				v-on:input="anneeChanged",
			)
		b-form-group(
			v-if="annee"
			label="Galerie",
			label-for="galerie",
		)
			v-select(
				id="galerie",
				:options="galerieOptions",
				label="text",
				v-model="galerie"
				v-on:input="$emit('input', galerie.id)",
			)
</template>

<script>

import VueSelect from 'vue-multiselect'

export default {
	
	components: {
		'v-select': VueSelect
	},
	
	beforeMount() {
		this.getAnneeOptions()
	},
	
	data () {
		return {
			annee: null,
			galerie: null,
			anneeOptions: [],
			galerieOptions: [],
		}
	},
	
	methods: {
		
		getAnneeOptions() {			
			this.axios.get(`annees`)
				.then(response => this.anneeOptions = response.data)
				.catch(err => this.$bvModal.msgBoxOk("Server error: " + err.message))
		},
		
		getGalerieOptions(idAnnee) {
			this.axios.get(`/galeries/byAnnee/${idAnnee}`)
				.then(response => this.galerieOptions = response.data)
				.catch(err => this.$bvModal.msgBoxOk("Server error: " + err.message))
		},
		
		anneeChanged(annee) {
			this.getGalerieOptions(annee.id)
			this.galerie = null			
		},
		
	},
	
}
</script>
