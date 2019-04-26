<template lang="pug">
	div
		h1 test de Exposition
		expo-form(:photos='photos', :value='selected', @input='inputChange')
</template>

<script>
import ExpoForm from './ExpoForm.vue'

export default {
	
	components: {
		'expo-form': ExpoForm
	},
	
	data() {
		return {
			//photos: ["350x200", "250x200", "350x200", "200x200", "250x200", "150x200"]
			photos: [{id: "7"},{id: "8"},{id: "9"}],
			selected: null,
		}
	},

	methods: {
		
		inputChange(event) {
			console.log("INPUT CHANGE")
			console.log("event " + JSON.stringify(event))
			console.log("value " + JSON.stringify(this.selected))
		},
		
	},
	
}
</script>

<style lang="scss">
</style>
