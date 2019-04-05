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
			v-model='value.avion',
			title="Avion",
			:adminForm='admin.avion',
			:state="$v.value.avion.$invalid",
		)
		
		validator-input(
			ref='appareilValidator',
			apiCall="appareils",
			v-model='value.appareil',
			title="Immat",
			:adminForm='admin.appareil',
		)
		
		validator-input(
			ref='galerieValidator',
			apiCall="galeries",
			v-model='value.galerie',
			title="Galerie",
			:adminForm='admin.galerie',
		)
		
		validator-input(
			ref='compagnieValidator',
			apiCall="compagnies",
			v-model='value.compagnie',
			title="Compagnie",
			:adminForm='admin.compagnie',
		)
		
		validator-input(
			ref='aerodromeValidator',
			apiCall="aerodromes",
			v-model='value.aerodrome',
			title="Lieu",
			:adminForm='admin.aerodrome',
		)
		
		b-button(type="button", variant="outline-warning", v-on:click="validateButtonClicked") Validate
		
</template>

<script>
import { alertMixin } from './AlertMixin'
import { validationMixin } from 'vuelidate'
import { required } from "vuelidate/lib/validators"

import ValidatorInput from './ValidatorInput.vue'

import AvionForm from './AvionForm.vue'
import AppareilForm from './AppareilForm.vue'
import GalerieForm from './GalerieForm.vue'
import CompagnieForm from './CompagnieForm.vue'
import AerodromeForm from './AerodromeForm.vue'

export default {
		
	beforeMount() {
		var vm = this
		const url = 'photouploads/' + this.$route.params.id
		vm.axios.get(url)
			.then(response => {
				const data = response.data.jsonData
				vm.$refs.avionValidator.setInitialValue(data.avion)
				vm.$refs.appareilValidator.setInitialValue(data.appareil)
				vm.$refs.galerieValidator.setInitialValue(data.galerie)
				vm.$refs.compagnieValidator.setInitialValue(data.compagnie)
				vm.$refs.aerodromeValidator.setInitialValue(data.aerodrome)
			})
			.catch(err => vm.showAxiosAlert(err, "danger"))
	},
	
	components: {
		'validator-input': ValidatorInput,
	},		
	
	data() {
		return {
			value: {avion: null, appareil: null, galerie: null, compagnie: null, aerodrome: null},
			admin: {avion: AvionForm, appareil: AppareilForm, galerie: GalerieForm, compagnie: CompagnieForm, aerodrome: AerodromeForm},
			compagnie: null,
		}
	},
	
	mixins: [validationMixin, alertMixin],
	
	methods: {
			
			validateButtonClicked() {
				console.log("selection: " + JSON.stringify(this.value))
				console.log("validation before touch: " + JSON.stringify(this.$v.value.avion))
				this.$v.value.$touch()
				console.log("validation after touch: " + JSON.stringify(this.$v.value.avion))
			},
			
	},  
	
	validations: {
		
    value: {
			avion: {
				required,
			},
    },
    
	},
	
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
