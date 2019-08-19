<template lang="pug">
	div
	
		b-form-group(:state='state')
			b-input-group(size="sm")
				b-badge(slot='prepend', variant="success", v-if='state') V
				span(slot='prepend') {{ title }} &nbsp;
				v-select(
					v-if='!mutableValidated',
					id="selector",
					:options="options",
					label="text",
					v-model="mutableValue",
					@input='vselectChanged',
				)
				p(v-if="mutableValidated") {{ mutableValue.text }}
				b-input-group-append
					b-button(v-if='!hideValidateButton && selectionIsLegal && !mutableValidated', variant='outline-secondary', @click='validate') V
					b-button(variant='outline-secondary', @click='reset') X
					b-button(variant='outline-secondary', @click='admin') N
					
		b-modal(ref="adminModal", :title='title', @hide='adminHidden')
			div(class="d-block")
				component(
					ref="adminComponent",
					v-bind:is='adminForm',
					:initialTab=1,
					@record-added='recordAddedOrUpdated',
					@record-updated='recordAddedOrUpdated',
					@record-removed='recordRemovedOrFusion',
					@record-fusion='recordRemovedOrFusion',
			)
		
</template>

<script>
import VueSelect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
		
	components: {
		'v-select': VueSelect,
	},
	
	data() {
		return {
			options: [],
			mutableValidated: false,
			mutableValue: null,
			initial: null,
		}
	},
	
	props: {
		
		value: {
			default: null
		},
		
		hideValidateButton: {
			// in case you do not want to show the validator button
			// note that the component will be always invalid!
			type: Boolean,
			default: false
		},
		
		validated: {
			default: false
		},
		
		apiCall: {
			type: String,
		},
		
		title: {
			type: String,
			default: "title missing"
		},
		
		adminForm: {
			// Form used for adding new records (i.e. AvionForm.vue)
			type: Object,
			default: null,
		},
		
		state: {
			// Whether or not its validated (see parent)
			type: Boolean,
			default: false
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
		
		vselectChanged(selected) {
			// trigger the selector-changed event, except if the control
			// is NOT YET initialized
			if (this.initial == null || selected == this.initial) return
			this.$emit('selector-changed', selected)
		},
		
		setOptions(options) {
			this.options = options
		},
		
		getOptions() {
			var vm = this
			const url = vm.apiCall + '/'
			vm.axios.get(url)
				.then(response => vm.setOptions(response.data))
				.catch(err => console.error(err))
		},
		
		recordAddedOrUpdated(record) {
			this.getOptions()
			this.invalidate()
			this.mutableValue = record
		},
		
		recordRemovedOrFusion() {
			this.getOptions()
			this.reset()
		},
		
		adminHidden() {
			this.$refs.adminComponent.resetAlert()
		},
		
		/**
		 * Set the control initial value. Can be set in "validated" condition
		 */
		setInitialValue(val, validated=false) {
			var vm = this
			vm.mutableValue = val // improve user experience
			this.lookupInitialValue(val)
				.then (response => {
					vm.initial = response.data
					vm.mutableValue = response.data
					if (validated) vm.validate()
					else vm.invalidate()
				})
				.catch(err => console.error(err))
		},
		
		async lookupInitialValue(val) {
			if (!val.id) return Promise.resolve({data: val})
			const url = this.apiCall + '/' + val.id
			return this.axios.get(url)
		},
		
		validate() {
			if (!this.selectionIsLegal) {this.reset(); return}
			this.mutableValidated = true
			this.$emit('input', this.mutableValue)
		},
		
		invalidate() {
			this.mutableValidated = false
			this.$emit('input', null)
		},
		
		reset() {
			this.mutableValue = this.initial
			this.invalidate()
		},
		
		admin() {
			this.$refs.adminModal.show()
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
