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
			ref='validator',
			apiCall="compagnies",
			v-model='selection',
			title="Compagnie",
			:adminForm='adminform',
		)
		
		b-button(type="button", variant="outline-warning", v-on:click="validateButtonClicked") Validate
		
</template>

<script>
import ValidatorInput from './ValidatorInput.vue'
import { alertMixin } from './AlertMixin'
import AvionForm from './AvionForm.vue'
import CompagnieForm from './CompagnieForm.vue'

export default {
		
	beforeMount() {
		var vm = this
		const url = 'photouploads/' + this.$route.params.id
		vm.axios.get(url)
			//.then(response => vm.$refs.validator.setInitialValue(response.data.jsonData.avion))
			.then(response => vm.$refs.validator.setInitialValue(response.data.jsonData.compagnie))
			.catch(err => vm.showAxiosAlert(err, "danger"))
	},
	
	components: {
		'validator-input': ValidatorInput,
	},		
	
	data() {
		return {
			selection: null,
			adminform: CompagnieForm,
			//adminform: AvionForm,
		}
	},
	
	mixins: [alertMixin],
	
	methods: {
			
			validateButtonClicked() {
				console.log("selection: " + JSON.stringify(this.selection))
			},
			
	},
	
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
