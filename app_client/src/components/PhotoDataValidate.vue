<template lang="pug">
	div
	
		b-modal(
			title='Confirm photo validate?',
			id='confirmValidate',
			v-on:ok='validatePhoto',
		)
			b-form-checkbox(v-model="removeWatermark") Remove the watermark
			
		b-modal(
			title='Confirm photo reject?',
			id='confirmReject',
			v-on:ok='rejectPhoto',
		)
	
		div(class='testelement')
			editor-input(
				ref='avionValidator',
				title="Avion",
				apiCall="avions",
				v-model="photo.avion",
				:adminForm='admin.avion',
				:hideValidateButton='true',
				@selector-changed='avionChanged',
			)

			editor-input(
				ref='appareilValidator',
				title="Immat",
				apiCall="appareils",
				v-model='photo.appareil',
				:adminForm='admin.appareil',
				:state='!$v.photo.appareil.$invalid',
			)
			
			editor-input(
				ref='aerodromeValidator',
				:hideValidateButton='true',
				apiCall="aerodromes",
				v-model='photo.aerodrome',
				title="Lieu",
				:adminForm='admin.aerodrome',
				@selector-changed='aerodromeChanged',
			)

			editor-input(
				ref='galerieValidator',
				apiCall="galeries",
				v-model='photo.galerie',
				title="Galerie",
				:adminForm='admin.galerie',
				:state='!$v.photo.galerie.$invalid',
			)

			editor-input(
				ref='compagnieValidator',
				apiCall="compagnies",
				v-model='photo.compagnie',
				title="Compagnie",
				:adminForm='admin.compagnie',
				:state='!$v.photo.compagnie.$invalid',
			)
			
			b-form-textarea(
				id="commentaire",
				placeholder="Commentaire",
				rows="3",
				max-rows="6",
				v-model="photo.commentaire"
			)
			
			
			b-button(
				type="button", variant="outline-warning",
				v-show='initialPhotoModified', 
				v-b-modal.confirmValidate,
			) Update
			b-button(
				type="button", variant="outline-danger",
				v-b-modal.confirmReject,
			) Reject
			
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import EditorInput from './EditorInput.vue'
import AvionForm from './AvionForm.vue'
import AppareilForm from './AppareilForm.vue'
import GalerieForm from './GalerieForm.vue'
import CompagnieForm from './CompagnieForm.vue'

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
		'editor-input': EditorInput,
	},
	
	data() {
		return {
			photo: {},
			initialPhoto: {},
			removeWatermark: false,
			admin: {
				avion: AvionForm,
				appareil: AppareilForm,
				galerie: GalerieForm,
				compagnie: CompagnieForm,
			},
		}
	},
	
	computed: {
		
		//selectionIsValid() {
			//// Return true only if all the fields are validated by the user
			//if (!this.photo.photographe || 
					//!this.photo.compagnie ||
					//!this.photo.appareil ||
					//!this.photo.galerie)
				//return false
			//return true
		//},
		
		initialPhotoModified() {
			//if (!this.selectionIsValid) return false
			//const modified = false
				//|| (this.photo.photographe.id != this.initialPhoto.photographe.id)
				//|| (this.photo.compagnie.id != this.initialPhoto.compagnie.id)
				//|| (this.photo.appareil.id != this.initialPhoto.appareil.id)
				//|| (this.photo.galerie.id != this.initialPhoto.galerie.id)
			//return modified
		},
		
	},
	
	watch: {
		
		id() {this.initialize()},
			
		//photo: {
			//handler(photo) {
				//if (this.selectionIsValid) this.$emit('input', photo)
				//else this.$emit('input', null)
			//},
			//deep: true
		//},
		
	},
	
	methods: {
		
		initialize() {
			if (!this.id) return
			this.axios.get(`photouploads/${this.id}`)
				.then(response => {
					this.photo = response.data
					this.setInitialValue()
				})
				.catch(err => console.log(err))
		},
		
		setInitialValue() {
			const data = this.photo.jsonData
			this.initialPhoto = JSON.parse(JSON.stringify(this.photo))
			this.removeWatermark = false
			this.$refs.avionValidator.setInitialValue(data.avion, true)
			this.$refs.appareilValidator.setInitialValue(data.appareil, true)
			this.$refs.galerieValidator.setInitialValue(data.galerie, true)
			this.$refs.compagnieValidator.setInitialValue(data.compagnie, true)
			this.$refs.aerodromeValidator.setInitialValue(data.aerodrome, true)
			this.photo.commentUpload = data.commentaire
		},
		
		avionChanged(selected) {
			if(!selected || !selected.id) return
			var vm = this
			vm.axios.get(`appareils/byAvion/${selected.id}`)
				.then(response => {
					vm.$refs.appareilValidator.setOptions(response.data)
					vm.$refs.appareilValidator.reset()
				})
				.catch(err => console.log(err))
		},
		
		aerodromeChanged(selected) {
			if(!selected || !selected.id) return
		},
		
		validatePhoto() {
			//const url = `photos/photoUpdate/${this.photo.id}/${this.removeWatermark}`
			//this.axios.put(url, this.photo, {'headers': headers})	
				//.then(response => {
					//this.photo = response.data
					//this.setInitialValue()
					//this.$bvModal.msgBoxOk("Photo updated")
					//this.$emit('input', this.photo)
				//})
				//.catch(err => this.$bvModal.msgBoxOk("Server error: " + err.message))
		},
		
		rejectPhoto() {
			//const url = `photos/photoDelete/${this.photo.id}`
			//this.axios.delete(url, {'headers': headers})
				//.then(response => this.$bvModal.msgBoxOk("Photo deleted"))
				//.catch(err => this.$bvModal.msgBoxOk("Server error: " + err.message))
		},
		
	},
	
	mixins: [validationMixin],
	
	validations() {
		return {photo: 
			{
				appareil: {required},
				galerie: {required},
				compagnie: {required},
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
