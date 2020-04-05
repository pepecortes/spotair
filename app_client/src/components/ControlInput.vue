<template lang="pug">
	div
	
		div(v-if="!hideValidateButton")
			div.row.no-gutters.editor(v-bind:class="{'bg-success': state, 'bg-warning': !state}")
				div.col-md-2.align-self-center
					div.text-center {{ title }}
				div.col-md-7.align-self-center
					v-select(
						v-if='!mutableValidated',
						id="selector",
						:options="options",
						label="text",
						v-model="mutableValue",
						@input='vselectChanged',
					)
					div.text-center(v-if="mutableValidated") {{ mutableValue.text }}
				div.col-md-2.align-self-center
					b-container.text-center
						b-button(v-if="!state", variant='outline-light', size="sm", @click='admin') Nouveau
				div.col-md-1.align-self-center
					b-container.text-center
						b-form-checkbox(v-model="state", switch, :disabled="!selectionIsLegal", @change="validateSwitch", v-b-tooltip.hover title="Valider")
						
						
		div(v-if="hideValidateButton && mutableValue")
			div.row.no-gutters.editor.disabled
				div.col-md-2.align-self-center
					div.text-center {{ title }}
				div.col-md-7.align-self-center
					div.text-center {{ mutableValue.text }}
				div.col-md-2.align-self-center
					b-container.text-center
						b-button(v-if="!state", variant='outline-dark', size="sm", @click='admin') Nouveau
					
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
import ControlVueMultiselect from "./ControlVueMultiselect.vue"
import { BIcon, BIconCheck, BIconReplyFill } from 'bootstrap-vue'

export default {
		
	components: {
		'v-select': ControlVueMultiselect,
		BIcon,
		BIconCheck,
    BIconReplyFill,
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
			// Form used for adding new records (i.e. FormAvion.vue)
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
		
		canBeValidated() {
			// Return true if the field is available for validation
			return !this.hideValidateButton && this.selectionIsLegal && !this.mutableValidated
		},
		
	},
		
	mounted() {
		this.getRecords()
	},
	
	beforeDestroy() {
		// accelerate the garbage collection to reduce memory footprint
		this.options = null
	},

	methods: {
		
		vselectChanged(selected) {
			// trigger the selector-changed event, except if the control
			// is NOT YET initialized
			if (this.initial == null || selected == this.initial) return
			this.$emit('selector-changed', selected)
		},
		
		setOptions(records) {
			// Note that 'options' only keep id and text from 'records'
			this.options = records.map(element => {return {id: element.id, text: element.text}})
		},
		
		getRecords() {
			const url = this.apiCall + '/'
			this.axios.get(url)
				.then(response => this.setOptions(response.data))
				.catch(err => console.error(err))
		},
		
		recordAddedOrUpdated(record) {
			this.getRecords()
			this.invalidate()
			this.mutableValue = record
		},
		
		recordRemovedOrFusion() {
			this.getRecords()
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
			
			// improve user experience
			vm.mutableValue = val
			if (validated) vm.validate()
			
			this.lookupInitialValue(val)
				.then (response => {
					vm.initial = response.data
					vm.mutableValue = response.data
					if (!validated) vm.invalidate()
				})
				.catch(err => console.error(err))
		},
		
		async lookupInitialValue(val) {
			if (!val.id) return Promise.resolve({data: val})
			const url = this.apiCall + '/' + val.id
			return this.axios.get(url)
		},
		
		validateSwitch(validate) {
			if (validate) this.validate()
			else this.invalidate()
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
@import '../styles/custom_variables.scss';

.editor {
	height: 3.0rem;
	margin-bottom: 0.5rem;
	padding-left: 1rem;
	padding-right: 1rem;
	border-radius: 1rem;
	border-style: solid;
	border-width: 0.1px;
	color: $primary;
	border-color: $primary;
}

.disabled {
}

.multiselect__tags {
	border: unset;
}
    
</style>
