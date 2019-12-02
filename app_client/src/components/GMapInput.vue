<template lang="pug">
	div
	
		p BUILDING GMAP INPUT
		
</template>

<script>
//import VueSelect from 'vue-multiselect'

export default {
		
	components: {
		//'v-select': VueSelect,
	},
	
	data() {
		return {
			//options: [],
			//mutableValidated: false,
			//mutableValue: null,
			//initial: null,
		}
	},
	
	props: {
		
		value: {
			default: null
		},
		
	},
	
	computed: {
		//selectionIsLegal() {
			//return (this.mutableValue && this.mutableValue.id)
		//},
	},
		
	mounted() {
		//this.getRecords()
	},
	
	beforeDestroy() {
		// accelerate the garbage collection to reduce memory footprint
		//this.options = null
	},

	methods: {
		
		reset() {
			//this.invalidate()
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
