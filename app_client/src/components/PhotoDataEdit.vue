<template lang="pug">
	div
	
		b-modal(
			title='Confirm photo update?',
			id='confirmUpdate',
			v-on:ok='updatePhoto',
		)
			b-form-checkbox(v-model="removeWatermark") Remove the watermark
	
		div
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
			
			b-form-textarea(
				id="commentaire",
				placeholder="Commentaire",
				rows="3",
				max-rows="6",
				v-model="photo.commentaire"
			)
			
			b-container.text-center
				b-button-group
					b-button(
						type="button", variant="outline-warning",
						v-show='initialPhotoModified', 
						v-b-modal.confirmUpdate,
					) Update
					b-button(
						type="button", variant="outline-danger",
						v-on:click='deletePhoto',
					) Delete
			
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import ControlInput from './ControlInput.vue'
import FormAppareil from './FormAppareil.vue'
import FormGalerie from './FormGalerie.vue'
import FormCompagnie from './FormCompagnie.vue'
import FormPhotographe from './FormPhotographe.vue'

// API is restricted: use a key
let headers = {'Authorization': `Bearer ${process.env.JWT_API_KEY}`}

export default {
	
	props: {
		id: {
			type: Number,
			default: null,
		},
	},
	
	components: {
		'editor-input': ControlInput,
	},
	
	data() {
		return {
			photo: {},
			initialPhoto: {},
			removeWatermark: false,
			admin: {
				appareil: FormAppareil,
				galerie: FormGalerie,
				compagnie: FormCompagnie,
				photographe: FormPhotographe
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
				|| (this.photo.commentaire != this.initialPhoto.commentaire)
			return modified
		},
		
	},
	
	mounted() {
		if (this.id) this.initialize()
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
					this.photo =  JSON.parse(JSON.stringify(response.data))
					this.setInitialValue()
				})
				.catch(err => console.log(err))
		},
		
		setInitialValue() {
			this.initialPhoto = JSON.parse(JSON.stringify(this.photo))
			this.removeWatermark = false
			this.$refs.photographeInput.setInitialValue(this.photo.photographe, true)
			this.$refs.compagnieInput.setInitialValue(this.photo.compagnie, true)
			this.$refs.appareilInput.setInitialValue(this.photo.appareil, true)
			this.$refs.galerieInput.setInitialValue(this.photo.galerie, true)
		},
		
		updatePhoto() {
			const url = `photos/photoUpdate/${this.photo.id}/${this.removeWatermark}`
			this.axios.put(url, this.photo, {'headers': headers})	
				.then(response => {
					this.photo = JSON.parse(JSON.stringify(response.data))
					this.setInitialValue()
					return this.$bvModal.msgBoxOk("Photo updated")
				})
				.then(() => this.$emit('photo-updated', this.id))
				.catch(err => this.$bvModal.msgBoxOk("Server error: " + err.message))
		},
		
		deletePhoto() {
			const url = `photos/photoDelete/${this.photo.id}`
			this.$bvModal.msgBoxConfirm('Confirm delete photo?')
				.then(confirmed => {if (!confirmed) return Promise.reject(null)})
				.then(() => this.axios.delete(url, {'headers': headers}))
				.then(() => this.$bvModal.msgBoxOk("Photo deleted"))
				.then(() => this.$emit('photo-deleted', this.id))
				.catch(err => {if (err) return this.$bvModal.msgBoxOk("Server error: " + err.message)})
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

.btn-group {
	margin-bottom: 2rem;
}

</style>
