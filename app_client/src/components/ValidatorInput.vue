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
				b-button(variant='outline-secondary', @click='newRecord') N
				
				
			b-modal(ref="adminComponent", :title='title', @hide='modalHidden')
				div(class="d-block")
					component(
						v-bind:is='adminForm',
						:initialTab=1,
						@record-added='recordModified',
						@record-updated='recordModified',
						@record-fusion='recordFusion',
					)
				
		
</template>

<script>

import VueSelect from 'vue-select'

export default {
	
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
		
		recordModified(record) {
			this.getOptions()
			this.invalidate()
			this.mutableValue = record
		},
		
		recordFusion() {
			this.getOptions()
			this.reset()
		},
		
		modalHidden() {
			console.log("modal hidden")
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
		
		invalidate() {
			this.validated = false
			this.$emit('input', null)
		},
		
		reset() {
			this.mutableValue = this.initial
			this.invalidate()
		},
		
		newRecord() {
			this.$refs.adminComponent.show()
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
