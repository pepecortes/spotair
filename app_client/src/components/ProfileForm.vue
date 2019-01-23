<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		b-list-group
			b-list-group-item(variant="primary") {{ user.text }}
			b-list-group-item(variant="danger", v-if="user.isAdmin") Administrateur
			b-list-group-item Prénom: {{ user.prenom }}
			b-list-group-item Nom: {{ user.nom }}
			b-list-group-item Mail: {{ user.mail }}
			
		b-form
			b-form-group(
				label="Nouveu mot de passe",
				label-for="password",
				invalid-feedback="Requis. Plus de 8 charactères",
				:state="checkValidityState($v.password)"
			)
				b-form-input(
					id="password",
					type="password",
					v-model="password",
					:state="checkValidityState($v.password)"
				)
			b-form-group(
				label="Confirmer mot de passe",
				label-for="passwordConfirm",
				invalid-feedback="Mots de passe différents",
				:state="checkValidityState($v.passwordConfirm)"
			)
				b-form-input(
					id="passwordConfirm",
					type="password",
					v-model="passwordConfirm",
					:state="checkValidityState($v.passwordConfirm)"
				)
				
			b-button(type="button", variant="outline-danger", v-on:click="modifyPasswordClicked") Changer mot de passe

</template>

<script>
import { alertMixin } from './AlertMixin'
import { validationMixin } from 'vuelidate'
import { confirmDialog, axiosErrorToString } from '../lib/common'
import { required, minLength } from "vuelidate/lib/validators"

export default {
	
	name: "ProfileForm",
	
	mixins: [validationMixin, alertMixin],
	
	data () {
		return {
			user: {},
			password: "",
			passwordConfirm: null
		}
	},
	
	mounted () {this.$v.$reset(); this.getCurrentUser()},
	
	methods: {
		
		checkValidityState(input) {
			return (input.$dirty)? !input.$invalid : null
		},
		
		// gets the current logged user by requesting the session data
		getCurrentUser() {
			var vm = this
			vm.axios.get(process.env.WEB_URL + 'profile') 
				// note that the call is NOT an API call
				.then(response => vm.user = response.data)
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
		
		modifyPasswordClicked() {
      if (!confirmDialog("confirmer ?")) return
			this.$v.$touch()
      this.updatePassword()
		},
		
		updatePassword() {
			var vm = this
			vm.axios.put("photographes/setPassword/" + vm.user.id, {password: vm.password})
				.then(function(response) {
					vm.showAlert("Mot de passe modifié", "success")
				})
				.catch(err => vm.showAlert(axiosErrorToString(err), "danger"))
		},
		
	},
	
	validations() {
				
		const confirmPassword = (value, vm) => (value == vm.password)
		
		return {
			password: {required, minLength: minLength(8)},
			passwordConfirm: {confirmPassword}
		}
	}
	
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
