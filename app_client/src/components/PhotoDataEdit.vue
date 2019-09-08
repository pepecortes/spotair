<template lang="pug">
	div
		div(class='testelement')
			editor-input(
				ref='photographeInput',
				title="Photographe",
				apiCall="photographes",
				v-model="photo.photographe",
				:adminForm='admin.photographe',
				:state='!$v.photo.photographe.$invalid',
			)
			editor-input(
				ref='compagnieInput',
				title="Compagnie",
				apiCall="compagnies",
				v-model="photo.compagnie",
				:adminForm='admin.compagnie',
				:state='!$v.photo.compagnie.$invalid',
			)
			editor-input(
				ref='appareilInput',
				title="Appareil",
				apiCall="appareils",
				v-model='photo.appareil',
				:adminForm='admin.appareil',
				:state='!$v.photo.appareil.$invalid',
			)
			editor-input(
				ref='galerieInput',
				title="Galerie",
				apiCall="galeries",
				v-model="photo.galerie",
				:adminForm='admin.galerie',
				:state='!$v.photo.galerie.$invalid',
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
		id: {
			type: Number,
			default: null,
		},
	},
	
	components: {
		'editor-input': EditorInput,
	},
	
	data() {
		return {
			photo: {},
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
			if (!this.photo.photographe || 
					!this.photo.compagnie ||
					!this.photo.appareil ||
					!this.photo.galerie)
				return false
			return true
		},
	},
	
	watch: {
		
		id() {this.initialize()},
			
		photo: {
			handler(photo) {
				if (this.selectionIsValid) this.$emit('input', photo)
				else this.$emit('input', null)
			},
			deep: true
		},
		
	},
	
	methods: {
		
		initialize() {
			if (!this.id) return
			this.axios.get(`photos/${this.id}`)
				.then(response => {
					this.photo = response.data
					this.setInitialValue()
				})
				.catch(err => console.err(err))
		},
		
		setInitialValue() {
			this.$refs.photographeInput.setInitialValue(this.photo.photographe, true)
			this.$refs.compagnieInput.setInitialValue(this.photo.compagnie, true)
			this.$refs.appareilInput.setInitialValue(this.photo.appareil, true)
			this.$refs.galerieInput.setInitialValue(this.photo.galerie, true)
		},
	},
	
	mixins: [validationMixin],
	
	validations() {
		return {photo: 
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
