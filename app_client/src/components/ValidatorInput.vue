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
			validated: false,
			mutableValue: null,
			initial: null,
		}
	},
	
	props: {
		
		value: {
			default: null
		},
		
		apiCall: {
			type: String,
		},
		
	},
	
	computed: {
		
		selectionIsLegal() {
			return (this.mutableValue && this.mutableValue.id)
		},
		
	},
		
	created() {
		this.getOptions()
	},

	methods: {
		
		getOptions() {
			//TBC: how to alert of an error in the component?
			var vm = this
			const url = this.apiCall + '/'
			vm.axios.get(url)
				.then(response => vm.options = response.data)
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
			this.initial = val
			this.reset()
		},
		
		validate() {
			if (!this.selectionIsLegal) {this.reset(); return}
			this.validated = true
			this.$emit('input', this.mutableValue)
		},
		
		reset() {
			this.mutableValue = this.initial
			this.validated = false
			this.$emit('input', null)
		},
		
		newRecord() {
			this.$refs['avionAdmin'].show()
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
