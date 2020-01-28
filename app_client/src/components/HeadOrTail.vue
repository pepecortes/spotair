<template lang="pug">
	div
	
		b-collapse(id='head', v-model='onHead')
			div(style="width: 90%; float: left;" )
				slot(name="head-slot")
			b-button(pill, variant="outline-danger", @click='toggle', v-b-tooltip.hover title="Je ne le trouve pas...")
				b-icon(icon="pencil")
						
		b-collapse(id="tail", v-model='onTail')
			b-input-group
				slot(name="tail-slot")
				b-input-group-append
					b-button(pill, variant="outline-danger", @click='toggle', v-b-tooltip.hover title="Retour vers la liste...")
						b-icon(icon="search")
					
</template>

<script>
import { BIcon, BIconPencil, BIconSearch } from 'bootstrap-vue'

export default {
	
	components: {
		BIcon,
    BIconPencil,
    BIconSearch,
	},
	
	model: {
		prop: 'headSelected',
    event: 'toggle'
	},
	
	props: {
		headSelected: {default: true, type: Boolean},
	},
	
	data() {
		return {
			onHead: this.headSelected,
			onTail: !this.headSelected,
		}
	},
	
	watch: {

		onHead: function() {
			this.$emit('toggle', this.onHead)
		},
		
		headSelected: function(v) {
			this.onHead = v
			this.onTail = !v
		}

	},

	methods: {
		
		toggle() {
			this.onHead = !this.onHead
			this.onTail = !this.onTail
		},
		
		setHead(onHead=true) {
			this.onHead = onHead
			this.onTail = !onHead
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
