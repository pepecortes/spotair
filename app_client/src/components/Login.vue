<template lang="pug">
	div(id="login")
		h1 Login
			input(type="text", name="username", v-model="input.username", placeholder="Username")
			input(type="password", name="password", v-model="input.password", placeholder="Password")
			button(type="button" v-on:click="login()") Login
</template>

<script>

	// TEST TO BE COMPLETED
	const XXX = "http://localhost:3000/login"

	export default {
		name: 'Login',
		
		data() {
			return {
				input: {
					username: "",
					password: ""
				}
			}
		},
		
		methods: {
			
			login() {
				console.log("IN LOGIN")
				var vm = this
				try {
					vm.axios.post(XXX, vm.input)
						.then((response) => {
							console.log("response " + JSON.stringify(reponse.data))
						})
						.catch(err => {console.log("IN ERROR"); vm.showAlert(axiosErrorToString(err), "danger")})
					} catch(e) {console.log("error : " + e)}
			},
			
		}
	}
	
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 50px;
        padding: 20px;
    }
</style>
