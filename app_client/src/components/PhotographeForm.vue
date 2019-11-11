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
		}
	},
	
	methods: {
		
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
