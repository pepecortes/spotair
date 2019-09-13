<template lang="pug">
	div
	
		b-modal(
			title='Update photo',
			id='confirmUpdate',
			v-on:ok='updatePhoto',
		)
			b-form-checkbox(v-model="removeWatermark") Remove the watermark
			
		b-modal(
			title='Delete photo',
			id='confirmDelete',
			v-on:ok='deletePhoto',
		)
	
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
			
			b-button(
				type="button", variant="outline-warning",
				v-show='initialPhotoModified', 
				v-b-modal.confirmUpdate,
			) Update
			b-button(
				type="button", variant="outline-danger",
				v-b-modal.confirmDelete,
			) Delete
			
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
			initialPhoto: {},
			removeWatermark: false,
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
		
		initialPhotoModified() {
			if (!this.selectionIsValid) return false
			const modified = false
				|| (this.photo.photographe.id != this.initialPhoto.photographe.id)
				|| (this.photo.compagnie.id != this.initialPhoto.compagnie.id)
				|| (this.photo.appareil.id != this.initialPhoto.appareil.id)
				|| (this.photo.galerie.id != this.initialPhoto.galerie.id)
			return modified
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
					this.initialPhoto = JSON.parse(JSON.stringify(response.data))
					this.setInitialValue()
				})
				.catch(err => console.err(err))
		},
		
		setInitialValue() {
			this.removeWatermark = false
			this.$refs.photographeInput.setInitialValue(this.photo.photographe, true)
			this.$refs.compagnieInput.setInitialValue(this.photo.compagnie, true)
			this.$refs.appareilInput.setInitialValue(this.photo.appareil, true)
			this.$refs.galerieInput.setInitialValue(this.photo.galerie, true)
		},
		
		updatePhoto() {
			console.log("trying to update: " + this.photo.id)
			console.log("watermark: " + this.removeWatermark)
			const vm = this
			vm.axios.put(`photos/${this.photo.id}`, vm.photo)
				.then(function(response) {		
					vm.$emit('record-updated', response.data)
					//vm.showAlert("Updated: " + response.data.text, "success")
					//vm.getSelectOptions(response.data)
				})
				.catch(err => console.log(err))
			
		},
		
		deletePhoto() {
			console.log("trying to delete: " + this.photo.id)
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
