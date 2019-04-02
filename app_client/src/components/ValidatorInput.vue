<template lang="pug">
	div
	
		b-input-group(size="lg", prepend="Avion")
			v-select(
				v-if='!validated',
				id="selector",
				:options="options",
				label="text",
				v-model="mutableValue",
			)
			p(v-if="validated") {{ mutableValue.text }}
			b-input-group-append
				b-button(v-if='selectionIsLegal', variant='outline-secondary', @click='validate') V
				b-button(variant='outline-secondary', @click='reset') X
				b-button(variant='outline-secondary', @click='newRecord') N
				
				
			b-modal(ref="avionAdmin", title="Avions", @hide='modalHidden')
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
			options: [],
			selectionIsLegal: false, // true if the selection is a value from 'options'
			validated: false,
			mutableValue: null,
		}
	},
	
	props: {
		
		value: {
			default: null
		},
		
		apiCall: {
			type: String,
		},
		
		initial: {
			type: Object,
		},
		
	},
	
	watch: {
		
		mutableValue(val) {
			this.selectionIsLegal = (val && val.id)
		},
		
	},
	
	/**
   * Clone props into mutable values,
   * attach any event listeners.
   */
	created() {
		//this.mutableValue = this.value
		this.mutableValue = this.initial
		this.getOptions()
	},

	methods: {
		
		getOptions() {
			//TBC: how to alert of an error in the component?
			var vm = this
			const url = this.apiCall + '/'
			vm.axios.get(url)
				.then(response => {
					vm.options = response.data
				})
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
		
		modalHidden() {
			console.log("MODAL HIDDEN")
			this.$emit('need-refresh')
			// TBC: sure you want to emit this?
		},
		
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
			this.$refs['avionAdmin'].show()
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
