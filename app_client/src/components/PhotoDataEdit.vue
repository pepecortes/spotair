<template lang="pug">
	div
		div(class='testelement')
			editor-input(
				ref='photographeInput',
				title="Photographe",
				apiCall="photographes",
				v-model="mutablePhoto.photographe",
				:adminForm='admin.photographe',
				:state='!$v.mutablePhoto.photographe.$invalid',
			)
			editor-input(
				ref='compagnieInput',
				title="Compagnie",
				apiCall="compagnies",
				v-model="mutablePhoto.compagnie",
				:adminForm='admin.compagnie',
				:state='!$v.mutablePhoto.compagnie.$invalid',
			)
			editor-input(
				ref='appareilInput',
				title="Appareil",
				apiCall="appareils",
				v-model='mutablePhoto.appareil',
				:adminForm='admin.appareil',
				:state='!$v.mutablePhoto.appareil.$invalid',
			)
			editor-input(
				ref='galerieInput',
				title="Galerie",
				apiCall="galeries",
				v-model="mutablePhoto.galerie",
				:adminForm='admin.galerie',
				:state='!$v.mutablePhoto.galerie.$invalid',
			)
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import EditorInput from './EditorInput.vue'
import AppareilForm from './AppareilForm.vue'
import GalerieForm from './GalerieForm.vue'
import CompagnieForm from './CompagnieForm.vue'
import PhotographeForm from './PhotographeForm.vue'

export default {
	
	props: {
		value: {
			default: null
		},
	},
	
	components: {
		'editor-input': EditorInput,
	},
	
	data() {
		return {
			mutablePhoto: {},
			admin: {
				appareil: AppareilForm,
				galerie: GalerieForm,
				compagnie: CompagnieForm,
				photographe: PhotographeForm
			},
		}
	},
	
	mounted() {
		//this.mutablePhoto = this.value
	},
	
	watch: {
    value() {
			console.log("value changed")
			this.mutablePhoto = this.value
			this.$refs.photographeInput.setInitialValue(this.value.photographe, true)
			this.$refs.compagnieInput.setInitialValue(this.value.compagnie, true)
			this.$refs.appareilInput.setInitialValue(this.value.appareil, true)
			this.$refs.galerieInput.setInitialValue(this.value.galerie, true)
			},
			
		mutablePhoto: {
			handler(val) {
				console.log("MUTABLEPHOTO")
			},
			deep: true
		},
	},
	
	computed: {
		KOKO: function() {
			return this.mutablePhoto.photographe.text
		},
	},
	
	mixins: [validationMixin],
	
	validations() {
		return {mutablePhoto: 
			{
				photographe: {required},
				compagnie: {required},
				appareil: {required},
				galerie: {required},
			}
		}
	},
	
}

</script>

<style lang="scss">

.testelement {
	width: 500px;
	background-color: blanchedalmond;
}

</style>
