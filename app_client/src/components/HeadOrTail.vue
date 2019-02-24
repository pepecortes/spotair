<template lang="pug">
	div
		b-collapse(id='head', v-model='onHead')
			slot(name="head-slot")
			b-button(@click='toggle') {{ buttonHead }}
		b-collapse(id="tail", v-model='onTail')
			slot(name="tail-slot")
			b-button(@click='toggle') {{ buttonTail }}
</template>

<script>
export default {
	
	model: {
		prop: 'headSelected',
    event: 'toggle'
	},
	
	props: {
		headSelected: {default: true, type: Boolean},
		buttonHead: {default: "Je ne trouve pas !"},
		buttonTail: {default: "Retour vers sélection..."},
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
