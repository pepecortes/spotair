<template lang="pug">
	div(id="login")
		h1 Login
			b-form(@submit="submit", method="post")
				b-form-input(type="text", name="username", v-model="input.username", placeholder="Username")
				b-form-input(type="password", name="password", v-model="input.password", placeholder="Password")
				b-button(type="submit") Login
</template>

<script>

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
		}	
	}
	
</script>

<style scoped>
    #login {
        width: 400px;
        border: 1px solid #CCCCCC;
        background-color: #AFFFFF;
        margin: auto;
        margin-top: 50px;
        padding: 20px;
    }
</style>
