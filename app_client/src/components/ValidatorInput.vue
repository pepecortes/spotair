<template lang="pug">
	div
		b-input-group(size="lg", prepend="$")
			v-select(
				id="selector",
				:options="mutableOptions",
				label="text",
				v-model="mutableValue",
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
			mutableValue: null,
			mutableOptions: [],
		}
	},
	
	props: {
		
		options: {
			type: Array,
			default: () => []
		},
		
		value: {
			default: null
		},
		
	},
	
	watch: {
		
		value(val) {
			this.mutableValue = val
		},
		
		options(val) {
			this.mutableOptions = val
		},
		
	},
	
	/**
   * Clone props into mutable values,
   * attach any event listeners.
   */
	created() {
		this.mutableValue = this.value
		this.mutableOptions = this.options
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
