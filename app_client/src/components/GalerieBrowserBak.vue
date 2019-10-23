<template lang="pug">
	div
		h3 galerie browser
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
