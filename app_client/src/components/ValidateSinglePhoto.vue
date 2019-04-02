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
			:initial='initialSelection',
			v-model='avionSelection',
		)
		
</template>

<script>
import ValidatorInput from './ValidatorInput.vue'
import { alertMixin } from './AlertMixin'

export default {
		
	beforeMount() {
		console.log("photoupload id is " + this.$route.params.id)
		var vm = this
		const url = 'photouploads/' + this.$route.params.id
		vm.axios.get(url)
			.then(response => {
				//TODO CONTINUE HERE: CLARIFY INITIAL AND V-MODEL
				vm.avionSelection = response.data.jsonData.avion
			})
			.catch(err => vm.showAxiosAlert(err, "danger"))
	},
	
	components: {
		'validator-input': ValidatorInput,
	},		
	
	data() {
		return {
			avionSelection: null,
			initialSelection: {id:1, text: "BIDONCILLO"}
		}
	},	
	
	mixins: [alertMixin],
	
	methods: {
			
	},
	
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
