<template lang="pug">

	div
	
		p(v-if='photo.photographe') Photographe : {{ photo.photographe.text }}
		p(v-if='photo.commentUpload') {{ photo.commentUpload }}
	
		editor-input(
			ref='avionValidator',
			title="Avion",
			apiCall="avions",
			v-model="photo.avion",
			:adminForm='admin.avion',
			:hideValidateButton='true',
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
			ref='appareilValidator',
			title="Immat",
			apiCall="appareils",
			v-model='photo.appareil',
			:adminForm='admin.appareil',
			:state='!$v.photo.appareil.$invalid',
		)

		editor-input(
			ref='compagnieValidator',
			apiCall="compagnies",
			v-model='photo.compagnie',
			title="Compagnie",
			:adminForm='admin.compagnie',
			:state='!$v.photo.compagnie.$invalid',
		)

		editor-input(
			ref='galerieValidator',
			apiCall="galeries",
			v-model='photo.galerie',
			title="Galerie",
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
					v-if="isAdmin",
					type="button", variant="outline-success",
					v-show='selectionIsValid', 
					v-on:click='validatePhoto',
				) Validate
				b-button(
					type="button", variant="outline-danger",
					v-on:click='rejectPhoto',
				) Reject
			
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import ControlInput from './ControlInput.vue'
import FormAvion from './FormAvion.vue'
import FormAppareil from './FormAppareil.vue'
import FormGalerie from './FormGalerie.vue'
import FormCompagnie from './FormCompagnie.vue'
import { credentialsMixin } from '../mixins/Credentials'

// API is restricted: use a key
let headers = {'Authorization': `Bearer ${process.env.JWT_API_KEY}`}

export default {
	
	mixins: [validationMixin, credentialsMixin],
	
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
			admin: {
				avion: FormAvion,
				appareil: FormAppareil,
				galerie: FormGalerie,
				compagnie: FormCompagnie,
			},
		}
	},
	
	computed: {
		
		selectionIsValid() {
			// Return true only if all the relevant fields are validated by the user
			if (!this.photo.appareil ||
					!this.photo.galerie ||
					!this.photo.compagnie)
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
			this.axios.get(`photouploads/${this.id}`)
				.then(response => {
					this.photo = response.data.jsonData
					this.photo.photographe = response.data.photographe
					this.photo.dateUpload = response.data.createdAt
					this.setInitialValue()
				})
				.catch(err => console.log(err))
		},
		
		setInitialValue() {
			this.initialPhoto = JSON.parse(JSON.stringify(this.photo))
			this.$refs.avionValidator.setInitialValue(this.photo.avion, true)
			this.$refs.appareilValidator.setInitialValue(this.photo.appareil, true)
			this.$refs.galerieValidator.setInitialValue(this.photo.galerie, true)
			this.$refs.compagnieValidator.setInitialValue(this.photo.compagnie, true)
			this.$refs.aerodromeValidator.setInitialValue(this.photo.aerodrome, true)
		},
		
		avionChanged(selected) {
			if(!selected || !selected.id) return
			this.axios.get(`appareils/byAvion/${selected.id}`)
				.then(response => {
					this.$refs.appareilValidator.setOptions(response.data)
					this.$refs.appareilValidator.reset()
				})
				.catch(err => console.log(err))
		},
		
		aerodromeChanged(selected) {
			if(!selected || !selected.id) return
			this.axios.get(`galeries/byAerodrome/${selected.id}`)
				.then(response => {
					this.$refs.galerieValidator.setOptions(response.data)
					this.$refs.galerieValidator.reset()
				})
				.catch(err => console.log(err))
		},
		
		validatePhoto() {
			const url = `photos/validateUpload/${this.id}`
			this.$bvModal.msgBoxConfirm('Confirm validate?')
				.then(confirmed => {if (!confirmed) return Promise.reject(null)})
				.then(() => this.axios.post(url, this.photo, {'headers': headers}))
				.then(() => this.$bvModal.msgBoxOk("Photo validated"))
				.then(() => this.$emit('photo-validated', this.id))
				.catch(err => {if (err) return this.$bvModal.msgBoxOk("Server error: " + err.message)})
		},
		
		rejectPhoto() {
			const url = `photoUploads/reject/${this.id}`
			this.$bvModal.msgBoxConfirm('Confirm photo reject?')
				.then(confirmed => {if (!confirmed) return Promise.reject(null)})
				.then(() => this.axios.put(url, {'headers': headers}))
				.then(() => this.$bvModal.msgBoxOk("Photo rejected"))
				.then(() => this.$emit('photo-rejected', this.id))
				.catch(err => {if (err) return this.$bvModal.msgBoxOk("Server error: " + err.message)})
		},
		
	},
	
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

.btn-group {
	margin-bottom: 2rem;
}

</style>
