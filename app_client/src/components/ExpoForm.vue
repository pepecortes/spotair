<template lang="pug">

	div(class='flexbox')
		img(v-for='photo in photos', :src='getSrc(photo)')


</template>

<script>

export default {	
	
	model: {
		//prop: 'headSelected',
    //event: 'toggle'
	},
	
	props: {
		photos: {
			type: Array,
			default: () => []
		},
	},
	
	data () {
		return {
		}
	},
	
	computed: {

	},
	
	mounted() {
		
	},
	
	methods: {
		getSrc: (photo) => `https://via.placeholder.com/${photo}`
	},
	
}
</script>

<style lang="scss">

	.flexbox {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: flex-start;
	}
	
	.flexbox * {
		margin-right: 0.8em;
		margin-bottom: 0.8em;
	}
	
</style>
