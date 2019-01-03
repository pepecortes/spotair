<template lang="pug">

div#galerieForm
	base-form(api="aerodromes")
		template(slot="inputs", slot-scope="{formData,$v,checkValidityState}")
			b-form-group(
				label="Nom",
				label-for="nom",
				:invalid-feedback="formData.invalid.nom",
				:state="checkValidityState($v.formData.nom)"
			)
				b-form-input(
					id="nom",
					type="text",
					v-model.trim="formData.nom",
					:state="checkValidityState($v.formData.nom)"
				)

</template>

<script>
import BaseForm from './BaseForm.vue'

export default {
	
	components: {
		'base-form': BaseForm
	},
	
	data () {
		return {
			//aerodromes: [],
			//aerodrome: null, // the aerodrome being edited
			//aerodromeBak: null, // the original selection, in case you need to reset
			//alert: {show: false, text: "", type: "warning"},
			//toggleForm: false,
			//newRecord: false,
		}
	},
	
}
</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
