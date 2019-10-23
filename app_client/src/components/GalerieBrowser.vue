<template lang="pug">
	div
		b-button(block, v-b-toggle.acc1, variant="dark") Dernieres galeries
		b-collapse(id="acc1", accordion="my-accordion")
			b-button(block, variant="light", v-on:click="$emit('change', '1345')") Visite Daher-Socata, 2019
			b-button(block, variant="light", v-on:click="$emit('change', '1234')") Répétition défilé du 14 juillet, 2018
		b-button(block, v-b-toggle.acc2, variant="dark") Autres galeries
		b-collapse(id="acc2", accordion="my-accordion")
			p 1 galeria
			p 2 galerias
			
		b-form-input(
			v-model='id',
			placeholder="Galerie id",
			v-on:change="$emit('change', id)",
		)
</template>

<script>
export default {
	
	data () {
		return {
			id: null,
		}
	},
	
	methods: {
		
		inputChange(val) {
			alert(val)
		},

	}
	
}
</script>
