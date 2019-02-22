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
	
	props: {buttonHead: {default: "Je ne trouve pas !"}, buttonTail: {default: "Retour vers sélection..."}},
	
	data () {
		return {
			onHead: true,
			onTail: false
		}
	},

	methods: {
		
		toggle() {
			this.onHead = !this.onHead
			this.onTail = !this.onTail
		},
		
		goToHead() {
			this.onHead = true
			this.onTail = false
		},
		
		goToTail() {
			this.onHead = false
			this.onTail = true
		}
		
	},
	
}
</script>

<style lang="scss">
</style>
