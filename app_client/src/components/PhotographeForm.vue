<template lang="pug">
	extends BaseForm.pug
	
	block input
		b-form-group(
			label="Membre actif",
			label-for="actif",
		)
			b-form-checkbox(
				id="isspotair",
				v-model="formData.actif",
				switch,
			)
			
		b-form-group(
			label="Prénom",
			label-for="prenom",
			:invalid-feedback="formData.invalid.prenom",
			:state="checkValidityState($v.formData.prenom)"
		)
			b-form-input(
				id="prenom",
				type="text",
				v-model.trim="formData.prenom",
				:state="checkValidityState($v.formData.prenom)"
			)
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
	
	block input_modify		
		b-form-group(
			label="Utilisateur",
			label-for="email",
		)
			div(class="link-container")
				b-link(v-bind:href="'/admin/users/modify/' + user.id") {{ user.mail }}
			
</template>

<script>
import BaseForm from './BaseForm.vue'
import { required } from "vuelidate/lib/validators"

export default {
	
	extends: BaseForm,
	
	data () {
		return {
			model: "photographe",
			validations: {
				nom: {required},
				prenom: {required},
			},
			user: {},
		}
	},
	
	methods: {
		
		initForm() {
			// Override BaseForm method to get the corresponding user data
			this.formData = JSON.parse(JSON.stringify(this.selection))
			
			console.log("fformData.actif " + this.formData.actif)
			
			this.fusionTarget = null
			this.user = {}
			this.$v.$reset()
			if (this.formData && this.formData.id) {
				this.axios.get(`users/byPhotographe/${this.formData.id}`)
					.then(response => this.user = response.data)
					.catch(err => this.showAxiosAlert(err, "danger"))
			}
		},
		
    add() {
			// Override BaseForm method for redirection (add new user)
      this.$v.formData.$touch()
      if (this.$v.formData.$invalid) return
			this.axios.post(this.apiURL, this.formData)
				.then(response => {
					this.$emit('record-added', response.data)
					return response.data.id
				})
				.then(id => this.$router.push({ path: `/admin/users/new/${id}` }))
				.catch(err => this.showAxiosAlert(err, "danger"))
		},
		
	},
	
	}
	
</script>

<style>

.link-container {
	padding-top: calc(0.375rem + 1px);
	padding-left: 0.2rem;
}

</style>
