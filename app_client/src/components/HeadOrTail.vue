<template lang="pug">

div
	b-collapse(id='head', v-model='onHead')
		slot(name="head-slot")
		b-button(@click='toggle') {{ headButtonText }}
		
	b-collapse(id="tail", v-model='onTail')
		slot(name="tail-slot")
		b-button(@click='toggle') {{ tailButtonText }}
		
</template>

<script>

export default {
	
	props: ['headButtonText', 'tailButtonText'],
	
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
	},
	
}

</script>

<style lang="scss">

</style>
