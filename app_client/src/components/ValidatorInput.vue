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
				b-button(variant='outline-secondary', @click='newRecord') N
				
				
			b-modal(ref="my-modal", title="Avions")
				div(class="d-block")
					avion-form(:initialTab=1)
				
		
</template>

<script>

import VueSelect from 'vue-select'
import AvionForm from './AvionForm.vue'

export default {
	
	components: {
		'v-select': VueSelect,
		'avion-form': AvionForm,
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

	methods: {
		
		hideModal() {
			console.log("hide modal")
		},
		
		toggleModal() {
			console.log("toggle modal")
		},
		
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
		
		newRecord() {
			this.$refs['my-modal'].show()
			//this.$router.push("/admin/avions/new")
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
