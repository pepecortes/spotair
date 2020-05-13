<template lang="pug">

	div(id='test')
		
		h1 AsyncMultiselect test
		asyncSelect(
			id="selector",
			:options="options",
			label="text",
			v-model="mutableValue",
			:loading="isLoading",
			@search-change="asyncSearch",
		)

</template>

<script>

import ControlAsyncMultiselect from "./ControlAsyncMultiselect.vue"

export default {
	
	components: {
		asyncSelect: ControlAsyncMultiselect,
	},
	
	
	data() {
		return {
			//options: [{value: 1, text: "uno"}, {value: 2, text: "dos"}, {value: 3, text: "tres"}],
			options: [],
			mutableValue: null,
			isLoading: false,
		}
	},
	
	methods: {
		asyncSearch(query) {
			console.log("query: " + query)
			this.isLoading = true
			
			//const query = this.searchString.replace('%', '')
			const apiCall = `appareils`
			this.axios.get(apiCall)
				.then(response => this.options = response.data)
				.then(() => this.isLoading = false)
			
			//this.options = [{value: 1, text: "uno"}, {value: 2, text: "dos"}, {value: 3, text: "tres"}]
			//this.isLoading = false
		},
	},
	
}

</script>

<style lang="scss">
@import '../../styles/custom_variables.scss';


</style>
