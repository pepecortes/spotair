<template lang="pug">
	div
		b-form-group(
			label="Année",
			label-for="annee",
		)
			b-form-input(
				v-model='id',
				placeholder="Galerie id",
				v-on:change="$emit('input', id)",
			)
				
</template>

<script>
export default {
	
	data () {
		return {
			id: null,
		}
	},
	
}
</script>
