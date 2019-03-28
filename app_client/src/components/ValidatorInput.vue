<template lang="pug">
	div
		b-input-group(size="lg", prepend="$")
			v-select(
				v-if='!validated',
				id="selector",
				:options="mutableOptions",
				label="text",
				v-model="mutableValue",
			)
			p(v-if="validated") {{ mutableValue.text }}
			b-input-group-append
				b-button(variant='outline-secondary', @click='validate') V
				b-button(variant='outline-secondary', @click='reset') X
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
			validated: false,
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
		
		setInitialValue(val) {
			this.initialValue = val
			this.mutableValue = val
		},
		
		validate() {
			this.validated = true
		},
		
		reset() {
			this.mutableValue = this.initialValue
			this.validated = false
		},
		
		//setSelection(id) {
			//console.log("SETTING SELECTION")
		//},
		
	},
	
}
</script>

<style lang="scss">
</style>
