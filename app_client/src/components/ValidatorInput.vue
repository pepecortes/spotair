<template lang="pug">
	div
	
		b-input-group(size="lg", :prepend='title')
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

import VueSelect from 'vue-select'

export default {
	
	//TBC: when all finished, check what happens if you validate the
	// default proposal (not selecting anything in the list)
	
	//TBC: remove button V when already validated
	
	components: {
		'v-select': VueSelect,
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
		
		title: {
			type: String,
			default: "title missing"
		},
		
		adminForm: {
			// Form used for adding new records (i.e. AvionForm.vue)
			type: Object,
			default: null,
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
			var vm = this
			const url = this.apiCall + '/'
			vm.axios.get(url)
				.then(response => vm.options = response.data)
				.catch(err => vm.showAxiosAlert(err, "danger"))
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
		
		setInitialValue(val) {
			this.initial = val
			this.reset()
		},
		
		validate() {
			if (!this.selectionIsLegal) {this.reset(); return}
			this.validated = true
			this.$emit('input', this.mutableValue)
		},
		
		invalidate() {
			this.validated = false
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
