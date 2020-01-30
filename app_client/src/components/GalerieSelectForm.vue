<template lang="pug">
	div
		v-select(
			id="annee",
			placeholder="Année"
			:options="anneeOptions",
			label="text",
			v-model="annee",
			v-on:input="anneeChanged",
		)
		div(v-if="annee")
			br
			v-select(
				id="galerie",
				:options="galerieOptions",
				label="text",
				v-model="galerie"
				v-on:input="$emit('input', galerie.id)",
			)
</template>

<script>
import CustomVueMultiselect from "./CustomVueMultiselect.vue" 

function sortAnnees(array) {
	const compareFunction = (a, b) => ('' + b.annee).localeCompare(a.annee)
	return array.sort(compareFunction)
}

export default {
	
	components: {
    'v-select': CustomVueMultiselect,
	},
	
	props: {
		isSpotair: {
			type: Boolean,
			default: false,
		}
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
				.then(response => this.anneeOptions = sortAnnees(response.data))
				.catch(err => this.$bvModal.msgBoxOk("Server error: " + err.message))
		},
		
		getGalerieOptions(idAnnee) {
			const apiCall = (this.isSpotair)? "/galeries/spotair/byAnnee" : "/galeries/byAnnee"
			this.axios.get(`${apiCall}/${idAnnee}`)
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

<style lang="scss">
@import '../styles/custom_variables.scss';

</style>
