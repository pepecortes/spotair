<template lang="pug">

	div(class='flexbox')
		img(
			v-for='photo in photos',
			:src='getSrc(photo)',
			v-on:click='clicked(photo)'
		)


</template>

<script>

export default {
	
	props: {
		
		value: {
			default: null
		},
		
		photos: {
			type: Array,
			default: () => []
		},
		
	},
	
	data () {
		return {
			mutableValue: null,
			fileLocation: process.env.STORAGE_URL + process.env.THUMBNAIL_LOCATION
		}
	},
	
	computed: {
		
	},
	
	mounted() {
		
	},
	
	methods: {
		
		getSrc(photo) {return `${this.fileLocation}${photo.id}.jpg`},
		
		clicked: function(photo) {
			this.mutableValue = photo
			this.$emit('input', photo)
		},
		
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
