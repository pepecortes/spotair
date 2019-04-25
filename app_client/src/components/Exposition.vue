<template lang="pug">
	div
		h1 test de Exposition
		div(class='flexbox')
			img(src="https://via.placeholder.com/350x200")
			img(src="https://via.placeholder.com/250x200")
			img(src="https://via.placeholder.com/350x200")
			img(src="https://via.placeholder.com/200x200")
			img(src="https://via.placeholder.com/250x200")
			img(src="https://via.placeholder.com/150x200")
			img(src="https://via.placeholder.com/350x200")
			img(src="https://via.placeholder.com/250x200")
			img(src="https://via.placeholder.com/350x200")
			img(src="https://via.placeholder.com/200x200")
			img(src="https://via.placeholder.com/250x200")
			img(src="https://via.placeholder.com/150x200")
</template>

<script>
export default {
	
	model: {
		//prop: 'headSelected',
    //event: 'toggle'
	},
	
	props: {
		//headSelected: {default: true, type: Boolean},
		//buttonHead: {default: "Je ne trouve pas !"},
		//buttonTail: {default: "Retour vers sélection..."},
	},
	
	data() {
		return {
			//onHead: this.headSelected,
			//onTail: !this.headSelected,
		}
	},
	
	watch: {

		//onHead: function() {
			//this.$emit('toggle', this.onHead)
		//},
		
		//headSelected: function(v) {
			//this.onHead = v
			//this.onTail = !v
		//}

	},

	methods: {
		
		//toggle() {
			//this.onHead = !this.onHead
			//this.onTail = !this.onTail
		//},
		
	},
	
}
</script>

<style lang="scss">

	.flexbox {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: flex-start;
	}
	
	.flexbox * {
		margin-right: 0.8em;
		margin-bottom: 0.8em;
	}
	
</style>
