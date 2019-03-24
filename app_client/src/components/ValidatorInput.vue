<template lang="pug">
	div
		b-input-group(size="lg", prepend="$")
			v-select(
				id="selector",
				:options="options",
				label="text",
				v-model="value",
			)
			b-input-group-append
				b-button(variant='outline-secondary') V
				b-button(variant='outline-secondary') X
				b-button(variant='outline-secondary') N
		
</template>

<script>

import VueSelect from 'vue-select'

export default {
	
	components: {
		'v-select': VueSelect,
	},
	
	data() {
		return {
			//options: [1,2],
			//value: 0,
		}
	},
	
	props: {
		
		options: {
			type: Array,
			default: () => []
		},
		
		value: {
			type: Number,
			default: null
		},
		
	},
	
	//model: {
		//prop: 'headSelected',
    //event: 'toggle'
	//},
	
	//watch: {

		//onHead: function() {
			//this.$emit('toggle', this.onHead)
		//},
		
		//headSelected: function(v) {
			//this.onHead = v
			//this.onTail = !v
		//}

	//},

	methods: {
		
		//setSelection(id) {
			//console.log("SETTING SELECTION")
		//},
		
	},
	
}
</script>

<style lang="scss">
</style>
