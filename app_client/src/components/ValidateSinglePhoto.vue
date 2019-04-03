<template lang="pug">

	div(id="validateSinglePhoto")
	
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		validator-input(
			ref='avionValidator',
			apiCall="avions",
			v-model='avionSelection',
		)
		
		b-button(type="button", variant="outline-warning", v-on:click="validateButtonClicked") Validate
		
</template>

<script>
import ValidatorInput from './ValidatorInput.vue'
import { alertMixin } from './AlertMixin'

export default {
		
	beforeMount() {
		var vm = this
		const url = 'photouploads/' + this.$route.params.id
		vm.axios.get(url)
			.then(response => vm.$refs.avionValidator.setInitialValue(response.data.jsonData.avion))
			.catch(err => vm.showAxiosAlert(err, "danger"))
	},
	
	components: {
		'validator-input': ValidatorInput,
	},		
	
	data() {
		return {
			avionSelection: null,
		}
	},
	
	mixins: [alertMixin],
	
	methods: {
			
			validateButtonClicked() {
				console.log("avionSelection: " + JSON.stringify(this.avionSelection))
			},
			
	},
	
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
