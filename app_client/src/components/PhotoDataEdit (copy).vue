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
	
	computed: {
		selectionIsValid() {
			// Return true only if all the fields are validated by the user
			if (!this.mutablePhoto.photographe || 
					!this.mutablePhoto.compagnie ||
					!this.mutablePhoto.appareil ||
					!this.mutablePhoto.galerie)
				return false
			return true
		},
	},
	
	watch: {
		
    value(val) {
			if (!val) return
			this.setInitialValue(val)
		},
			
		mutablePhoto: {
			handler(val) {
				if (this.selectionIsValid) this.$emit('input', val)
				else this.$emit('input', null)
			},
			deep: true
		},
		
	},
	
	mount() {
		this.mutablePhoto = Object.assign({}, this.value)
	},
	
	methods: {
		setInitialValue(value) {
			this.$refs.photographeInput.setInitialValue(value.photographe, true)
			this.$refs.compagnieInput.setInitialValue(value.compagnie, true)
			this.$refs.appareilInput.setInitialValue(value.appareil, true)
			this.$refs.galerieInput.setInitialValue(value.galerie, true)
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
