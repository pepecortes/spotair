<template lang="pug">
	div(id="login")
	
		b-alert(
			dismissible,
			fade,
			show=true,
		) alerta
			
		b-form(@submit="submit", method="post")
			b-form-group(
				label="Mail du photographe",
				label-for="username",
				invalid-feedback="Doit être une adresse mail",
				:state="!$v.input.username.$invalid" 
			)
				b-form-input(
					id="username"
					type="email",
					name="username",
					v-model="input.username",
					:state="!$v.input.username.$invalid" 
				)
			b-form-group(
				label="Mot de passe",
				label-for="password",
				invalid-feedback="Mot de passe requis",
				:state="!$v.input.password.$invalid" 
			)
				b-form-input(
					id="password"
					type="password",
					name="password",
					v-model="input.password",
					:state="!$v.input.password.$invalid" 
				)
			b-button(type="submit") Login
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from "vuelidate/lib/validators"

export default {
	name: 'Login',
	
	data() {
		return {
			input: {
				username: "koko@gmail.com",
				password: "membres"
			}
		}
	},
	
	methods: {
		submit(evt) {
			// note how the "POST" method id the form is needed
			// to accommodate 'passport' API
			this.axios.post("/login", this.input)			
		}
	}, 
	
	mixins: [validationMixin],
	
	validations: {
		input: {username: {required, email}, password: {required}}
	},
	
}
	
</script>

<style>
	#login {
		max-width: 300px;
		margin: 0 auto;
		line-height: 1.4;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;;
	}
</style>
